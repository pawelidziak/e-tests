import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Exercise} from '@core/models';
import {AppSettingsService, TestService} from '@core/services';
import {CLOSE_DIALOG_OPERATION, ExerciseDialogClose} from '@modules/display-exercises/models';

@Component({
  selector: 'app-add-edit-exercise',
  templateUrl: './add-edit-exercise.component.html',
  styleUrls: ['./add-edit-exercise.component.scss']
})
export class AddEditExerciseComponent implements OnInit {

  public isNew: boolean;
  public exercise: Exercise;

  constructor(public dialogRef: MatDialogRef<AddEditExerciseComponent, ExerciseDialogClose>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public appSettings: AppSettingsService,
              private testService: TestService) {
  }

  ngOnInit() {
    this.isNew = this.data.isNew;
    this.exercise = this.data.exercise;
  }

  public saveExercise(): void {
    this.testService.fixExercise(this.exercise);
    this.dialogRef.close({exercise: this.exercise, operation: CLOSE_DIALOG_OPERATION.SAVE});
  }

  public deleteExercise(): void {
    this.dialogRef.close({exerciseId: this.exercise.createDate, operation: CLOSE_DIALOG_OPERATION.DELETE});
  }

  /**
   *    HELPERS
   */
  public deleteOneAnswer(i: number): void {
    this.exercise.answers.splice(i, 1);
  }

  public customTrackBy(index: number, obj: any): any {
    return index;
  }

  public checkIfIsCorrect(index: number): boolean {
    return this.exercise.correctAnswers.findIndex(x => x === index) !== -1;
  }

  public getLetterFromAscii(i: number): string {
    return String.fromCharCode(65 + i);
  }

  public changeCorrectAnswer(index: number, correct: boolean): void {
    const tmp = this.exercise.correctAnswers.findIndex(x => x === index);
    if (correct) {
      this.exercise.correctAnswers.push(index);
    } else {
      this.exercise.correctAnswers.splice(tmp, 1);
    }
  }

}
