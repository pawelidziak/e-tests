import {Injectable} from '@angular/core';
import {Test} from '../models/Test';
import {Exercise} from '../models/Exercise';
import {Observable, of} from 'rxjs/index';

@Injectable()
export class TestListService {

  constructor() {
  }

  getUserTests(): Observable<Array<Test>> {
    // TODO connect to backend
    // return new Observable.create.arguments(this.TMPgenerateTests());
    return of(this.TMPgenerateTests());
  }

  getAllTests(): Observable<Array<Test>> {
    // TODO connect to backend
    // return new Observable.create.arguments(this.TMPgenerateTests());
    return of(this.TMPgenerateTests2());
  }

  // TMP
  private TMPgenerateTests() {
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

    const testList: Array<Test> = [];
    const MAX_TESTS = 5;
    for (let j = 0; j < MAX_TESTS; j++) {
      testList.push({
        testId: `id${j}`,
        testName: `Test Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusm ${j}`,
        exercises: tmpList,
        section: 'Section test',
        author: 'Paweł Idziak'
      });
    }
    return testList;
  }

  private TMPgenerateTests2() {
    const tmpList: Array<Exercise> = [];
    const MAX = 5;

    for (let i = 0; i < MAX; i++) {
      tmpList.push({
        id: `id${i}`,
        question: `Question ${i}`,
        answers: ['Let dolore magna aliqua.', 'Answer 2', 'Answer 3', 'Answer 4'],
        correctAnswer: 0,
        number: i
      });
    }

    const testList: Array<Test> = [];
    const MAX_TESTS = 5;
    for (let j = 0; j < MAX_TESTS; j++) {
      testList.push({
        testId: `id${j}`,
        testName: `Test, sed do eiusm ${j}`,
        exercises: tmpList,
        section: 'Section test',
        author: 'Paweł Idziak'
      });
    }
    return testList;
  }
}
