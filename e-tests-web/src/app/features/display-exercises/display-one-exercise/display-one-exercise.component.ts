import {Component, Input, OnInit} from '@angular/core';
import {Exercise} from '../../../core/models/Exercise';

@Component({
  selector: 'app-display-one-exercise',
  templateUrl: './display-one-exercise.component.html',
  styleUrls: ['./display-one-exercise.component.scss']
})
export class DisplayOneExerciseComponent implements OnInit {

  @Input() exercise: Exercise;
  @Input() editMode = false;
  @Input() readonly showActionRow = true;
  private copyExercise: Exercise;

  constructor() {
  }

  ngOnInit() {
  }

  public getLetterFromAscii(i: number): string {
    return String.fromCharCode(65 + i);
  }

  public deleteOneAnswer(answers: Array<string>, i: number): void {
    answers.splice(i, 1);
  }

  public customTrackBy(index: number, obj: any): any {
    return index;
  }

  public startEditExercise(): void {
    this.editMode = true;
    this.copyExercise = JSON.parse(JSON.stringify(this.exercise));
  }

  public stopEditExercise(): void {
    if (this.editMode) {
      this.editMode = false;
      this.exercise = JSON.parse(JSON.stringify(this.copyExercise));
      delete this.copyExercise;
    }
  }

  public saveExercise(): void {
    this.editMode = false;
    // TODO save
  }
}
