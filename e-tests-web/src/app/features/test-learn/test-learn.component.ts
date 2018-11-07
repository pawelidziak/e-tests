import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Exercise, ExerciseWithOccurrences} from '../../core/models/Exercise';
import {ActivatedRoute, Router} from '@angular/router';
import {ALL_ROUTES, ROUTE_PARAMS} from '../../shared/ROUTES';
import {TestService} from '../../core/services/test.service';
import {TestExercisesService} from '../../core/services/test-exercises.service';
import {TestModel, TestProgress, TestSettings} from '../../core/models/Test';
import {AuthService} from '../../core/services/auth.service';
import {RWDService} from '../../core/services/RWD.service';
import {HeaderService} from '../../core/services/header.service';
import {TestConfigComponent, TestConfigWithRestart} from './test-config/test-config.component';
import {AppSettingsService} from '../../core/services/app-settings.service';
import {LoaderService} from '../../core/services/loader.service';
import {MatDialog} from "@angular/material";

@Component({
  selector: 'app-test',
  templateUrl: './test-learn.component.html',
  styleUrls: ['./test-learn.component.scss']
})
export class TestLearnComponent implements OnInit, OnDestroy {
  private subscriptions: any[] = [];
  private readonly DEFAULT_OCCURRENCES = 2;
  private readonly DEFAULT_REPETITIONS = 2;
  public testId: string;

  public preparedTestExercises: Array<ExerciseWithOccurrences> = [];
  public origTestExercises: Array<Exercise> = [];
  public test: TestModel;
  public currentExercise: ExerciseWithOccurrences;

  public isTestEnd: boolean;
  public isConfigSet: boolean;
  public userIsAuthenticated: boolean;
  public testInProgress: boolean;

