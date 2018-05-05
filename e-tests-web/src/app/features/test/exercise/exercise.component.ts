import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Exercise} from '../../../core/models/Exercise';


export interface AnswerClickedDTO {
  isCorrect: boolean;
  exerciseNumber: number;
}

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ExerciseComponent implements OnInit {

  @Input() exercise: Exercise;
  @Output() answerClicked: EventEmitter<AnswerClickedDTO> = new EventEmitter();

  public isAnswerClicked: boolean;
  public answerLetters = [];

  constructor() {
  }

  ngOnInit() {
    this.fillAnswerLetterArray();
  }

  public checkAnswer(answerIndex: number): void {
    const selectedButton = (<HTMLInputElement>document.getElementById('answer-button-' + answerIndex));
    const correctButton = (<HTMLInputElement>document.getElementById('answer-button-' + this.exercise.correctAnswer));

    if (answerIndex === this.exercise.correctAnswer) {
      this.setCorrectStyle(selectedButton);
    } else {
      this.setIncorrectStyle(selectedButton);
      this.setCorrectStyle(correctButton);
    }

    const tmp: AnswerClickedDTO = {
      isCorrect: answerIndex === this.exercise.correctAnswer,
      exerciseNumber: this.exercise.number
    };

    this.answerClicked.emit(tmp);
    this.isAnswerClicked = true;
  }

  private setCorrectStyle(button: any): void {
    button.style.backgroundColor = '#4CAF50';
    button.style.color = '#FAFAFA';
    // button.style.fontWeight = '700';
    // button.style.letterSpacing = '1px';
  }

  private setIncorrectStyle(button: any): void {
    button.style.backgroundColor = '#F44336';
  }

  private fillAnswerLetterArray(): void {
    for (let i = 65; i <= 65 + this.exercise.answers.length; i++) {
      this.answerLetters.push(String.fromCharCode(i));
    }
  }

}
