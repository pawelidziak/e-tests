import {Component, OnInit} from '@angular/core';
import {Exercise} from '../../core/models/Exercise';
import {Test} from '../../core/models/Test';
import {AnswerClickedDTO} from '../exercise/exercise.component';
import {TestService} from '../../core/services/TestService';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss']
})
export class ExerciseListComponent implements OnInit {

  // bedzie id testu i bedzie laczenie do serwera / LUB BEDZIE TO W KOMPONENCIE WYZEJ
  public test: Test;
  public testExercises: Array<Exercise> = [];

  // SETTINGS
  public showSettings = false;

  public occurrencesExerciseNumber = 1;
  public occurrencesWrongExerciseNumber = 2;

  public masteredExercisesCount: number;
  public masteredRatio: number;

  public isAutoPlay = false;
  public autoPlayDuration = 1;

  public reviewedExercisesNumber = [];
  public reviewedExercisesCounter = 0;

  // HELPERS
  public answerClickedOutput: boolean;
  public isTestEnd: boolean;


  constructor(private testService: TestService) {
  }

  ngOnInit() {
    this.masteredExercisesCount = 0;
    this.masteredRatio = 0;

    this.getTest();
  }

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

  public handleSelectedAnswer(event: AnswerClickedDTO) {
    this.answerClickedOutput = true;

    if (!event.isCorrect) {
      this.addExerciseRepetitionAndShuffle();
    }
    this.checkIfExerciseIsReviewed(event.exerciseNumber);
    this.checkIfExerciseIsMastered(event.exerciseNumber);

    if (this.isAutoPlay) {
      setTimeout(() => {
        this.nextExercise();
      }, this.autoPlayDuration * 1000);
    }
  }

  public checkNumberOfExerciseOccurrences(exerciseNumber: number): number {
    return this.testService.countOccurrencesInArray(this.testExercises, exerciseNumber);
  }

  public nextExercise(): void {
    this.testExercises.splice(0, 1);
    this.answerClickedOutput = false;

    if (this.checkIfTestIsEnd()) {
      this.isTestEnd = true;
      return;
    }
  }

  public resetTest() {
    this.isTestEnd = false;
    this.resetStats();
    this.prepareTest();
  }

  private getTest() {
    const sub$ = this.testService.getTest().subscribe(
      res => {
        this.test = res;
        this.prepareTest();
      },
      error => console.log(error)
    );
  }

  private addCurrentExercise(): Exercise {
    return {
      id: this.testExercises[0].id,
      number: this.testExercises[0].number,
      question: this.testExercises[0].question,
      answers: this.testExercises[0].answers,
      correctAnswer: this.testExercises[0].correctAnswer,
    };
  }

  private prepareTest(): void {
    this.assignExercises();
    this.testService.shuffleArray(this.testExercises);
  }

  /**
   Powielam zadania zgodnie z ustaloną wcześniej liczbą
   */
  private assignExercises(): void {
    for (const exercise of this.test.exercises) {
      for (let i = 0; i < this.occurrencesExerciseNumber; i++) {
        this.testExercises.push(exercise);
      }
    }
  }

  private addExerciseRepetitionAndShuffle() {
    // +1 because in te next step we delete current exercise
    for (let i = 0; i < this.occurrencesWrongExerciseNumber + 1; i++) {
      this.testExercises.push(this.addCurrentExercise());
    }
    this.testService.shuffleArray(this.testExercises);
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


  private resetStats(): void {
    this.reviewedExercisesCounter = 0;
    this.reviewedExercisesNumber = [];
    this.masteredExercisesCount = 0;

  }
}
