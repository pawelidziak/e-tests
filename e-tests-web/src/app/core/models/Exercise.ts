export interface Exercise {
  question: string;
  answers: Array<string>;
  correctAnswers: Array<number>;
  createDate: number;
}

export interface ExerciseWithOccurrences {
  exercise: Exercise;
  occurrences: number;
}
