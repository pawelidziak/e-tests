import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ExerciseWithOccurrences} from '../../../core/models/Exercise';
import {sliderAnimation} from '../../../shared/animations';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss'],
  animations: [sliderAnimation()]
})
export class ExerciseComponent implements OnInit, OnChanges {

  @Input() exerciseWithOccurrences: ExerciseWithOccurrences;
  @Input() repetitionExerciseNumber: number;
  @Output() answerClicked: EventEmitter<ExerciseWithOccurrences> = new EventEmitter();

  public isAnswerClicked: boolean;
  public answerLetters = [];
  public thingState: string;

  private defaultButtonStyle: any;

  constructor() {
    this.thingState = 'moveFromRight';
  }

  ngOnInit() {
    this.fillAnswerLetterArray();
    this.defaultButtonStyle = (<HTMLInputElement>document.getElementById('answer-button-0'));
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.resetViewStyle();
    if (changes.exerciseWithOccurrences.previousValue) {
      this.animateThing();
    }
  }

  /**
   *      ANIMATION METHODS
   */
  public animateThing(): void {
    this.thingState = (this.thingState === 'stay') ? 'moveToLeft' : 'moveFromRight';
  }

  public handleDone(event: any): void {
    if (this.thingState === 'moveToLeft') {
      this.thingState = 'moveFromRight';
    }
    if ((this.thingState !== 'stay') && (this.thingState === event.toState)) {
      this.thingState = 'stay';
    }
  }

  /**
   *      LOGIC
   */

  public checkAnswer(answerIndex: number): void {
    const selectedButton = (<HTMLInputElement>document.getElementById('answer-button-' + answerIndex));
    const correctButton = (<HTMLInputElement>document.getElementById('answer-button-' + this.exerciseWithOccurrences.exercise.correctAnswer));

    if (this.isAnswerCorrect(answerIndex)) {
      this.setCorrectStyle(selectedButton);
      if (this.exerciseWithOccurrences.occurrences > 0) {
        this.decreaseExerciseOccurrences();
      }
    } else {
      this.setIncorrectStyle(selectedButton);
      this.setCorrectStyle(correctButton);
      this.increaseExerciseOccurrences();
    }
    this.answerClicked.emit(this.exerciseWithOccurrences);
    this.isAnswerClicked = true;
  }

  private resetViewStyle() {
    for (let i = 0; i < this.exerciseWithOccurrences.exercise.answers.length; i++) {
      const button = (<HTMLInputElement>document.getElementById('answer-button-' + i));
      if (button) {
        this.setDefaultStyle(button);
      }
    }
    this.isAnswerClicked = false;
  }

  /**
   *      AUXILIARY METHODS
   */

  private isAnswerCorrect(answerIndex: number): boolean {
    return answerIndex === this.exerciseWithOccurrences.exercise.correctAnswer;
  }

  private increaseExerciseOccurrences(): void {
    this.exerciseWithOccurrences.occurrences += this.repetitionExerciseNumber;
  }

  private decreaseExerciseOccurrences(): void {
    this.exerciseWithOccurrences.occurrences -= 1;
  }

  private fillAnswerLetterArray(): void {
    for (let i = 65; i <= 65 + this.exerciseWithOccurrences.exercise.answers.length; i++) {
      this.answerLetters.push(String.fromCharCode(i));
    }
  }

  /**
   *      SET STYLES
   */
  private setCorrectStyle(button: any): void {
    button.style.backgroundColor = '#4CAF50';
    button.style.color = '#FAFAFA';
  }

  private setIncorrectStyle(button: any): void {
    button.style.backgroundColor = '#F44336';
  }

  private setDefaultStyle(button: any): void {
    button.style = this.defaultButtonStyle;
  }
}
