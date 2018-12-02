import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Exercise} from '../models/Exercise';

@Injectable()
export class TestExercisesService {

  private readonly TEST_PATH = 'tests';

  constructor(private readonly afs: AngularFirestore) {
  }

  public saveExercises(testId: string, exercises: Exercise[]): Promise<void> {
    return this.afs.collection(this.TEST_PATH)
      .doc(testId)
      .update({exercises: exercises});
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
