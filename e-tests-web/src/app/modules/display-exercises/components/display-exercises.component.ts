import {Component, HostListener, Input, OnDestroy, OnInit} from '@angular/core';
import {Exercise} from '@core/models';
import {AuthService, AppSettingsService, TestService} from '@core/services';
import {slideFromRightToRight} from '@shared/animations';
import {MatDialog} from '@angular/material';
import {AddEditExerciseComponent} from './add-edit-exercise/add-edit-exercise.component';
import {CLOSE_DIALOG_OPERATION, ExerciseDialogClose} from '@modules/display-exercises/models';

@Component({
  selector: 'app-display-exercises',
  templateUrl: './display-exercises.component.html',
  styleUrls: ['./display-exercises.component.scss'],
  animations: [slideFromRightToRight()]
})
export class DisplayExercisesComponent implements OnInit, OnDestroy {
  @Input() readonly origExerciseList: Array<Exercise>;
  @Input() readonly authorId: string;
  @Input() readonly editExercisesMode = false;
  @Input() readonly testId: string;

  public copyExerciseList: Array<Exercise>;
  public searchText: string;
  public searchInputFocused = false;

  constructor(public auth: AuthService,
              private testService: TestService,
              private dialog: MatDialog,
              public appSettings: AppSettingsService) {
  }

  ngOnInit() {
    this.copyExerciseList = JSON.parse(JSON.stringify(this.origExerciseList));
  }

  ngOnDestroy(): void {
    this.saveExercises();
  }

  public handleExerciseUpdated(exercise: Exercise): void {
    const index = this.copyExerciseList.findIndex(x => x.createDate === exercise.createDate);
    this.copyExerciseList[index] = exercise;
  }

  public handleExerciseDeleted(id: number): void {
    const index = this.copyExerciseList.findIndex(x => x.createDate === id);
    this.copyExerciseList.splice(index, 1);
    if (this.copyExerciseList.length === 0) {
      this.saveExercises();
    }
  }

  private saveExercises(): void {
    if (JSON.stringify(this.copyExerciseList) !== JSON.stringify(this.origExerciseList) &&
      this.copyExerciseList.length <= 100) {
      this.testService.saveExercises(this.testId, this.copyExerciseList)
        .catch(error => console.log(error));
    }
  }

  public openExerciseDialog(): void {
    if (this.copyExerciseList.length <= 100) {
      const newExercise: Exercise = {
        question: '',
        answers: ['', ''],
        correctAnswers: [0],
        createDate: new Date().getTime()
      };

      const dialogRef = this.dialog.open(AddEditExerciseComponent, {
        maxWidth: '90vw',
        panelClass: 'none-padding-mat-dialog',
        data: {exercise: newExercise, isNew: true}
      });

      dialogRef.afterClosed().subscribe((result: ExerciseDialogClose) => {
        if (result && result.operation === CLOSE_DIALOG_OPERATION.SAVE) {
          this.copyExerciseList.push(result.exercise);
          if (this.copyExerciseList.length === 1) {
            this.saveExercises();
          }
        }
      });
    }
  }

  /**
   * HELPERS
   */
  public identifier = (index: number, item: Exercise) => item.createDate;

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler() {
    this.saveExercises();
  }
}
