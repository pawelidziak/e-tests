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
  tags: Array<String>;
  desc: string;
  author: string;
  createDate: Date;
  updateDate?: Date;
}

export interface TestCreate {
  id?: string;
  name: string;
  tags: string[];
  desc?: string;
  createDate: FirebaseTimestamp;
  authorId: string;
  isPublic: boolean;
}

interface FirebaseTimestamp {
  nanoseconds: number;
  seconds: number;
}
