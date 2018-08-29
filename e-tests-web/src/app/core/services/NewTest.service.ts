import {Injectable} from '@angular/core';
import {TestCreate} from '../models/Test';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {DocumentReference} from 'angularfire2/firestore/interfaces';

@Injectable()
export class NewTestService {

  private readonly NEW_TEST_PATH = 'tests';

  private testCollectionRef: AngularFirestoreCollection<TestCreate>;

  constructor(private readonly afs: AngularFirestore) {
    this.initCollectionRef();
  }

  /**
   * Method initializes the reference to the collection in Firestore.
   */
  private initCollectionRef(): void {
    this.testCollectionRef = this.afs.collection<TestCreate>(this.NEW_TEST_PATH);
  }

  public addTest(newTest: TestCreate): Promise<DocumentReference> {
    return this.testCollectionRef.add(newTest);
  }

}
