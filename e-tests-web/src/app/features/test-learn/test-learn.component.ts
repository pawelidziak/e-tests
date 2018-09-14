import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Exercise, ExerciseWithOccurrences} from '../../core/models/Exercise';
import {ActivatedRoute} from '@angular/router';
import {HeaderButtonType, HeaderService} from '../../core/services/header.service';
import {ROUTE_PARAMS} from '../../shared/ROUTES';
import {TestService} from '../../core/services/test.service';
import {TestExercisesService} from '../../core/services/test-exercises.service';
import {TestCreate, TestProgress, TestSettings} from '../../core/models/Test';

@Component({
  selector: 'app-test',
  templateUrl: './test-learn.component.html',
  styleUrls: ['./test-learn.component.scss']
})
export class TestLearnComponent implements OnInit, OnDestroy {
  private subscriptions: any[] = [];

  // bedzie id testu i bedzie laczenie do serwera / LUB BEDZIE TO W KOMPONENCIE WYZEJ
  // public test: Test;
  public preparedTestExercises: Array<ExerciseWithOccurrences> = [];
  public origTestExercises: Array<Exercise> = [];
  public test: TestCreate;
  public currentExercise: ExerciseWithOccurrences;

  // public occurrencesExerciseNumber: number;
  // public repetitionExerciseNumber: number;

  public isAutoPlay = false;
  public autoPlayDuration = 1;

  // public masteredExercisesCount: number;
  // public reviewedExercisesCounter;
  // public reviewedExercisesIds: any[];

  // HELPERS
  public answerClickedOutput: boolean;
  public isTestEnd: boolean;
  public isTestPrepared: boolean;
  private testId: string;
  public areSettingsEstablished: boolean;
  public testIsLoaded: boolean;

  constructor(private route: ActivatedRoute,
              private testService: TestService,
              private exerciseService: TestExercisesService,
              private headerService: HeaderService) {
    this.subscriptions.push(
      this.route.parent.params.subscribe(params => {
        this.testId = params[ROUTE_PARAMS.TEST_ID];
        this.getTestExercises();
      })
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.saveProgress();
    this.subscriptions.forEach(s => s.unsubscribe());
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

          if (!this.test.progress) {
            this.initProgress();
          } else {
            this.checkIfTestIsEnd();
          }
          if (this.test.settings) {
            this.prepareTestToLearn();
            this.areSettingsEstablished = true;
          }

          // this.testIsLoaded = true;
        },
        error => console.log(error)
      )
    );
  }

  public initProgress() {
    this.test.progress = {
      masteredExercisesIds: [],
      reviewedExercisesIds: [],
    };
  }

  public saveSettingsAndStartTest(settings: TestSettings): void {
    this.testService.updateTestSettings(this.testId, settings)
      .then(() => {
        this.areSettingsEstablished = true;
      })
      .catch(error => console.log(error));
  }

  private prepareTestToLearn(): void {
    this.preparedTestExercises = [];
    for (const exercise of this.origTestExercises) {
      if (this.test.progress.masteredExercisesIds.findIndex(x => x === exercise.id) === -1) {

        const index = this.test.progress.reviewedExercisesIds.findIndex(x => x.id === exercise.id);
        if (index === -1) {
          this.preparedTestExercises.push({
            exercise: exercise,
            occurrences: this.test.settings.occurrencesNumber
          });
        } else {
          this.preparedTestExercises.push({
            exercise: exercise,
            occurrences: this.test.progress.reviewedExercisesIds[index].occurrences
          });
        }
      }
    }
    // this.testService.shuffleArray(this.preparedTestExercises);
    this.currentExercise = this.getRandomExercise();
    this.isTestPrepared = true;
  }

  saveProgress(): void {
    if (this.test.progress.masteredExercisesIds.length > 0 || this.test.progress.reviewedExercisesIds.length > 0) {
      this.testService.updateTestProgress(this.testId, this.test.progress)
        .catch(error => console.log(error));
    }
  }

  public nextExercise(): void {
    this.currentExercise = this.getRandomExercise();
    this.answerClickedOutput = false;
  }

  /**
   *    HANDLERS
   */
  public handleSelectedAnswer(event: ExerciseWithOccurrences) {
    this.answerClickedOutput = true;
console.log(event)
    const index = this.preparedTestExercises.findIndex(x => x.exercise.id === event.exercise.id);
    this.preparedTestExercises[index] = event;

    this.checkIfExerciseIsReviewedOrMastered(event);
    this.checkIfTestIsEnd();
    // if () {
    //   return;
    // }
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

  public countReviewedRatio(): number {
    if (this.test.progress.masteredExercisesIds.length + this.test.progress.reviewedExercisesIds.length === 0) {
      return 0;
    }
    return (this.test.progress.masteredExercisesIds.length + this.test.progress.reviewedExercisesIds.length)
      / this.origTestExercises.length * 100;
  }

  /**
   *    RESETS
   */
  public resetTest() {
    this.isTestEnd = false;
    this.isTestPrepared = false;
    this.answerClickedOutput = false;
    this.resetStats();
  }

  /**
   *    CHECKS
   */
  private getRandomExercise(): ExerciseWithOccurrences {
    if (this.preparedTestExercises.length === 1) {
      return {
        exercise: this.preparedTestExercises[0].exercise,
        occurrences: this.preparedTestExercises[0].occurrences
      };
    }
    const exercise = this.preparedTestExercises[Math.floor(Math.random() * this.preparedTestExercises.length)];
    return {
      exercise: exercise.exercise,
      occurrences: exercise.occurrences
    };
  }

  // private getRandomExercise(): ExerciseWithOccurrences {
  //   // let i = 0;
  //   while (true) {
  //     const item = this.preparedTestExercises[Math.floor(Math.random() * this.preparedTestExercises.length)];
  //     if (item.occurrences > 0) {
  //       // return {
  //       //   exercise: item.exercise,
  //       //   occurrences: item.occurrences
  //       // };
  //       return item;
  //     }
  //   }
  // }

  private checkIfExerciseIsReviewedOrMastered(exercise: ExerciseWithOccurrences): void {
    const index = this.test.progress.reviewedExercisesIds.findIndex(x => x.id === exercise.exercise.id);
    if (exercise.occurrences > 0) {
      if (index === -1) { // tzn ze go jeszcze nie ma
        this.test.progress.reviewedExercisesIds.push({
          id: exercise.exercise.id,
          occurrences: exercise.occurrences
        });
      } else { // tzn ze juz jest
        this.test.progress.reviewedExercisesIds[index].occurrences = exercise.occurrences;
      }
    }
    if (exercise.occurrences === 0) {
      this.test.progress.masteredExercisesIds.push(exercise.exercise.id);
      this.test.progress.reviewedExercisesIds.splice(index, 1);


      const index2 = this.preparedTestExercises.findIndex(x => x.exercise.id === exercise.exercise.id);
      if (index2 !== -1) {
        this.preparedTestExercises.splice(index2, 1);
      }
    }

    // console.log(this.origTestExercises);
    console.log(this.preparedTestExercises);
  }

  private checkIfExerciseIsMastered(exerciseNumber: number): void {
    // === 1 (not 0) because we delete this exerciseWithOccurrences in the next step
    // if (this.testService.countOccurrencesInArray(this.preparedTestExercises, exerciseNumber) === 1) {
    //   this.masteredExercisesCount++;
    // }
  }

  private checkIfTestIsEnd(): void {
    this.isTestEnd = this.test.progress.masteredExercisesIds.length === this.origTestExercises.length;
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
