import {Exercise} from './Exercise';
import {Category} from './Category';

export interface Test {
  testId?: string;
  testName: string;
  exercises: Array<Exercise>;
  section: string;
  categories?: Array<Category>;
  author: string;
}
