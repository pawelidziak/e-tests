import {Injectable} from '@angular/core';
import {TestModel, TestSettings} from '../models/Test';
import {AngularFirestore} from 'angularfire2/firestore';
import {DocumentReference} from 'angularfire2/firestore/interfaces';
import {Observable} from 'rxjs/internal/Observable';
import {AuthService} from './auth.service';
import {map} from 'rxjs/operators';
import {ALL_ROUTES} from '../../shared/ROUTES';
import {Router} from '@angular/router';
import {CacheService} from './cache.service';
import {Exercise} from '../models/Exercise';
import {of} from "rxjs";

const CACHE_SIZE = 1;
const TEST_KEY = 'current_test';
const USER_TESTS_KEY = 'user_test';

@Injectable()
export class TestService {

  private readonly TEST_PATH = 'tests';
  private readonly USERS_PATH = 'users';
  private readonly USER_ID_FIELD = 'authorId';
  private readonly TEST_CREATE_DATE_FIELD = 'createDate';
  private readonly STARTED_TEST_FIELD = 'startedTest';
  private currentTestId: string;
  private LAST_MODIFIED = 'lastModified';

  constructor(private readonly afs: AngularFirestore,
              private readonly cache: CacheService,
              private readonly auth: AuthService,
              private readonly router: Router) {
  }

  public getTests(): Observable<TestModel[]> {
    // if (this.currentTestId !== testId || !this.cache.get(TEST_KEY)) {
    //   this.cache.set(TEST_KEY, this.requestTestById(testId).pipe(shareReplay(CACHE_SIZE)));
    // }
    // return this.cache.get(TEST_KEY);

    // first get the user tests
    const tests = this.afs.collection<TestModel>(this.TEST_PATH,
      ref => ref
        .orderBy(this.TEST_CREATE_DATE_FIELD, 'desc'));

    // then return it and additionally assigns the test id (that's why we use snapshotChanges().map(...) and
    // not valueChanges())
    return tests.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const id = a.payload.doc.id;
        // const author = this.afs.doc(a.payload.doc.data().authorId).ref.get().then(x => console.log(x));
        const data = a.payload.doc.data() as TestModel;
        return {id, ...data};
      });
    }));
  }


  public getAuthor(userId: string): Observable<any> {
    return this.afs.collection(this.USERS_PATH).doc(userId).valueChanges();
  }

  public getTestById(testId: string, checkExist: boolean = true): Observable<TestModel> {
    // if (this.currentTestId !== testId || !this.cache.get(TEST_KEY)) {
    //   this.cache.set(TEST_KEY, this.requestTestById(testId).pipe(shareReplay(CACHE_SIZE)));
    // }
    // return this.cache.get(TEST_KEY);

    return this.requestTestById(testId, checkExist);
  }

  private requestTestById(testId: string, checkExist: boolean = true): Observable<TestModel> {
    if (checkExist) {
      this.checkIfTestExists(testId);
    }
    this.currentTestId = testId;
    return this.afs.doc<TestModel>(`${this.TEST_PATH}/${testId}`).valueChanges();
  }

  public deleteOneTestSettings(testId: string): Promise<void> {
    return this.afs.collection('users')
      .doc(this.auth.currentUserId)
      .collection('startedTest')
      .doc(testId)
      .delete()
  }

  public getTestsByCurrentUser(): Observable<TestModel[]> {
    // if (!this.cache.get(USER_TESTS_KEY)) {
    //   this.cache.set(USER_TESTS_KEY, this.requestTestsByCurrentUser().pipe(shareReplay(CACHE_SIZE)));
    // }
    // return this.cache.get(USER_TESTS_KEY);
    return this.requestTestsByCurrentUser();
  }

  private requestTestsByCurrentUser(): Observable<TestModel[]> {
    // first get the user tests
    const userTest = this.afs.collection<TestModel>(this.TEST_PATH,
      ref => ref
        .where(this.USER_ID_FIELD, '==', this.auth.currentUserId)
        .orderBy(this.TEST_CREATE_DATE_FIELD, 'desc'));

    // then return it and additionally assigns the test id (that's why we use snapshotChanges().map(...) and
    // not valueChanges())
    return userTest.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as TestModel;
        return {id, ...data};
      });
    }));
  }

  public getStartedTestIdAndSettingsByCurrentUser(): Observable<TestSettings[]> {
    // first get the user tests
    const userTest = this.afs.collection(this.USERS_PATH)
      .doc(this.auth.currentUserId)
      .collection<TestSettings>(this.STARTED_TEST_FIELD,
        ref => ref
          .orderBy(this.LAST_MODIFIED, 'desc'));

    // then return it and additionally assigns the test id (that's why we use snapshotChanges().map(...) and
    // not valueChanges())
    return userTest.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as TestSettings;
        return {id, ...data};
      });
    }));
  }

  // private requestTestsByCurrentUser(): Observable<any[]> {
  //   // first get the user tests
  //   const userTest = this.afs.collection<TestModel>(this.TEST_PATH,
  //     ref => ref
  //       .where(this.USER_ID_FIELD, '==', this.auth.currentUserId)
  //       .orderBy(this.TEST_CREATE_DATE_FIELD, 'desc'));
  //
  //
  //   // then return it and additionally assigns the test id (that's why we use snapshotChanges().map(...) and
  //   // not valueChanges())
  //   return userTest.snapshotChanges().pipe(map(actions => {
  //     return actions.map(a => {
  //       const id = a.payload.doc.id;
  //
  //       const data = a.payload.doc.data() as TestModel;
  //
  //       const cos = this.afs.collection(this.USERS_PATH)
  //         .doc(this.auth.currentUserId)
  //         .collection(this.STARTED_TEST_FIELD)
  //         .doc(id)
  //         .ref.get()
  //         .then(res => {
  //           if (res.exists) {
  //             data.settings = res.data().settings;
  //           }
  //           return {id, ...data};
  //         })
  //         .catch(err => console.error(err));
  //
  //       return of(cos);
  //       // return {id, ...data};
  //     });
  //   }));
  // }

  public addTest(newTest: TestModel): Promise<DocumentReference> {
    return this.afs.collection(this.TEST_PATH).add(newTest);
  }

  public updateTest(testId: string, test: TestModel): Promise<void> {
    return this.afs.collection(this.TEST_PATH)
      .doc(testId)
      .update(test);
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
          this.router.navigate([ALL_ROUTES.DASHBOARD]);
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


  public setTestExercisesNumber(testId: string, exercisesNumber: number) {
    return this.afs.collection(this.TEST_PATH).doc(testId).update({exercisesNumber: exercisesNumber});
  }

}
