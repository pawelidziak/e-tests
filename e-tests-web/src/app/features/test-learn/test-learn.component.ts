import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Exercise, ExerciseWithOccurrences} from '../../core/models/Exercise';
import {ActivatedRoute} from '@angular/router';
import {ROUTE_PARAMS} from '../../shared/ROUTES';
import {TestService} from '../../core/services/test.service';
import {TestExercisesService} from '../../core/services/test-exercises.service';
import {TestCreate, TestSettings} from '../../core/models/Test';
import {AuthService} from '../../core/services/auth.service';
import {RWDService} from '../../core/services/RWD.service';
import {HeaderService} from '../../core/services/header.service';
import {Location} from '@angular/common';
import {slideFromTopAnimation} from '../../shared/animations';

@Component({
  selector: 'app-test',
  templateUrl: './test-learn.component.html',
  styleUrls: ['./test-learn.component.scss'],
  animations: [slideFromTopAnimation()]
})
export class TestLearnComponent implements OnInit, OnDestroy {
  private subscriptions: any[] = [];
  private testId: string;

  public isSmallScreen: boolean;

  public preparedTestExercises: Array<ExerciseWithOccurrences> = [];
  public origTestExercises: Array<Exercise> = [];
  public test: TestCreate;
  public currentExercise: ExerciseWithOccurrences;

  public isTestEnd: boolean;
  public areSettingsSet = false;


  constructor(private route: ActivatedRoute,
              private headerService: HeaderService,
              private auth: AuthService,
              private location: Location,
              private rwdService: RWDService,
              private testService: TestService,
              private exerciseService: TestExercisesService) {
    this.subscriptions.push(
      this.route.parent.params.subscribe(params => {
        this.headerService.hideHeader();
        this.testId = params[ROUTE_PARAMS.TEST_ID];
        this.getTestExercises();
      })
    );
  }

