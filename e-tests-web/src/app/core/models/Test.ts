import {Exercise} from './Exercise';

export interface TestModel {
  id?: string;
  name: string;
  tags: string[];
  desc?: string;
  createDate: number;
  authorId: string;
  isPublic: boolean;
  settings?: TestSettings;
  startedBy?: any[];
  authorObj?: any;
  exercises?: Exercise[];
}

export interface TestSettings {
  config: TestConfig;
  progress?: TestProgress;
  lastModified: number;
}

export interface TestConfig {
  occurrencesNumber: number;
  repetitionNumber: number;
}

export interface TestProgress {
  masteredExercisesIds: Array<number>;
  reviewedExercisesIds: Array<ExerciseOccurrences>;
}

interface ExerciseOccurrences {
  id: number;
  occurrences: number;
}
