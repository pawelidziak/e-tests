import * as firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;

export interface TestModel {
  id?: string;
  name: string;
  tags: string[];
  desc?: string;
  createDate: number;
  exercisesNumber: number;
  authorId: string;
  isPublic: boolean;
  settings?: TestSettings;
  startedBy?: any[];
  authorObj?: any;
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
  masteredExercisesIds: Array<string>;
  reviewedExercisesIds: Array<ExerciseOccurrences>;
}

interface ExerciseOccurrences {
  id: string;
  occurrences: number;
}
