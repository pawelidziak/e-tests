import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs/index';
import {CacheService} from './cache.service';
import {map, shareReplay} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {TestShortInfo} from '../models/TestShortInfo';
import {Exercise} from '../models/Exercise';

const CACHE_SIZE = 1;
const TESTS_LIST_CACHE_KEY = 'tests';

@Injectable()
export class TestListService {

  private currentTestShortInfo: TestShortInfo;
  private TMP_TESTS: Array<TestShortInfo> = [];
  private TMP_EXERCISES: Array<Exercise> = [];

  constructor(private http: HttpClient, private cache: CacheService) {
    this.TMPgenerateTests2();
    this.TMPgenerateTestExercise();
  }

  public getTestExercisesList(testId: string) {
    const tmp = [];
    for (const exercise of this.TMP_EXERCISES) {
      if (exercise.testId === testId) {
        tmp.push(exercise);
      }
    }
    return of(tmp);
  }

  public getOneTest(testId: string): Observable<TestShortInfo> {
    return of(this.TMP_TESTS.find(x => x.testId === testId));
  }

  public getTestsList(): Observable<TestShortInfo[]> {
    if (!this.cache.get(TESTS_LIST_CACHE_KEY)) {
      this.cache.set(TESTS_LIST_CACHE_KEY, this.requestTestsList().pipe(shareReplay(CACHE_SIZE)));
    }
    return this.cache.get(TESTS_LIST_CACHE_KEY);
  }

  saveCurrentTest(test: TestShortInfo): void {
    this.currentTestShortInfo = test;
  }

  getCurrentTest(): TestShortInfo {
    return this.currentTestShortInfo;
  }

  TMPgetAllTests(): Observable<Array<TestShortInfo>> {
    return of(this.TMP_TESTS);
  }

  private requestTestsList() {
    return this.TMPgetAllTests().pipe(
      map(response => response)
    );
  }

  private TMPgenerateTests2() {
    const MAX_TESTS = 5;

    for (let j = 0; j < MAX_TESTS; j++) {
      this.TMP_TESTS.push({
        testId: `testId-${j}`,
        testName: `Test, sed do eiusm ${j}`,
        exercisesListId: `exercisesId-${j}`,
        exercisesListSize: j,
        section: `section-${j}`,
        author: 'Paweł Idziak',
        desc: 'Superior developer experience, code completion, refactoring and less bugs\n',
        publicationDate: new Date()
      });
    }
  }

  private TMPgenerateTestExercise() {
    const MAX_EXERCISES = 2;
    for (let i = 0; i < MAX_EXERCISES; i++) {
      for (let j = 0; j < MAX_EXERCISES; j++) {
        this.TMP_EXERCISES.push({
          id: `exercise-${i}-${j}`,
          question: `question-${i}-${j}`,
          answers: ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'],
          correctAnswer: 0,
          number: j + 1,
          testId: `testId-${i}`,
        });
      }
    }
  }
}