  ngOnInit() {
    this.isLoggedIn();
    this.getRWDValue();
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
        if (!res) {
          this.auth.openAuthDialog(true);
        }
      })
    );
  }

  /**
   * INITIAL
   */
  private getRWDValue(): void {
    this.subscriptions.push(
      this.rwdService.isSmallScreen.subscribe(res => {
        this.isSmallScreen = res;
      })
    );
  }

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
          this.checkTestStartConditions();
        },
        error => console.log(error)
      )
    );
  }

  /**
   * CHECKS CONDITIONS
   */
  private checkTestStartConditions() {
    this.sprawdzCzyJestZakonczony();
    this.przypiszProgress();
    this.sprawdzUstawienia();
    if (this.areSettingsSet) {
      this.przygotujZadania();
      this.drawExercise();
    }
  }

  public sprawdzCzyJestZakonczony(): void {
    if (this.test.progress) {
      this.isTestEnd = this.test.progress.masteredExercisesIds.length === this.origTestExercises.length;
    } else {
      this.isTestEnd = false;
    }
  }

  public przypiszProgress(): void {
    if (!this.test.progress) {
      this.test.progress = {
        masteredExercisesIds: [],
        reviewedExercisesIds: [],
      };
    }
  }

  public sprawdzUstawienia(): void {
    this.areSettingsSet = !!this.test.settings;
  }

  public przygotujZadania(): void {
    this.preparedTestExercises = [];
    for (const exercise of this.origTestExercises) {
      if (!this.czyZadanieJestOpanowane(exercise.id)) {
        if (this.czyZadanieJestObejrzane(exercise.id)) {
          this.addToExerciseListWithExerciseOccurrence(exercise);
        } else {
          this.addToExerciseListWithSettingsOccurrence(exercise);
        }
      }
    }
  }

  private addToExerciseListWithSettingsOccurrence(exercise: Exercise): void {
    if (this.test.settings) {
      this.preparedTestExercises.push({
        exercise: exercise,
        occurrences: this.test.settings.occurrencesNumber
      });
    }
  }

  private addToExerciseListWithExerciseOccurrence(exercise: Exercise): void {
    this.preparedTestExercises.push({
      exercise: exercise,
      occurrences: this.test.progress.reviewedExercisesIds[
        this.test.progress.reviewedExercisesIds.findIndex(x => x.id === exercise.id)
        ].occurrences
    });
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
    this.testService.shuffleAnswers(this.currentExercise.exercise);
  }

  /**
   * FUNCTIONAL
   */

  public saveSettingsAndStartTest(settings: TestSettings): void {
    this.testService.updateTestSettings(this.testId, settings)
      .catch(error => console.log(error));
  }

  public saveProgress(): void {
    if (this.test.progress.masteredExercisesIds.length > 0 || this.test.progress.reviewedExercisesIds.length > 0) {
      this.testService.updateTestProgress(this.testId, this.test.progress)
        .catch(error => console.log(error));
    }
  }


  public backToTest(): void {
    this.location.back();
  }

  /**
   *    HANDLERS
   */
  public handleNextAnswer() {
    const index = this.preparedTestExercises.findIndex(x => x.exercise.id === this.currentExercise.exercise.id);
    this.preparedTestExercises[index] = this.currentExercise;

    if (this.currentExercise.occurrences > 0) {
      this.dodajDoObejrzanych();
    } else if (this.currentExercise.occurrences === 0) {
      this.dodajDoOpanowanych(this.currentExercise);
      this.usunZObejrzanych(this.currentExercise);
      this.usunZListyCwiczen(this.currentExercise);
    }

    this.sprawdzCzyJestZakonczony();
    this.drawExercise();
  }

  /**
   * REVIEWED EXERCISE
   */

  private dodajDoObejrzanych() {
    const index = this.test.progress.reviewedExercisesIds.findIndex(x => x.id === this.currentExercise.exercise.id);
    if (index !== -1) {
      this.test.progress.reviewedExercisesIds[index].occurrences = this.currentExercise.occurrences;
    } else {
      this.test.progress.reviewedExercisesIds.push({
        id: this.currentExercise.exercise.id,
        occurrences: this.currentExercise.occurrences
      });
    }
  }


  private dodajDoOpanowanych(exercise: ExerciseWithOccurrences) {
    this.test.progress.masteredExercisesIds.push(exercise.exercise.id);
  }

  private usunZObejrzanych(exercise: ExerciseWithOccurrences) {
    const reviewedIndex = this.test.progress.reviewedExercisesIds.findIndex(x => x.id === exercise.exercise.id);
    this.test.progress.reviewedExercisesIds.splice(reviewedIndex, 1);
  }

  private usunZListyCwiczen(exercise: ExerciseWithOccurrences) {
    const index = this.preparedTestExercises.findIndex(x => x.exercise.id === exercise.exercise.id);
    if (index !== -1) {
      this.preparedTestExercises.splice(index, 1);
    }
  }

  /**
   * CKECKS
   */

  private czyZadanieJestObejrzane(id: string): boolean {
    return this.test.progress.reviewedExercisesIds.findIndex(x => x.id === id) !== -1;
  }

  private czyZadanieJestOpanowane(id: string): boolean {
    return this.test.progress.masteredExercisesIds.findIndex(x => x === id) !== -1;
  }


  /**
   *    COUNTERS
   */
  public countMasteredRatio(): number {
    if (this.test.progress.masteredExercisesIds.length === 0) {
      return 0;
    }
    return this.test.progress.masteredExercisesIds.length / this.origTestExercises.length * 100;
  }

  /**
   *    RESETS
   */
  public resetTest() {
    this.isTestEnd = false;
    // this.isTestPrepared = false;
    this.resetStats();
  }

  private resetStats(): void {
    // this.reviewedExercisesCounter = 0;
    // this.reviewedExercisesIds = [];
    // this.masteredExercisesCount = 0;
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event) {
    this.saveProgress();
  }
}
