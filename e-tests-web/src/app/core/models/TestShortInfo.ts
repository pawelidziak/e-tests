/**
 * It's using when we want to get Test List Information
 */
export interface TestShortInfo {
  testId: string;
  testName: string;
  exercisesListId: string;
  exercisesListSize: number;
  section: string;
  author: string;
  publicationDate: Date;
}
