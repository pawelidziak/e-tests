import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Exercise} from '../../../core/models/Exercise';
import {TestExercisesService} from '../../../core/services/test-exercises.service';
import {MatSnackBar} from '@angular/material';
import {AppSettingsService} from '../../../core/services/app-settings.service';


@Component({
  selector: 'app-display-one-exercise',
  templateUrl: './display-one-exercise.component.html',
  styleUrls: ['./display-one-exercise.component.scss']
})
export class DisplayOneExerciseComponent implements OnInit {

  @Input() exercise: Exercise;
  @Input() editMode = false;
  @Input() isNew = false;
  @Input() expanded: boolean;
  @Input() readonly testId: string;
  @Input() readonly isAuthor: boolean;
  @Input() readonly number: number;
  @Output() exerciseDeleted: EventEmitter<Exercise> = new EventEmitter();
  @Output() exerciseCanceled: EventEmitter<number> = new EventEmitter();

  private copyExercise: Exercise;

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
    this.expanded = false;
    this.copyExercise = JSON.parse(JSON.stringify(this.exercise));
  }

  public stopEditExercise(): void {
    this.editMode = false;
    this.expanded = true;
    if (this.copyExercise) {
      this.exercise = JSON.parse(JSON.stringify(this.copyExercise));
      delete this.copyExercise;
    }
    this.exerciseCanceled.emit(this.number);
  }

  public saveExercise(): void {
    this.editMode = false;
    this.expanded = true;
    this.checkExerciseThenFix();

    if (this.exercise.id) {
      this.exercisesService.updateOneExercise(this.testId, this.exercise)
        .catch(error => this.openSnackBar(error, 10000));
    } else {
      this.exercisesService.addOneExercise(this.testId, this.exercise)
        .then(res => {
          if (res.id) {
            this.exercise.id = res.id;
          }
        })
        .catch(error => this.openSnackBar(error, 10000));
    }
  }

  public deleteExercise(): void {
    this.exerciseDeleted.emit(this.exercise);
    this.openSnackBar('Exercise deleted', 3000);
    this.exercisesService.deleteOneExercise(this.testId, this.exercise.id)
      .catch(error => this.openSnackBar(error, 10000));
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

  private openSnackBar(text: string, duration: number): void {
    this.snackBar.open(text, 'OK', {
      duration: duration
    });
  }

  public handleSpacebar(ev): void {
    if (ev.keyCode === 32) {
      ev.stopPropagation();
    }
  }
}
