import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
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
    if (!this.areTwoExercisesEqual(this.exercise, this.copyExercise)) {
      this.exercisesService.updateOneExercise(this.testId, this.exercise)
        .catch(error => console.log(error));
    }
  }

  public deleteExercise(): void {
    this.exercisesService.deleteOneExercise(this.testId, this.exercise.id)
      .catch(error => console.log(error));
  }

  private areTwoExercisesEqual(e1: Exercise, e2: Exercise): boolean {
    if (e1.question !== e2.question || e1.answers.length !== e2.answers.length) {
      return false;
    } else if (e1.answers.length === e2.answers.length) {
      for (let i = 0; i < e1.answers.length; i++) {
        if (e1.answers[i] !== e2.answers[i]) {
          return false;
        }
      }
    }
    return true;
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
}
