import {Injectable} from '@angular/core';
import {TestCreate} from '../models/Test';
import {AngularFirestore} from 'angularfire2/firestore';
import {DocumentReference} from 'angularfire2/firestore/interfaces';
import {Observable} from 'rxjs/internal/Observable';
import {AuthService} from './auth.service';
import {map, take} from 'rxjs/operators';
import {ALL_ROUTES} from '../../shared/ROUTES';
import {Router} from '@angular/router';

@Injectable()
export class NewTestService {

  private readonly TEST_PATH = 'tests';
  private readonly USER_ID_FIELD = 'authorId';
  private readonly TEST_CREATE_DATE_FIELD = 'createDate';

  constructor(private readonly afs: AngularFirestore,
              private readonly auth: AuthService,
              private readonly router: Router) {
  }

  public addTest(newTest: TestCreate): Promise<DocumentReference> {
    return this.afs.collection(this.TEST_PATH).add(newTest);
  }

  public updateTest(testId: string, test: TestCreate): Promise<void> {
    return this.afs.collection(this.TEST_PATH)
      .doc(testId)
      .update(test);
  }

  public getTestById(testId: string): Observable<TestCreate> {
    this.checkIfTestExists(testId);
    return this.afs.doc<TestCreate>(`${this.TEST_PATH}/${testId}`).valueChanges();
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
}
