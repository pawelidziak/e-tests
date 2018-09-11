import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Exercise} from '../../../core/models/Exercise';
import {TestExercisesService} from '../../../core/services/test-exercises.service';
import {MatSnackBar} from '@angular/material';

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
  @Input() readonly number: string;
  @Output() addedExercise: EventEmitter<boolean> = new EventEmitter();

  private copyExercise: Exercise;

  constructor(private exercisesService: TestExercisesService,
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
    this.checkExerciseThenFix();
    if (this.copyExercise) {
      this.exercise = JSON.parse(JSON.stringify(this.copyExercise));
      delete this.copyExercise;
    } else {
      this.addedExercise.emit(false);
    }
    if (this.isNew) {
      this.addedExercise.emit(false);
    }
  }

  public saveExercise(): void {
    this.editMode = false;
    this.expanded = true;
    this.checkExerciseThenFix();
    if (this.isNew) {
      this.addNewExercise();
    } else {
      this.updateExercise();
    }
  }

  private addNewExercise(): void {
    this.isNew = false;
    this.addedExercise.emit(true);
    this.exercisesService.addOneExercise(this.testId, this.exercise)
      .then(() => this.openSnackBar('Exercise added', 3000))
      .catch(error => this.openSnackBar(error, 10000));
  }

  private updateExercise(): void {
    if (this.isExerciseChanged()) {
      this.exercisesService.updateOneExercise(this.testId, this.exercise)
        .then(() => this.openSnackBar('Exercise updated', 3000))
        .catch(error => this.openSnackBar(error, 10000));
    }
  }

  public deleteExercise(): void {
    this.exercisesService.deleteOneExercise(this.testId, this.exercise.id)
      .then(() => this.openSnackBar('Exercise deleted', 3000))
      .catch(error => this.openSnackBar(error, 10000));
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

  private isExerciseChanged(): boolean {
    return JSON.stringify(this.exercise) !== JSON.stringify(this.copyExercise);
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

  public handleSpacebar(ev) {
    if (ev.keyCode === 32) {
      ev.stopPropagation();
    }
  }
}