import {Injectable} from '@angular/core';
import {Exercise} from '../models/Exercise';
import {Test} from '../models/Test';
import {of} from 'rxjs/index';

@Injectable()
export class TestService {

  constructor() {
  }


  public getTest(testId: string) {
    // TODO connect to backend
    // return new Observable.create.arguments(this.TMPgenerateExercises());
    return of(this.TMPgenerateExercises());
  }

  public countOccurrencesInArray(array: Array<any>, search: number): number {
    return array.reduce(function (n, val) {
      return n + (val.number === search);
    }, 0);
  }

  public addNewExercise(exercise: Exercise): Exercise {
    return {
      id: exercise.id,
      number: exercise.number,
      question: exercise.question,
      answers: exercise.answers,
      correctAnswer: exercise.correctAnswer,
      testId: exercise.testId
    };
  }

  /**
   * EXTENDED (by exclusion first element) modern version of the Fisher–Yates shuffle algorithm
   * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
   *
   * @param array
   */
  public shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      if (j !== 0 && j !== 0) {
        [array[i], array[j]] = [array[j], array[i]];
      } else {
        i++;
      }
    }
  }


  // TMP
  private TMPgenerateExercises() {
    const tmpList: Array<Exercise> = [];
    const MAX = 15;

    for (let i = 0; i < MAX; i++) {
      tmpList.push({
        id: `id${i}`,
        question: `Question ${i}`,
        answers: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'Answer 2', 'Answer 3', 'Answer 4'],
        correctAnswer: 0,
        number: i,
        testId: ''
      });
    }

    const test: Test = {
      testId: '1',
      testName: 'Test One',
      exercises: tmpList,
      section: 'Section test-learn',
      author: 'Paweł Idziak'
    };

    return test;
  }

}