  public isMediumScreen: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private headerService: HeaderService,
              private rwdService: RWDService,
              private testService: TestService,
              private exerciseService: TestExercisesService,
              public loader: LoaderService,
              public auth: AuthService,
              public dialog: MatDialog,
              public appSettings: AppSettingsService) {
    this.subscriptions.push(
      this.route.parent.params.subscribe(params => {
        this.testId = params[ROUTE_PARAMS.TEST_ID];
        this.isLoggedIn();
      })
    );
  }

  ngOnInit() {
    this.getRwdValue();
  }

  ngOnDestroy() {
    this.headerService.showAppAndPageHeader();
    this.saveProgress();
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private getRwdValue(): void {
    this.subscriptions.push(
      this.rwdService.isMediumScreen.subscribe(
        res => {
          // this.headerService.hidePageHeader();
          if (res) {
            this.headerService.hideAppAndPageHeader();
            this.isMediumScreen = true;
          } else {
            this.headerService.hidePageHeader();
            this.isMediumScreen = false;
          }
        }
      )
    );
  }

  /**
   * If is not logged in - open auth dialog
   */
  private isLoggedIn() {
    this.subscriptions.push(this.auth.currentUserObservable.subscribe(
      res => {
        this.loader.start();
        if (res) {
          this.userIsAuthenticated = true;
          this.getTestExercises();
        } else {
          this.userIsAuthenticated = false;
          this.auth.openAuthDialog(true);
          this.loader.complete();
        }
      })
    );
  }

  /**
   * INITIAL
   */
  private getTestExercises() {
    this.subscriptions.push(
      this.exerciseService.getTestExercises(this.testId).subscribe(
        res => {
          this.origTestExercises = res;
          this.getTest();
        },
        error => console.log(error)
      )
    );
  }

  private getTest() {
    this.subscriptions.push(
      this.testService.getTestById(this.testId).subscribe(
        res => {
          this.test = res;
          this.checkIfTetIsStarted();
        },
        error => console.log(error)
      )
    );
  }

  /**
   * CHECKS CONDITIONS
   */
  public checkIfTetIsStarted(): void {
    this.subscriptions.push(
      this.testService.getTestSettings(this.testId).subscribe(
        (res: TestSettings) => this.startTest(res),
        error => console.log(error)
      )
    );
  }

  public checkIfTestIsFinish(): void {
    if (this.testInProgress) {
      this.isTestEnd = this.test.settings.progress.masteredExercisesIds.length === this.origTestExercises.length;
    } else {
      this.isTestEnd = false;
    }
  }

  private startTest(settings: TestSettings): void {
    this.setTestSettings(settings);
    this.loader.complete();
    if (!this.isConfigSet) {
      this.openDialog(true);
    } else {
      this.checkIfTestIsFinish();
      if (!this.isTestEnd) {
        this.prepareExercises();
        this.drawExercise();
      }
    }
  }

  private setTestSettings(startedTestSettings: TestSettings): void {
    if (startedTestSettings) {
      this.checkProgress(startedTestSettings.progress);
      this.test.settings = {
        config: startedTestSettings.config,
        progress: startedTestSettings.progress
      };
      this.isConfigSet = !!startedTestSettings.config;
      this.testInProgress = !!startedTestSettings.progress;
    }
  }

  private checkProgress(progress: TestProgress): void {
    for (let i = 0; i < progress.masteredExercisesIds.length; i++) {
      const index = this.origTestExercises.findIndex(x => x.id === progress.masteredExercisesIds[i]);
      if (index === -1) {
        progress.masteredExercisesIds.splice(i, 1);
        i--;
      }
    }
    for (let i = 0; i < progress.reviewedExercisesIds.length; i++) {
      const index = this.origTestExercises.findIndex(x => x.id === progress.reviewedExercisesIds[i].id);
      if (index === -1) {
        progress.reviewedExercisesIds.splice(i, 1);
        i--;
      }
    }
  }

  /**
   * PREPARE EXERCISES TO TEST
   */
  public prepareExercises(): void {
    this.preparedTestExercises = [];
    for (const exercise of this.origTestExercises) {
      if (!this.isExerciseMastered(exercise.id)) {
        if (this.isExerciseReviewed(exercise.id)) {
          this.addToExerciseListWithExerciseOccurrence(exercise);
        } else {
          this.addToExerciseListWithSettingsOccurrence(exercise);
        }
      }
    }
  }

  private addToExerciseListWithExerciseOccurrence(exercise: Exercise): void {
    this.preparedTestExercises.push({
      exercise: exercise,
      occurrences: this.test.settings.progress.reviewedExercisesIds[
        this.test.settings.progress.reviewedExercisesIds.findIndex(x => x.id === exercise.id)
        ].occurrences
    });
  }

  private addToExerciseListWithSettingsOccurrence(exercise: Exercise): void {
    if (this.test.settings.config) {
      this.preparedTestExercises.push({
        exercise: exercise,
        occurrences: this.test.settings.config.occurrencesNumber
      });
    }
  }

  private drawExercise(): void {
    if (this.preparedTestExercises.length === 1) {
      this.currentExercise = {
        exercise: this.preparedTestExercises[0].exercise,
        occurrences: this.preparedTestExercises[0].occurrences
      };
    }
    if (this.preparedTestExercises.length > 1) {
      const exercise = this.preparedTestExercises[Math.floor(Math.random() * this.preparedTestExercises.length)];
      this.currentExercise = {
        exercise: exercise.exercise,
        occurrences: exercise.occurrences
      };
    }

    if (this.currentExercise) {
      this.testService.shuffleAnswers(this.currentExercise.exercise);
    }
  }

  /**
   * FUNCTIONAL
   */
  public saveProgress(): void {
    if (this.userIsAuthenticated && this.test.settings) {
      this.testService.setTestStarted(this.testId, this.test.settings)
        .catch(error => console.log(error));
    }
  }

  public backToTest(): void {
    this.router.navigate([`${ALL_ROUTES.CREATED_TEST}/${this.testId}`]);
  }

  /**
   *    HANDLERS
   */
  public handleCheckAnswer(): void {
    const index = this.preparedTestExercises.findIndex(x => x.exercise.id === this.currentExercise.exercise.id);
    this.preparedTestExercises[index] = this.currentExercise;

    if (this.currentExercise.occurrences > 0) {
      this.addToReviewed();
    } else if (this.currentExercise.occurrences === 0) {
      this.addToMastered(this.currentExercise);
      this.deleteFromReviewed(this.currentExercise);
      this.deleteFromPreparedExercises(this.currentExercise);
    }
  }

  public handleNextAnswer(): void {
    this.checkIfTestIsFinish();
    this.drawExercise();
  }

  /**
   * REVIEWED EXERCISE
   */
  private addToReviewed() {
    const index = this.test.settings.progress.reviewedExercisesIds.findIndex(x => x.id === this.currentExercise.exercise.id);
    if (index !== -1) {
      this.test.settings.progress.reviewedExercisesIds[index].occurrences = this.currentExercise.occurrences;
    } else {
      this.test.settings.progress.reviewedExercisesIds.push({
        id: this.currentExercise.exercise.id,
        occurrences: this.currentExercise.occurrences
      });
    }
  }

  private deleteFromReviewed(exercise: ExerciseWithOccurrences) {
    const reviewedIndex = this.test.settings.progress.reviewedExercisesIds.findIndex(x => x.id === exercise.exercise.id);
    this.test.settings.progress.reviewedExercisesIds.splice(reviewedIndex, 1);
  }

  private isExerciseReviewed(id: string): boolean {
    return this.test.settings.progress.reviewedExercisesIds.findIndex(x => x.id === id) !== -1;
  }


  /**
   * MASTERED EXERCISE
   */
  private addToMastered(exercise: ExerciseWithOccurrences) {
    this.test.settings.progress.masteredExercisesIds.push(exercise.exercise.id);
  }

  private isExerciseMastered(id: string): boolean {
    return this.test.settings.progress.masteredExercisesIds.findIndex(x => x === id) !== -1;
  }

  private deleteFromPreparedExercises(exercise: ExerciseWithOccurrences) {
    const index = this.preparedTestExercises.findIndex(x => x.exercise.id === exercise.exercise.id);
    if (index !== -1) {
      this.preparedTestExercises.splice(index, 1);
    }
  }

  /**
   *    COUNTERS
   */
  public countMasteredRatio(): number {
    if (this.test.settings && this.test.settings.progress && this.test.settings.progress.masteredExercisesIds.length === 0) {
      return 0;
    }
    return this.test.settings.progress.masteredExercisesIds.length / this.origTestExercises.length * 100;
  }

  openDialog(disableClose: boolean): void {
    const dialogRef = this.dialog.open(TestConfigComponent, {
      disableClose: disableClose,
      panelClass: 'none-padding-mat-dialog',
      data: {
        testId: this.testId,
        occurrencesExerciseNumber: this.test.settings ? this.test.settings.config.occurrencesNumber : this.DEFAULT_OCCURRENCES,
        repetitionExerciseNumber: this.test.settings ? this.test.settings.config.repetitionNumber : this.DEFAULT_REPETITIONS,
        testIsNewOrInProgress: !this.isConfigSet,
        testIsEnd: this.isTestEnd
      }
    });

    this.subscriptions.push(
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.handleSaveConfig(result);
        }
      })
    );
  }

  private handleSaveConfig(result: TestConfigWithRestart): void {
    const settings: TestSettings = {
      config: result.config,
      progress: result.restartTestProgress ? {masteredExercisesIds: [], reviewedExercisesIds: []}
        : this.test.settings.progress
    };
    this.test.settings = settings;

    // reload with new config
    this.prepareExercises();

    // when it's first start
    if (!this.isConfigSet || result.restartTestProgress) {
      this.startTest(settings);
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event) {
    this.saveProgress();
  }
}
