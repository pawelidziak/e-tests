import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Exercise} from '@core/models';
import {MatDialog} from '@angular/material';
import {AppSettingsService} from '@core/services';
import {AddEditExerciseComponent} from '../add-edit-exercise/add-edit-exercise.component';
import {CLOSE_DIALOG_OPERATION, ExerciseDialogClose} from '@modules/display-exercises/models';

@Component({
  selector: 'app-display-one-exercise',
  templateUrl: './display-one-exercise.component.html',
  styleUrls: ['./display-one-exercise.component.scss']
})
export class DisplayOneExerciseComponent implements OnInit {

  @Input() exercise: Exercise;
  @Input() isAuthor: boolean;
  @Input() number: number;
  @Output() exerciseUpdated: EventEmitter<Exercise> = new EventEmitter();
  @Output() exerciseDeleted: EventEmitter<number> = new EventEmitter();

  constructor(private dialog: MatDialog,
              public appSettings: AppSettingsService) {
  }

  ngOnInit() {
  }

  public getLetterFromAscii(i: number): string {
    return String.fromCharCode(65 + i);
  }

  public checkIfIsCorrect(index: number): boolean {
    return this.exercise.correctAnswers.findIndex(x => x === index) !== -1;
  }

  public openExerciseDialog(): void {
    const dialogRef = this.dialog.open(AddEditExerciseComponent, {
      maxWidth: '90vw',
      panelClass: 'none-padding-mat-dialog',
      data: {exercise: JSON.parse(JSON.stringify(this.exercise)), isNew: false}
    });

    dialogRef.afterClosed().subscribe((result: ExerciseDialogClose) => {
      if (result) {
        switch (result.operation) {
          case CLOSE_DIALOG_OPERATION.SAVE:
            this.exerciseUpdated.emit(result.exercise);
            break;
          case CLOSE_DIALOG_OPERATION.DELETE:
            this.exerciseDeleted.emit(result.exerciseId);
            break;
        }
      }
    });
  }

}
