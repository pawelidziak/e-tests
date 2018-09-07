import {Injectable} from '@angular/core';
import {AngularFirestore, DocumentReference} from 'angularfire2/firestore';
import {Observable} from 'rxjs/internal/Observable';
import {Exercise} from '../models/Exercise';
import {map} from 'rxjs/operators';
import * as firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;
import {FirebaseTimestamp} from "../models/Test";

@Injectable()
export class TestExercisesService {

  private readonly TEST_PATH = 'tests';
  private readonly EXERCISES_PATH = 'exercises';
  private readonly EXERCISE_DATE_FIELD = 'createDate';

  constructor(private readonly afs: AngularFirestore) {
  }

  public getTestExercises(testId: string): Observable<Exercise[]> {
    const testExercises = this.afs.collection<Exercise>(`${this.TEST_PATH}/${testId}/${this.EXERCISES_PATH}`,
      ref => ref.orderBy(this.EXERCISE_DATE_FIELD));

    return testExercises.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as Exercise;
        return {id, ...data};
      });
    }));
  }

  public addOneExercise(testId: string, exercise: Exercise): Promise<DocumentReference> {
    return this.afs.collection(`${this.TEST_PATH}/${testId}/${this.EXERCISES_PATH}`)
      .add(exercise);
  }

  public updateOneExercise(testId: string, exercise: Exercise): any {
    const copyExercise = JSON.parse(JSON.stringify(exercise));
    delete copyExercise.id;

    return this.afs.collection(`${this.TEST_PATH}/${testId}/${this.EXERCISES_PATH}`)
      .doc(exercise.id)
      .update(copyExercise);
  }

  public deleteOneExercise(testId: string, exerciseId: string): Promise<void> {
    return this.afs.collection(`${this.TEST_PATH}/${testId}/${this.EXERCISES_PATH}`)
      .doc(exerciseId)
      .delete();
  }

}
