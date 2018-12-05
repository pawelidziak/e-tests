import {Component, HostListener, Input, OnDestroy, OnInit} from '@angular/core';
import {Exercise} from '../../core/models/Exercise';
import {AuthService} from '../../core/services/auth.service';
import {AppSettingsService} from '../../core/services/app-settings.service';
import {scaleOneZero, slideFromRightToRight} from '../../shared/animations';
import {TestExercisesService} from '../../core/services/test-exercises.service';
import {MatDialog} from '@angular/material';
import {
  AddEditExerciseComponent,
  CLOSE_OPERATION,
  ExerciseDialogClose
} from './add-edit-exercise/add-edit-exercise.component';

@Component({
  selector: 'app-display-exercises',
  templateUrl: './display-exercises.component.html',
  styleUrls: ['./display-exercises.component.scss'],
  animations: [scaleOneZero(), slideFromRightToRight()]
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
              private testExercisesService: TestExercisesService,
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

  /**
   * HELPERS
   */
  public identifier = (index: number, item: Exercise) => item.createDate;

  private saveExercises() {
    if (JSON.stringify(this.copyExerciseList) !== JSON.stringify(this.origExerciseList) &&
      this.copyExerciseList.length <= 100) {
      this.testExercisesService.saveExercises(this.testId, this.copyExerciseList)
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
        if (result && result.operation === CLOSE_OPERATION.SAVE) {
          this.copyExerciseList.push(result.exercise);
          if (this.copyExerciseList.length === 1) {
            this.saveExercises();
          }
        }
      });
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event) {
    this.saveExercises();
  }
}
