import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Exercise} from '../../../core/models/Exercise';

@Component({
  selector: 'app-one-exercise',
  templateUrl: './one-exercise.component.html',
  styleUrls: ['./one-exercise.component.scss']
})
export class OneExerciseComponent implements OnInit {

  @Input() exercise: Exercise;
  @Input() showAnswers = false;
  @Input() editMode = false;
  @Output() addedExercise: EventEmitter<Exercise> = new EventEmitter<Exercise>();

  constructor() {
  }

  ngOnInit() {
  }

  public changeAnswersVisibility() {
    if (!this.editMode) {
      this.showAnswers = !this.showAnswers;
    }
  }

  public startEditExercise() {
    this.editMode = true;
    this.showAnswers = true;
  }

  public stopEditExercise() {
    this.editMode = false;
    // this.showAnswers[i] = false;
    this.showAnswers = true;
    this.changeEmptyInputs(this.exercise);
    this.addedExercise.emit(this.exercise);
  }

  public deleteOneAnswer(answers: Array<string>, i: number): void {
    answers.splice(i, 1);
  }

  public deleteOneExercise(): void {
    // this.exerciseList.splice(i, 1);
    // this.showAnswers.splice(i, 1);
    // this.editMode.splice(i, 1);
  }

  public getLetterFromAscii(i: number): string {
    return String.fromCharCode(65 + i);
  }

  public customTrackBy(index: number, obj: any): any {
    return index;
  }

  private changeEmptyInputs(exercise: Exercise) {
    if (exercise.question.trim().length === 0) {
      exercise.question = '...';
    }
    for (let i = 0; i < exercise.answers.length; i++) {
      if (exercise.answers[i].trim().length === 0) {
        exercise.answers[i] = '...';
      }
    }
  }
}
