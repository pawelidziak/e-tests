export interface Exercise {
  id?: string;
  question: string;
  answers: Array<string>;
  correctAnswer: number;
  createDate: number;
}

export interface ExerciseWithOccurrences {
  exercise: Exercise;
  occurrences: number;
}
