import {Component, OnInit} from '@angular/core';
import {Exercise} from '../../core/models/Exercise';
import {Test} from '../../core/models/Test';
import {AnswerClickedDTO} from './exercise/exercise.component';
import {TestService} from '../../core/services/TestService';
import {StartTestEvent} from './test-config/test-config.component';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/index';
import {HeaderService} from '../../core/services/HeaderService';
import {TestListService} from '../../core/services/TestListService';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  // bedzie id testu i bedzie laczenie do serwera / LUB BEDZIE TO W KOMPONENCIE WYZEJ
  public test: Test;
  public testExercises: Array<Exercise> = [];

  public occurrencesExerciseNumber: number;
  public repetitionExerciseNumber: number;

  public isAutoPlay = false;
  public autoPlayDuration = 1;

  public masteredExercisesCount: number;
  public reviewedExercisesCounter;
  public reviewedExercisesNumber: Array<number>;

  // HELPERS
  public answerClickedOutput: boolean;
  public isTestEnd: boolean;
  public isTestStart: boolean;
  private routeSub: Subscription;
  private testId: string;

  constructor(private testService: TestService,
              private testsListService: TestListService,
              private route: ActivatedRoute,
              private headerService: HeaderService) {
    this.routeSub = this.route.parent.params.subscribe(params => this.testId = params['testId']);
  }

  ngOnInit() {
    this.initStats();
    this.getTest();
  }

  saveProgress(): void {
    console.log(this.testExercises);
  }

  public nextExercise(): void {
    this.testExercises.splice(0, 1);
    this.answerClickedOutput = false;

    if (this.checkIfTestIsEnd()) {
      this.isTestEnd = true;
    }
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

  /**
   *    HANDLERS
   */
  public handleStartTest(event: StartTestEvent) {
    this.occurrencesExerciseNumber = event.occurrencesNumber;
    this.repetitionExerciseNumber = event.repetitionNumber;
    this.prepareTestExercises();
    this.isTestStart = true;
  }

  public handleSelectedAnswer(event: AnswerClickedDTO) {
    this.answerClickedOutput = true;

    if (!event.isCorrect) {
      this.addExerciseRepetition();
      this.testService.shuffleArray(this.testExercises);
    }
    this.checkIfExerciseIsReviewed(event.exerciseNumber);
    this.checkIfExerciseIsMastered(event.exerciseNumber);

    if (this.isAutoPlay) {
      setTimeout(() => {
        this.nextExercise();
      }, this.autoPlayDuration * 1000);
    }
  }

  private initStats(): void {
    this.masteredExercisesCount = 0;
    this.reviewedExercisesNumber = [];
    this.reviewedExercisesCounter = 0;
  }

  private getTest() {
    const sub$ = this.testService.getTest('id').subscribe(
      res => {
        this.test = res;
        this.headerService.setHeaderText(res.testName);
        this.headerService.setBackButton();
      },
      error => console.log(error)
    );
  }

  /**
   *    COUNTERS
   */
  public countMasteredRatio(): number {
    if (this.masteredExercisesCount === 0) {
      return 0;
    }
    return this.masteredExercisesCount / this.test.exercises.length * 100;
  }

  public countReviewedRatio(): number {
    if (this.reviewedExercisesCounter === 0) {
      return 0;
    }
    return this.reviewedExercisesCounter / this.test.exercises.length * 100;
  }

  /**
   *    CHECKS
   */
  public checkNumberOfExerciseOccurrences(exerciseNumber: number): number {
    return this.testService.countOccurrencesInArray(this.testExercises, exerciseNumber);
  }

  private checkIfExerciseIsReviewed(exerciseNumber: number): void {
    if (this.reviewedExercisesNumber.findIndex(x => x === exerciseNumber) === -1) {
      this.reviewedExercisesCounter++;
      this.reviewedExercisesNumber.push(exerciseNumber);
    }
  }

  private checkIfExerciseIsMastered(exerciseNumber: number): void {
    // === 1 (not 0) because we delete this exercise in the next step
    if (this.testService.countOccurrencesInArray(this.testExercises, exerciseNumber) === 1) {
      this.masteredExercisesCount++;
    }
  }

  private checkIfTestIsEnd(): boolean {
    return this.testExercises.length === 0;
  }

  private addExerciseRepetition() {
    if (this.repetitionExerciseNumber > 0) {
      // +1 because in te next step we delete current exercise
      for (let i = 0; i < this.repetitionExerciseNumber + 1; i++) {
        this.testExercises.push(this.testService.addNewExercise(this.testExercises[0]));
      }
    } else {
      this.testExercises.push(this.testService.addNewExercise(this.testExercises[0]));
    }
  }

  private resetStats(): void {
    this.reviewedExercisesCounter = 0;
    this.reviewedExercisesNumber = [];
    this.masteredExercisesCount = 0;
  }

  private prepareTestExercises(): void {
    this.testExercises = [];
    for (const exercise of this.test.exercises) {
      for (let i = 0; i < this.occurrencesExerciseNumber; i++) {
        this.testExercises.push(this.testService.addNewExercise(exercise));
      }
    }
    this.testService.shuffleArray(this.testExercises);
  }

}
