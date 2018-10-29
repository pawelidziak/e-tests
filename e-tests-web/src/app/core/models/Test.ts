export interface TestModel {
  id?: string;
  name: string;
  tags: string[];
  desc?: string;
  createDate: number;
  authorId: string;
  isPublic: boolean;
  settings?: TestSettings;
  authorObj?: any;
}

export interface TestSettings {
  config: TestConfig;
  progress?: TestProgress;
}

export interface TestConfig {
  occurrencesNumber: number;
  repetitionNumber: number;
}

export interface TestProgress {
  masteredExercisesIds: Array<string>;
  reviewedExercisesIds: Array<ExerciseOccurrences>;
}

interface ExerciseOccurrences {
  id: string;
  occurrences: number;
}
