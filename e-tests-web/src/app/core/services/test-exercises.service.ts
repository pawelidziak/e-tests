import {Injectable} from '@angular/core';
import {AngularFirestore, DocumentReference} from 'angularfire2/firestore';
import {Observable} from 'rxjs/internal/Observable';
import {Exercise} from '../models/Exercise';
import {map, shareReplay} from 'rxjs/operators';
import {CacheService} from './cache.service';

const CACHE_SIZE = 1;
const TEST_EXERCISES_KEY = 'current_test_exercises';

@Injectable()
export class TestExercisesService {

  private readonly TEST_PATH = 'tests';
  private readonly EXERCISES_PATH = 'exercises';
  private currentTestId: string;
  private EXERCISE_CREATE_DATE_FIELD = 'createDate';

  constructor(private readonly afs: AngularFirestore,
              private readonly cache: CacheService) {
  }

  public getTestExercises(testId: string): Observable<Exercise[]> {
    // if (this.currentTestId !== testId || !this.cache.get(TEST_EXERCISES_KEY)) {
    //   this.cache.set(TEST_EXERCISES_KEY, this.requestTestExercises(testId).pipe(shareReplay(CACHE_SIZE)));
    // }
    // return this.cache.get(TEST_EXERCISES_KEY);

    return this.requestTestExercises(testId);
  }

  private requestTestExercises(testId: string): Observable<Exercise[]> {
    this.currentTestId = testId;
    const testExercises = this.afs.collection<Exercise>(`${this.TEST_PATH}/${testId}/${this.EXERCISES_PATH}`,
      ref => ref.orderBy(this.EXERCISE_CREATE_DATE_FIELD));
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

  public updateOneExercise(testId: string, exercise: Exercise): Promise<void> {
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

  public addExerciseList(testId: string, list: Exercise[]): Promise<any> {
    const promises = [];
    for (const exercise of list) {
      promises.push(this.addOneExercise(testId, exercise));
    }
    return Promise.all(promises);
  }

}
