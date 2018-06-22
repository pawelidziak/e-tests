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

export interface NEWTest {
  testId?: string;
  testName: string;
  categories: Array<Category>;
  desc: string;
  author: string;
  createDate: Date;
  updateDate?: Date;
}
