import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Exercise} from '../../core/models/Exercise';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss']
})
export class ExerciseComponent implements OnInit {

  @Input() exercise: Exercise;
  @Output() change: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() answerClicked: EventEmitter<any> = new EventEmitter<any>();

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

    this.answerClicked.emit({exercise: this.exercise, answerIndex: answerIndex});
    this.isAnswerClicked = true;
    this.change.emit(true);
  }

  private setCorrectStyle(button: any): void {
    button.style.backgroundColor = '#4CAF50';
    button.style.color = '#FAFAFA';
    // button.style.fontWeight = '700';
    button.style.letterSpacing = '1px';
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
