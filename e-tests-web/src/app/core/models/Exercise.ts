export interface Exercise {
  id?: string;
  question: string;
  answers: Array<string>;
  correctAnswer: number;
  number: number;
  testId?: string;
}

export interface ExerciseWithOccurrences {
  exercise: Exercise;
  occurrences: number;
}
