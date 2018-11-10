import {AfterViewChecked, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Exercise} from '../../../core/models/Exercise';
import {TestExercisesService} from '../../../core/services/test-exercises.service';
import {MatSnackBar} from '@angular/material';
import {AppSettingsService} from '../../../core/services/app-settings.service';

@Component({
  selector: 'app-display-one-exercise',
  templateUrl: './display-one-exercise.component.html',
  styleUrls: ['./display-one-exercise.component.scss']
})
export class DisplayOneExerciseComponent implements OnInit, AfterViewChecked {

  @Input() exercise: Exercise;
  @Input() editMode = false;
  @Input() isNew = false;
  @Input() readonly testId: string;
  @Input() readonly isAuthor: boolean;
  @Input() readonly number: number;
  @Input() importMode: boolean;
  @Output() exerciseDeleted: EventEmitter<Exercise> = new EventEmitter();
  @Output() exerciseAdded: EventEmitter<Exercise> = new EventEmitter();
  @Output() exerciseCanceled: EventEmitter<Exercise> = new EventEmitter();

  private copyExercise: Exercise;
  public disabledAnim = false;

  constructor(private exercisesService: TestExercisesService,
              public appSettings: AppSettingsService,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    if (this.editMode) {
      this.copyExercise = JSON.parse(JSON.stringify(this.exercise));
    }
  }

  public startEditExercise(): void {
    this.editMode = true;
    this.copyExercise = JSON.parse(JSON.stringify(this.exercise));
  }

  public stopEditExercise(): void {
    this.editMode = false;
    if (this.copyExercise) {
      this.exercise = JSON.parse(JSON.stringify(this.copyExercise));
      delete this.copyExercise;
    }
    this.exerciseCanceled.emit(this.exercise);
  }

  public saveExercise(): void {
    this.editMode = false;
    this.checkExerciseThenFix();

    // if (this.exercise.id) {
    //   this.exercisesService.updateOneExercise(this.testId, this.exercise)
    //     .catch(error => this.openSnackBar(error, 10000));
    // } else {
    //   this.exercisesService.addOneExercise(this.testId, this.exercise)
    //     .then(res => {
    //       if (res.id) {
    //         this.exercise.id = res.id;
    //       }
    //     })
    //     .catch(error => this.openSnackBar(error, 10000));
    // }
  }

  public deleteExercise(): void {
    this.exerciseDeleted.emit(this.exercise);
    // this.openSnackBar('Exercise deleted', 'Undo', 3000);
    // this.exercisesService.deleteOneExercise(this.testId, this.exercise.id)
    //   .catch(error => this.openSnackBar(error, 10000));

    const snackBarRef = this.snackBar.open('Exercise deleted', 'Undo', {
      duration: 3000
    });

    snackBarRef.afterDismissed().subscribe(info => {
      if (info.dismissedByAction === true) {
        console.log('NIE USUWAJ');
        console.log(this.exercise);
        // this.exerciseAdded.emit(this.exercise);
        this.exerciseCanceled.emit(this.exercise);
      } else {
        console.log('USUN');
        this.exerciseCanceled.emit(this.exercise);
      }
    });
  }

  public changeCorrectAnswer(index: number, correct: boolean): void {
    const tmp = this.exercise.correctAnswers.findIndex(x => x === index);
    if (correct) {
      this.exercise.correctAnswers.push(index);
    } else {
      this.exercise.correctAnswers.splice(tmp, 1);
    }
  }

  /**
   * HELPERS
   */
  public getLetterFromAscii(i: number): string {
    return String.fromCharCode(65 + i);
  }

  public deleteOneAnswer(i: number): void {
    this.exercise.answers.splice(i, 1);
  }

  public customTrackBy(index: number, obj: any): any {
    return index;
  }

  public checkIfIsCorrect(index: number): boolean {
    return this.exercise.correctAnswers.findIndex(x => x === index) !== -1;
  }

  private checkExerciseThenFix(): void {
    if (this.exercise.question === '') {
      this.exercise.question = 'Empty question...';
    }
    for (let i = 0; i < this.exercise.answers.length; i++) {
      if (this.exercise.answers[0] === '') {
        this.exercise.answers[0] = 'Empty answer A ...';
      }
      if (this.exercise.answers[1] === '') {
        this.exercise.answers[1] = 'Empty answer B ...';
      }
      if (i > 1 && this.exercise.answers[i] === '') {
        this.exercise.answers.splice(i, 1);
        i--;
      }
    }
  }

  private openSnackBar(text: string, action: string, duration: number): void {
    const snackBarRef = this.snackBar.open(text, action, {
      duration: duration
    });

    snackBarRef.afterDismissed().subscribe(info => {
      console.log(info);
      if (info.dismissedByAction === true) {
        console.log('NIE USUWAJ');
      } else {
        console.log('USUN');
      }
    });

    // snackBarRef.afterDismissed().subscribe((res) => {
    //   console.log('The snack-bar was dismissed ' + res);
    // });
    //
    //
    // snackBarRef.onAction().subscribe((res ) => {
    //   console.log('The snack-bar action was triggered! ' + res);
    // });
  }

  public handleSpacebar(ev): void {
    if (ev.keyCode === 32) {
      ev.stopPropagation();
    }
  }

  ngAfterViewChecked(): void {
    this.disabledAnim = false;
  }
}
