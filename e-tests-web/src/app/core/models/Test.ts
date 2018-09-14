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

export interface TestCreate {
  id?: string;
  name: string;
  tags: string[];
  desc?: string;
  createDate: number;
  authorId: string;
  isPublic: boolean;
  settings?: TestSettings;
  progress?: TestProgress;
}

export interface TestProgress {
  masteredExercisesIds: Array<string>;
  reviewedExercisesIds: Array<Wut>;
}

export interface TestSettings {
  occurrencesNumber: number;
  repetitionNumber: number;
}

interface Wut {

  id: string;
  occurrences: number;
}
