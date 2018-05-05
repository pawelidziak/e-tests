import {Exercise} from './Exercise';

export interface Test {
  testId: string;
  testName: string;
  exercises: Array<Exercise>;
}
