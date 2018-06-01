import {Component, Input, OnInit} from '@angular/core';
import {Exercise} from '../../core/models/Exercise';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss']
})
export class ExerciseListComponent implements OnInit {

  @Input() exerciseList: Array<Exercise>;
  @Input() testId: string;

  public newExercise: Exercise;

  constructor() {
  }

  ngOnInit() {
  }

  public showNewExercise() {
    this.newExercise = {
      question: '',
      answers: ['', ''],
      correctAnswer: 0,
      number: this.exerciseList.length + 1,
      testId: this.testId
    };
  }

  public handleAddedExercise(exercise: any): void {
    const index = this.exerciseList.findIndex(x => x.number === exercise.number);
    if (index === -1) {
      this.exerciseList.push(exercise);
    } else {
      this.exerciseList[index] = exercise;
    }
    this.newExercise = null;
  }

}
