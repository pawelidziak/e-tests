import {Component, OnInit} from '@angular/core';
import {Exercise, ExerciseWithOccurrences} from '../../core/models/Exercise';
import {StartTestEvent} from './test-config/test-config.component';
import {ActivatedRoute} from '@angular/router';
import {HeaderButtonType, HeaderService} from '../../core/services/header.service';
import {ROUTE_PARAMS} from '../../app.routing';

@Component({
  selector: 'app-test',
  templateUrl: './test-learn.component.html',
  styleUrls: ['./test-learn.component.scss']
})
export class TestLearnComponent implements OnInit {

  // bedzie id testu i bedzie laczenie do serwera / LUB BEDZIE TO W KOMPONENCIE WYZEJ
  // public test: Test;
  public preparedTestExercises: Array<ExerciseWithOccurrences> = [];
  public origTestExercises: Array<Exercise> = [];

  public currentExercise: ExerciseWithOccurrences;

  public occurrencesExerciseNumber: number;
  public repetitionExerciseNumber: number;

  public isAutoPlay = false;
  public autoPlayDuration = 1;

  public masteredExercisesCount: number;
  public reviewedExercisesCounter;
  public reviewedExercisesIds: Array<string>;

  // HELPERS
  public answerClickedOutput: boolean;
  public isTestEnd: boolean;
  public isTestStart: boolean;
  private testId: string;

  constructor(private route: ActivatedRoute,
              private headerService: HeaderService) {
  }

  ngOnInit() {
    const routeSub$ = this.route.parent.params.subscribe(params => this.testId = params[ROUTE_PARAMS.TEST_ID]);
    this.initStats();
    this.getTestExercises();
  }

  saveProgress(): void {
    console.log(this.preparedTestExercises);
  }

  public nextExercise(): void {
    if (this.checkIfTestIsEnd()) {
      this.isTestEnd = true;
      return;
    }
    this.currentExercise = this.getRandomExercise();
    this.answerClickedOutput = false;
  }

  /**
   *    HANDLERS
   */
  public handleStartTest(event: StartTestEvent) {
    this.occurrencesExerciseNumber = event.occurrencesNumber;
    this.repetitionExerciseNumber = event.repetitionNumber;
    this.prepareTestExercises();
    this.currentExercise = this.getRandomExercise();
    this.isTestStart = true;
  }

  public handleSelectedAnswer(event: ExerciseWithOccurrences) {
    this.answerClickedOutput = true;

    const index = this.preparedTestExercises.findIndex(x => x.exercise.id === event.exercise.id);
    this.preparedTestExercises[index] = event;

    if (event.occurrences === 0) {
      this.masteredExercisesCount++;
    }

    this.checkIfExerciseIsReviewed(event.exercise.id);

    if (this.isAutoPlay) {
      setTimeout(() => {
        this.nextExercise();
      }, this.autoPlayDuration * 1000);
    }
  }

  /**
   *    COUNTERS
   */
  public countMasteredRatio(): number {
    if (this.masteredExercisesCount === 0) {
      return 0;
    }
    return this.masteredExercisesCount / this.origTestExercises.length * 100;
  }

  /**
   *    RESETS
   */
  public resetTest() {
    this.isTestEnd = false;
    this.isTestStart = false;
    this.answerClickedOutput = false;
    this.resetStats();
    this.prepareTestExercises();
  }

  public countReviewedRatio(): number {
    if (this.reviewedExercisesCounter === 0) {
      return 0;
    }
    return this.reviewedExercisesCounter / this.origTestExercises.length * 100;
  }

  /**
   *    CHECKS
   */

  public checkNumberOfExerciseOccurrences(exerciseNumber: number): any {
    // return this.testService.countOccurrencesInArray(this.preparedTestExercises, exerciseNumber);
  }

  private initStats(): void {
    this.masteredExercisesCount = 0;
    this.reviewedExercisesIds = [];
    this.reviewedExercisesCounter = 0;
  }

  private getTestExercises() {
  //   const sub$ = this.testListService.getTestExercisesList(this.testId).subscribe(
  //     res => {
  //       this.origTestExercises = res;
  //       // this.headerService.setHeaderText(res.testName);
  //       // this.headerService.setHeaderText('');
  //     },
  //     error => console.log(error)
  //   );
  }

  private getRandomExercise(): ExerciseWithOccurrences {
    while (true) {
      const item = this.preparedTestExercises[Math.floor(Math.random() * this.preparedTestExercises.length)];
      if (item.occurrences > 0) {
        return {
          exercise: item.exercise,
          occurrences: item.occurrences
        };
      }
    }
  }

  private checkIfExerciseIsReviewed(exerciseId: string): void {
    if (this.reviewedExercisesIds.findIndex(x => x === exerciseId) === -1) {
      this.reviewedExercisesCounter++;
      this.reviewedExercisesIds.push(exerciseId);
    }
  }

  private checkIfExerciseIsMastered(exerciseNumber: number): void {
    // === 1 (not 0) because we delete this exerciseWithOccurrences in the next step
    // if (this.testService.countOccurrencesInArray(this.preparedTestExercises, exerciseNumber) === 1) {
    //   this.masteredExercisesCount++;
    // }
  }

  private checkIfTestIsEnd(): boolean {
    let flag = true;
    for (const exerciseWithOccurrences of this.preparedTestExercises) {
      if (exerciseWithOccurrences.occurrences > 0) {
        flag = false;
        break;
      }
    }
    return flag;
  }


  private resetStats(): void {
    this.reviewedExercisesCounter = 0;
    this.reviewedExercisesIds = [];
    this.masteredExercisesCount = 0;
  }

  private prepareTestExercises(): void {
    this.preparedTestExercises = [];
    for (const exercise of this.origTestExercises) {
      this.preparedTestExercises.push({exercise: exercise, occurrences: this.occurrencesExerciseNumber});
    }
    // this.testService.shuffleArray(this.preparedTestExercises);
  }

}
