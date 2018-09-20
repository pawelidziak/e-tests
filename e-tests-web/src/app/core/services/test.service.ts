import {Injectable} from '@angular/core';
import {TestCreate, TestProgress, TestSettings} from '../models/Test';
import {AngularFirestore} from 'angularfire2/firestore';
import {DocumentReference} from 'angularfire2/firestore/interfaces';
import {Observable} from 'rxjs/internal/Observable';
import {AuthService} from './auth.service';
import {map, shareReplay} from 'rxjs/operators';
import {ALL_ROUTES} from '../../shared/ROUTES';
import {Router} from '@angular/router';
import {CacheService} from './cache.service';
import {Exercise} from "../models/Exercise";

const CACHE_SIZE = 1;
const TEST_KEY = 'current_test';
const USER_TESTS_KEY = 'user_test';

@Injectable()
export class TestService {

  private readonly TEST_PATH = 'tests';
  private readonly USER_ID_FIELD = 'authorId';
  private readonly TEST_CREATE_DATE_FIELD = 'createDate';
  private currentTestId: string;

  constructor(private readonly afs: AngularFirestore,
              private readonly cache: CacheService,
              private readonly auth: AuthService,
              private readonly router: Router) {
  }

  public getTestById(testId: string): Observable<TestCreate> {
    if (this.currentTestId !== testId || !this.cache.get(TEST_KEY)) {
      this.cache.set(TEST_KEY, this.requestTestById(testId).pipe(shareReplay(CACHE_SIZE)));
    }
    return this.cache.get(TEST_KEY);
  }

  private requestTestById(testId: string): Observable<TestCreate> {
    this.currentTestId = testId;
    this.checkIfTestExists(testId);
    return this.afs.doc<TestCreate>(`${this.TEST_PATH}/${testId}`).valueChanges();
  }

  public getTestsByCurrentUser(): Observable<TestCreate[]> {
    if (!this.cache.get(USER_TESTS_KEY)) {
      this.cache.set(USER_TESTS_KEY, this.requestTestsByCurrentUser().pipe(shareReplay(CACHE_SIZE)));
    }
    return this.cache.get(USER_TESTS_KEY);
  }

  private requestTestsByCurrentUser(): Observable<TestCreate[]> {
    // first get the user tests
    const userTest = this.afs.collection<TestCreate>(this.TEST_PATH,
      ref => ref
        .where(this.USER_ID_FIELD, '==', this.auth.currentUserId)
        .orderBy(this.TEST_CREATE_DATE_FIELD, 'desc'));

    // then return it and additionally assigns the test id (that's why we use snapshotChanges().map(...) and
    // not valueChanges())
    return userTest.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as TestCreate;
        return {id, ...data};
      });
    }));
  }

  public addTest(newTest: TestCreate): Promise<DocumentReference> {
    return this.afs.collection(this.TEST_PATH).add(newTest);
  }

  public updateTest(testId: string, test: TestCreate): Promise<void> {
    return this.afs.collection(this.TEST_PATH)
      .doc(testId)
      .update(test);
  }

  public updateTestSettings(testId: string, testSettings: TestSettings): Promise<void> {
    return this.afs.collection(this.TEST_PATH)
      .doc(testId)
      .update({settings: testSettings});
  }

  public updateTestProgress(testId: string, progress: TestProgress): Promise<void> {
    return this.afs.collection(this.TEST_PATH)
      .doc(testId)
      .update({progress: progress});
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

  public shuffleAnswers(exercise: Exercise) {
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


}
