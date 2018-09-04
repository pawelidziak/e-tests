import {Injectable} from '@angular/core';
import {TestCreate} from '../models/Test';
import {AngularFirestore} from 'angularfire2/firestore';
import {DocumentReference} from 'angularfire2/firestore/interfaces';
import {Observable} from 'rxjs/internal/Observable';
import {AuthService} from './auth.service';
import {map} from 'rxjs/operators';
import {Exercise} from '../models/Exercise';

@Injectable()
export class NewTestService {

  private readonly TEST_PATH = 'tests';
  private readonly USER_ID_FIELD = 'authorId';
  private readonly EXERCISES_PATH = 'exercises';
  private readonly EXERCISE_NUMBER_FIELD = 'number';
  private readonly TEST_CREATE_DATE_FIELD = 'createDate';

  constructor(private readonly afs: AngularFirestore,
              private auth: AuthService) {
  }

  public addTest(newTest: TestCreate): Promise<DocumentReference> {
    return this.afs.collection(this.TEST_PATH).add(newTest);
  }

  public getTestById(testId: string): Observable<TestCreate> {
    return this.afs.doc<TestCreate>(`${this.TEST_PATH}/${testId}`).valueChanges();
  }

  public getTestExercises(testId: string): Observable<Exercise[]> {
    return this.afs.collection<Exercise>(`${this.TEST_PATH}/${testId}/${this.EXERCISES_PATH}`,
        ref => ref.orderBy(this.EXERCISE_NUMBER_FIELD)).valueChanges();
  }

  public getTestsByCurrentUser(): Observable<TestCreate[]> {
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
}
