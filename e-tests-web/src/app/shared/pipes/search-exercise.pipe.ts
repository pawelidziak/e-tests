import {Pipe, PipeTransform} from '@angular/core';
import {Exercise} from '../../core/models/Exercise';

@Pipe({
  name: 'searchExercise'
})
export class SearchExercisePipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter((exercise: Exercise) => {
      const foundAnswer = exercise.answers.findIndex(answer => {
        return answer.toLowerCase().includes(searchText);
      });
      return foundAnswer !== -1 ||
        exercise.question.toLowerCase().includes(searchText);
    });
  }
}
