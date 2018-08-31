import {Injectable} from '@angular/core';
import {TestCreate} from '../models/Test';
import {AngularFirestore} from 'angularfire2/firestore';
import {DocumentReference} from 'angularfire2/firestore/interfaces';
import {Observable} from 'rxjs/internal/Observable';
import {AuthService} from './auth.service';
import {map} from 'rxjs/operators';

@Injectable()
export class NewTestService {

  private readonly TEST_PATH = 'tests';
  private readonly USER_ID_FIELD = 'authorId';
  private readonly EXERCISES_PATH = 'exercises';

  constructor(private readonly afs: AngularFirestore,
              private auth: AuthService) {
  }

  public addTest(newTest: TestCreate): Promise<DocumentReference> {
    return this.afs.collection(this.TEST_PATH).add(newTest);
  }

  public getTestById(testId: string): Observable<TestCreate> {
    return this.afs.doc<TestCreate>(`${this.TEST_PATH}/${testId}`).valueChanges();
  }

  public getTestExercises(testId: string) {
    return this.afs.collection(`${this.TEST_PATH}/${testId}/${this.EXERCISES_PATH}`).valueChanges();
  }

  public getTestByCurrentUser(): Observable<TestCreate[]> {
    // first get the user tests
    const userTest = this.afs.collection<TestCreate>(this.TEST_PATH,
      ref => ref
        .where(this.USER_ID_FIELD, '==', this.auth.currentUserId));

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
