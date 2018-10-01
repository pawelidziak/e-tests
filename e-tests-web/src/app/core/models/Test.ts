export interface TestCreate {
  id?: string;
  name: string;
  tags: string[];
  desc?: string;
  createDate: number;
  authorId: string;
  isPublic: boolean;
  testStarted?: TestStarted;
}

export interface TestStarted {
  settings: TestSettings;
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
