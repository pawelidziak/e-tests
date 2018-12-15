import {Injectable} from '@angular/core';
import {TestModel, TestSettings} from '../models/Test';
import {AngularFirestore} from 'angularfire2/firestore';
import {AuthService} from './auth.service';
import {map, shareReplay} from 'rxjs/operators';
import {ALL_ROUTES} from '@shared/routes';
import {Router} from '@angular/router';
import {Exercise} from '@core/models';
import {LoaderService} from './loader.service';
import {Observable} from 'rxjs/internal/Observable';
import {of} from 'rxjs';
import {CacheUtils} from '@shared/utils';

const CACHE_SIZE = 1;
const TEST_KEY = 'current_test';
const USER_TESTS_KEY = 'user_created_test';
const USER_STARTED_TESTS = 'user_started_tests';
const ALL_TESTS = 'all_tests';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  private readonly TEST_PATH = 'tests';
  private readonly USERS_PATH = 'users';
  private readonly USER_ID_FIELD = 'authorId';
  private readonly TEST_CREATE_DATE_FIELD = 'createDate';
  private readonly STARTED_TEST_FIELD = 'startedTest';
  private readonly LAST_MODIFIED = 'lastModified';
  private currentTestId: string;

  constructor(private readonly afs: AngularFirestore,
              private readonly auth: AuthService,
              private readonly router: Router,
              private readonly loader: LoaderService) {
  }

  /**
   *      ADD TEST
   */
  public addTest(newTest: TestModel): Promise<any> {
    this.removeCreatedTestFromCache();
    return this.afs.collection(this.TEST_PATH).add(newTest);
  }

  /**
   *      UPDATE TEST
   */
  public updateTest(testId: string, test: TestModel): Promise<void> {
    this.removeCreatedTestFromCache();
    this.removeTestStartedFromCache();
    return this.afs.collection(this.TEST_PATH)
      .doc(testId)
      .update(test);
  }

  /**
   *      REMOVE TEST
   */
  public deleteTest(testId: string): Promise<void> {
    this.removeCurrentTestFromCache();
    this.removeCreatedTestFromCache();
    this.removeTestStartedFromCache();
    return this.afs.collection(this.TEST_PATH).doc(testId).delete();
  }

  /**
   *      GET TEST AUTHOR
   */
  public getAuthor(userId: string): Observable<any> {
    return this.afs.collection(this.USERS_PATH).doc(userId).valueChanges();
  }

  public saveExercises(testId: string, exercises: Exercise[]): Promise<void> {
    return this.afs.collection(this.TEST_PATH)
      .doc(testId)
      .update({exercises: exercises});
  }

  /**
   *      GET ALL TESTS
   */
  public getTests(): Observable<TestModel[]> {
    if (!CacheUtils.get(ALL_TESTS)) {
      CacheUtils.set(ALL_TESTS, this.requestGetTests().pipe(shareReplay(CACHE_SIZE)));
    }
    return CacheUtils.get(ALL_TESTS);
  }

  private requestGetTests(): Observable<TestModel[]> {
    // first get the user tests
    const tests = this.afs.collection<TestModel>(this.TEST_PATH,
      ref => ref
        .orderBy(this.TEST_CREATE_DATE_FIELD, 'desc'));

    // then return it and additionally assigns the test id
    return tests.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as TestModel;
        return {id, ...data};
      });
    }));
  }

  /**
   *      GET TEST BY ID
   */
  public getTestById(testId: string, checkCache: boolean = true): Observable<TestModel> {
    if (checkCache) {
      if (this.currentTestId !== testId || !CacheUtils.get(TEST_KEY)) {
        CacheUtils.set(TEST_KEY, this.requestTestById(testId).pipe(shareReplay(CACHE_SIZE)));
      }
      return CacheUtils.get(TEST_KEY);
    }
    return this.requestTestById(testId);
  }

  public removeCurrentTestFromCache(): void {
    CacheUtils.clear(TEST_KEY);
  }

  private requestTestById(testId: string): Observable<TestModel> {
    this.checkIfTestExists(testId);
    this.currentTestId = testId;
    return this.afs.doc<TestModel>(`${this.TEST_PATH}/${testId}`).valueChanges();
  }

  /**
   *      DELETE ONE USER STARTED TEST SETTINGS
   */
  public deleteOneTestSettings(testId: string): Promise<void> {
    return this.afs.collection('users')
      .doc(this.auth.currentUserId)
      .collection('startedTest')
      .doc(testId)
      .delete();
  }

  /**
   *      GET TESTS CREATED BY CURRENT USER
   */
  public getTestsByCurrentUser(): any {
    if (CacheUtils.get(USER_TESTS_KEY)) {
      return {fromCache: true, observable: CacheUtils.get(USER_TESTS_KEY)};
    }
    return {fromCache: false, observable: this.requestTestsByCurrentUser()};
  }

  public saveUserTestToCache(userTests: TestModel[]): void {
    CacheUtils.set(USER_TESTS_KEY, of(userTests));
  }

  private removeCreatedTestFromCache(): void {
    CacheUtils.clear(USER_TESTS_KEY);
  }

  private requestTestsByCurrentUser(): Observable<TestModel[]> {
    // first get the user tests
    const userTest = this.afs.collection<TestModel>(this.TEST_PATH,
      ref => ref
        .where(this.USER_ID_FIELD, '==', this.auth.currentUserId)
        .orderBy(this.TEST_CREATE_DATE_FIELD, 'desc'));

    // then return it and additionally assigns the test id
    return userTest.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as TestModel;
        return {id, ...data};
      });
    }));
  }

  /**
   *      GET TESTS STARTED BY CURRENT USER (just test id with settings)
   */
  public getStartedTestIdAndSettingsByCurrentUser(): any {
    if (CacheUtils.get(USER_STARTED_TESTS)) {
      return {fromCache: true, observable: CacheUtils.get(USER_STARTED_TESTS)};
    }
    return {fromCache: false, observable: this.requestStartedTestIdAndSettingsByCurrentUser()};
  }

  public saveStartedTestToCache(testList: TestModel[]): void {
    CacheUtils.set(USER_STARTED_TESTS, of(testList));
  }

  private removeTestStartedFromCache(): void {
    CacheUtils.clear(USER_STARTED_TESTS);
  }

  public requestStartedTestIdAndSettingsByCurrentUser(): Observable<TestSettings[]> {
    // first get the user tests
    const userTest = this.afs.collection(this.USERS_PATH)
      .doc(this.auth.currentUserId)
      .collection<TestSettings>(this.STARTED_TEST_FIELD, ref => ref
        .orderBy(this.LAST_MODIFIED, 'desc'));

    // then return it and additionally assigns the test id
    return userTest.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as TestSettings;
        return {id, ...data};
      });
    }));
  }

  /**
   *  TEST SETTINGS
   */
  public getTestSettings(testId: string): Observable<TestSettings> {
    return this.afs.collection(this.USERS_PATH)
      .doc(this.auth.currentUserId)
      .collection(this.STARTED_TEST_FIELD)
      .doc<TestSettings>(testId)
      .valueChanges();
  }

  public setTestStarted(testId: string, testStarted: TestSettings): Promise<void> {
    this.removeTestStartedFromCache();
    this.removeCreatedTestFromCache();
    return this.afs.collection(this.USERS_PATH)
      .doc(this.auth.currentUserId)
      .collection(this.STARTED_TEST_FIELD)
      .doc(testId)
      .set(Object.assign({}, testStarted));
  }

  /**
   * Method checks if 'test' with given id exists in firestore, if not it navigate to 404 page
   * @param {string} testId
   */
  private checkIfTestExists(testId: string): void {
    this.afs.doc(`${this.TEST_PATH}/${testId}`).ref.get()
      .then(docSnapshot => {
        if (!docSnapshot.exists) {
          this.removeCurrentTestFromCache();
          this.router.navigate([ALL_ROUTES.DASHBOARD]).then(() => this.loader.complete());
        }
      });
  }

  /**
   * EXTENDED (by exclusion first element) modern version of the Fisher–Yates shuffle algorithm
   * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
   *
   * @param exercise
   */
  public shuffleAnswers(exercise: Exercise): void {
    for (let i = exercise.answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [exercise.answers[i], exercise.answers[j]] = [exercise.answers[j], exercise.answers[i]];
      const indexI = exercise.correctAnswers.findIndex(x => x === i);
      const indexJ = exercise.correctAnswers.findIndex(x => x === j);
      if (indexI !== -1) {
        exercise.correctAnswers[indexI] = j;
      }
      if (indexJ !== -1) {
        exercise.correctAnswers[indexJ] = i;
      }
    }
    exercise.correctAnswers.sort((a, b) => a - b);
  }

  /**
   * Replace empty question and delete empty answers
   * @param exercise
   */
  public fixExercise(exercise: Exercise) {
    if (exercise.question === '') {
      exercise.question = 'Empty question...';
    }
    for (let i = 0; i < exercise.answers.length; i++) {
      if (exercise.answers[0] === '') {
        exercise.answers[0] = 'Empty answer A ...';
      }
      if (exercise.answers[1] === '') {
        exercise.answers[1] = 'Empty answer B ...';
      }
      if (i > 1 && exercise.answers[i] === '') {
        exercise.answers.splice(i, 1);
        i--;
      }
    }
  }
}
