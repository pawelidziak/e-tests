import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Exercise} from '../../../core/models/Exercise';
import {TestExercisesService} from '../../../core/services/test-exercises.service';

@Component({
  selector: 'app-display-one-exercise',
  templateUrl: './display-one-exercise.component.html',
  styleUrls: ['./display-one-exercise.component.scss']
})
export class DisplayOneExerciseComponent implements OnInit, OnDestroy {
  private subscriptions: any = [];

  @Input() exercise: Exercise;
  @Input() editMode = false;
  @Input() isNew = false;
  @Input() readonly testId: string;
  @Input() readonly expanded: boolean;
  @Input() readonly number: string;
  @Output() addedExercise: EventEmitter<boolean> = new EventEmitter();

  private copyExercise: Exercise;
  public exerciseWasChanged: boolean;

  constructor(private exercisesService: TestExercisesService) {
  }

  ngOnInit() {
    if (this.editMode) {
      this.copyExercise = JSON.parse(JSON.stringify(this.exercise));
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }


  public startEditExercise(): void {
    this.editMode = true;
    this.copyExercise = JSON.parse(JSON.stringify(this.exercise));
  }

  public stopEditExercise(): void {
    this.editMode = false;
    this.exerciseWasChanged = true;
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
    this.exerciseWasChanged = true;
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
      .catch(error => console.log(error));
  }

  private updateExercise(): void {
    if (this.isExerciseChanged()) {
      this.exercisesService.updateOneExercise(this.testId, this.exercise)
        .catch(error => console.log(error));
    }
  }

  public deleteExercise(): void {
    this.exercisesService.deleteOneExercise(this.testId, this.exercise.id)
      .catch(error => console.log(error));
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
  handleSpacebar(ev) {
    if (ev.keyCode === 32) {
      ev.stopPropagation();
    }
  }
}
