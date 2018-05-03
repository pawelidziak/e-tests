import {Component, OnInit} from '@angular/core';
import {Exercise} from '../../core/models/Exercise';
import {Test} from '../../core/models/Test';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss']
})
export class ExerciseListComponent implements OnInit {

  // bedzie id testu i bedzie laczenie do serwera
  public test: Test;

  // kiedys bedzie jako input
  public activeExerciseNumber: number;
  public testExercises: Array<Exercise> = [];

  public answerClickedOutput: boolean;

  public previousExercisesNo = [];

  public isTestEnd: boolean;


  public occurrencesExerciseNumber = 1;
  public occurrencesWrongExerciseNumber = 2;

  public correctAnswerCount: number;
  public incorrectAnswerCount: number;
  public correctIncorrectRatio: number;

  public masteredExercisesCount: number;
  public masteredRatio: number;

  public showSettings = false;

  public isAutoPlay = false;
  public autoPlayDuration = 1;

  public reviewedExercisesNumber = [];
  public reviewedExercisesCounter = 0;


  constructor() {
  }

  ngOnInit() {
    this.correctAnswerCount = 0;
    this.incorrectAnswerCount = 0;
    this.correctIncorrectRatio = 1;

    this.masteredExercisesCount = 0;
    this.masteredRatio = 0;

    this.TMPgenerateExercises();
  }

  handleSelectAnswer(event) {
    this.answerClickedOutput = event;
  }

  handleSelectedAnswer(event: any) {
    this.activeExerciseNumber = event.exercise.number;
    // jesli odpowiedz jest nie poprawna to dodaj ja do aktualnych * liczba powtorzen
    // oraz zwieksz liczbe niepoprawnych odpowiedzi
    if (this.testExercises[0].correctAnswer !== event.answerIndex) {
      for (let i = 0; i < this.occurrencesWrongExerciseNumber; i++) {
        this.testExercises.push(this.addCurrentExercise());
      }
      this.incorrectAnswerCount++;
    } else {
      this.correctAnswerCount++;
    }

    // jesli zadania jeszcze nie przegladnieto, to zwieksz licznik
    if (this.reviewedExercisesNumber.findIndex(x => x === event.exercise.number) === -1) {
      this.reviewedExercisesCounter++;
      this.reviewedExercisesNumber.push(event.exercise.number);
    }

    console.log('reviewd: ' + this.reviewedExercisesCounter);

    if (this.isAutoPlay) {
      setTimeout(() => {
        this.nextExercise();
      }, this.autoPlayDuration * 1000);
    }

  }

  nextExercise(): void {

    this.testExercises.splice(0, 1);

    // sprawdz czy jest opanowana = czyli jej numeru nie ma = czyli juz nie jest w liscie
    if (this.countOccurrences(this.testExercises, this.activeExerciseNumber) === 0) {
      this.masteredExercisesCount++;
    }

    this.correctIncorrectRatio = this.countRatio();
    // this.masteredRatio = this.countMasteredRatio();

    // sprawdz czy test jest zakonczony = brak zadan
    if (!this.checkIsTestEnd()) {
      this.shuffleArray(this.testExercises);
      this.answerClickedOutput = false;
    } else {
      this.isTestEnd = true;
    }

  }

  resetTest() {
    this.isTestEnd = false;
    this.previousExercisesNo = [];
  }

  countOccurrences(dataSet, search: number) {
    return dataSet.reduce(function (n, val) {
      return n + (val.number === search);
    }, 0);
  }

  private setActiveExercise(index: number) {
    this.activeExerciseNumber = index;
  }

  private getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
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

  private countMasteredRatio(): number {
    if (this.masteredExercisesCount === 0) {
      return 0;
    }
    return this.masteredExercisesCount / this.test.exercises.length * 100;
  }

  private countReviewedRatio(): number {
    if (this.reviewedExercisesCounter === 0) {
      return 0;
    }
    return this.reviewedExercisesCounter / this.test.exercises.length * 100;
  }

  private countRatio(): number {
    if (this.incorrectAnswerCount === 0) {
      return 100;
    }
    return this.correctAnswerCount / this.incorrectAnswerCount * 100;
  }

  private checkIsTestEnd(): boolean {
    return this.testExercises.length === 0;
  }

  /**
   * Randomize array element order in-place.
   * Using Durstenfeld shuffle algorithm.
   */
  private shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  private TMPgenerateExercises() {
    const tmpList: Array<Exercise> = [];
    const MAX = 5;

    for (let i = 0; i < MAX; i++) {
      tmpList.push({
        id: `id${i}`,
        question: `Question ${i}`,
        answers: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'Answer 2', 'Answer 3', 'Answer 4'],
        correctAnswer: 0,
        number: i
      });
    }

    this.test = {
      testId: '1',
      testName: 'Test One',
      exercises: tmpList
    };


    this.assignExercises();
    this.shuffleArray(this.testExercises);
    this.setActiveExercise(0);
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
}
