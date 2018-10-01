import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Exercise, ExerciseWithOccurrences} from '../../core/models/Exercise';
import {ActivatedRoute, Router} from '@angular/router';
import {ALL_ROUTES, ROUTE_PARAMS} from '../../shared/ROUTES';
import {TestService} from '../../core/services/test.service';
import {TestExercisesService} from '../../core/services/test-exercises.service';
import {TestCreate, TestStarted} from '../../core/models/Test';
import {AuthService} from '../../core/services/auth.service';
import {RWDService} from '../../core/services/RWD.service';
import {HeaderService} from '../../core/services/header.service';
import {slideFromTopAnimation} from '../../shared/animations';
import {MatDialog} from '@angular/material';
import {TestConfig, TestConfigComponent} from './test-config/test-config.component';

@Component({
  selector: 'app-test',
  templateUrl: './test-learn.component.html',
  styleUrls: ['./test-learn.component.scss'],
  animations: [slideFromTopAnimation()]
})
export class TestLearnComponent implements OnInit, OnDestroy {
  private subscriptions: any[] = [];
  private testId: string;

  public preparedTestExercises: Array<ExerciseWithOccurrences> = [];
  public origTestExercises: Array<Exercise> = [];
  public test: TestCreate;
  public currentExercise: ExerciseWithOccurrences;

  public isTestEnd: boolean;
  public areSettingsSet = false;
  public userIsAuthenticated: boolean;
  public testInProgress: boolean;
  public loadingStop = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private headerService: HeaderService,
              private auth: AuthService,
              private rwdService: RWDService,
              private testService: TestService,
              private exerciseService: TestExercisesService,
              public dialog: MatDialog) {
    this.subscriptions.push(
      this.route.parent.params.subscribe(params => {
        this.headerService.hideHeader();
        this.testId = params[ROUTE_PARAMS.TEST_ID];
        this.isLoggedIn();
      })
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.headerService.showHeader();
    this.saveProgress();
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  /**
   * If is not logged in - open auth dialog
   */
  private isLoggedIn() {
    this.subscriptions.push(this.auth.currentUserObservable.subscribe(
      res => {
        if (res) {
          this.userIsAuthenticated = true;
          this.getTestExercises();
        } else {
          this.userIsAuthenticated = false;
          this.auth.openAuthDialog(true);
          this.loadingStop = true;
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
        (res: TestStarted) => {
          this.assignStartedTest(res);

          if (!this.areSettingsSet) {
            this.openTestConfigDialog(true);
            this.loadingStop = true;
          } else {
            this.startTest();
          }
        },
        error => console.log(error)
      )
    );
  }

  private assignStartedTest(startedTestSettings): void {
    if (startedTestSettings) {
      this.test.testStarted = {
        settings: startedTestSettings.settings,
        progress: startedTestSettings.progress
      };
      this.areSettingsSet = !!startedTestSettings.settings;
      this.testInProgress = !!startedTestSettings.progress;
    }
  }

  private startTest(): void {
    this.checkIfTestIsFinish();
    this.prepareExercises();
    this.drawExercise();
  }

  public checkIfTestIsFinish(): void {
    if (this.testInProgress) {
      this.isTestEnd = this.test.testStarted.progress.masteredExercisesIds.length === this.origTestExercises.length;
    } else {
      this.isTestEnd = false;
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
      occurrences: this.test.testStarted.progress.reviewedExercisesIds[
        this.test.testStarted.progress.reviewedExercisesIds.findIndex(x => x.id === exercise.id)
        ].occurrences
    });
  }

  private addToExerciseListWithSettingsOccurrence(exercise: Exercise): void {
    if (this.test.testStarted.settings) {
      this.preparedTestExercises.push({
        exercise: exercise,
        occurrences: this.test.testStarted.settings.occurrencesNumber
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
      this.loadingStop = true;
    }
  }

  /**
   * FUNCTIONAL
   */
  public saveProgress(): void {
    if (this.userIsAuthenticated && this.loadingStop && this.test.testStarted &&
      (this.test.testStarted.progress.masteredExercisesIds.length > 0 ||
        this.test.testStarted.progress.reviewedExercisesIds.length > 0)) {
      this.testService.updateTestProgress(this.testId, this.test.testStarted.progress)
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
    const index = this.test.testStarted.progress.reviewedExercisesIds.findIndex(x => x.id === this.currentExercise.exercise.id);
    if (index !== -1) {
      this.test.testStarted.progress.reviewedExercisesIds[index].occurrences = this.currentExercise.occurrences;
    } else {
      this.test.testStarted.progress.reviewedExercisesIds.push({
        id: this.currentExercise.exercise.id,
        occurrences: this.currentExercise.occurrences
      });
    }
  }

  private deleteFromReviewed(exercise: ExerciseWithOccurrences) {
    const reviewedIndex = this.test.testStarted.progress.reviewedExercisesIds.findIndex(x => x.id === exercise.exercise.id);
    this.test.testStarted.progress.reviewedExercisesIds.splice(reviewedIndex, 1);
  }

  private isExerciseReviewed(id: string): boolean {
    return this.test.testStarted.progress.reviewedExercisesIds.findIndex(x => x.id === id) !== -1;
  }


  /**
   * MASTERED EXERCISE
   */
  private addToMastered(exercise: ExerciseWithOccurrences) {
    this.test.testStarted.progress.masteredExercisesIds.push(exercise.exercise.id);
  }

  private isExerciseMastered(id: string): boolean {
    return this.test.testStarted.progress.masteredExercisesIds.findIndex(x => x === id) !== -1;
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
    if (this.loadingStop) {
      if (this.test.testStarted.progress && this.test.testStarted.progress.masteredExercisesIds.length === 0) {
        return 0;
      }
      return this.test.testStarted.progress.masteredExercisesIds.length / this.origTestExercises.length * 100;
    }
  }

  /**
   * CONFIG DIALOG
   */

  public openTestConfigDialog(reset: boolean): void {
    const dialogRef = this.dialog.open(TestConfigComponent, {
      disableClose: !this.areSettingsSet,
      data: {
        toReset: reset
      }
    });

    this.subscriptions.push(
      dialogRef.afterClosed().subscribe((result: TestConfig) => {
        if (result) {
          this.loadingStop = false;
          this.saveSettingsAndStartTest(this.createTestStartedSettings(result));
        }
      })
    );
  }

  private createTestStartedSettings(config: TestConfig): TestStarted {
    return {
      settings: config.settings,
      progress: !config.reset ? this.test.testStarted.progress : {
        masteredExercisesIds: [],
        reviewedExercisesIds: [],
      },
    };
  }

  public saveSettingsAndStartTest(settings: TestStarted): void {
    this.testService.setTestStarted(this.testId, settings)
      .then(() => this.startTest())
      .catch(error => console.log(error));
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event) {
    this.saveProgress();
  }
}
