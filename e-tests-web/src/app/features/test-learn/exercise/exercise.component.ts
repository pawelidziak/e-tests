import {Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ExerciseWithOccurrences} from '../../../core/models/Exercise';
import {slideFromRightAnimation, slideFromBottomAnimation} from '../../../shared/animations';
import {MY_COLORS, ThemeService} from '../../../core/services/theme.service';

export enum KEY_CODE {
  FIRST_ANSWER_KEY = 48,
  LAST_ANSWER_KEY = 56,
  SPACE_BAR_KEY = 32,
  ENTER_KEY = 13
}

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss'],
  animations: [slideFromBottomAnimation(), slideFromRightAnimation()]
})
export class ExerciseComponent implements OnInit, OnChanges {

  @Input() exerciseWithOccurrences: ExerciseWithOccurrences;
  @Input() repetitionExerciseNumber: number;
  @Input() userIsAuthenticated: boolean;
  @Output() checkClicked: EventEmitter<void> = new EventEmitter();
  @Output() nextClicked: EventEmitter<void> = new EventEmitter();

  public MY_COLORS = MY_COLORS;
  public accentColor: string;

  public clickedAnswersIndexes: Array<number> = [];
  public answerLetters = [];
  public isAnswerCorrect: boolean;
  public isCheckClicked: boolean;

  constructor(private themeService: ThemeService) {
  }

  ngOnInit() {
    this.accentColor = this.themeService.currentTheme.accent;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.clickedAnswersIndexes = [];
    this.fillAnswerLetterArray();
  }

  /**
   *      LOGIC
   */
  public addAnswer(answerIndex: number): void {
    const indexInArray = this.clickedAnswersIndexes.findIndex(x => x === answerIndex);
    const selectedButton = (<HTMLInputElement>document.getElementById('answer-button-' + answerIndex));

    if (indexInArray === -1) {
      this.clickedAnswersIndexes.push(answerIndex);
      this.setSelectedStyle(selectedButton);
    } else {
      this.clickedAnswersIndexes.splice(indexInArray, 1);
      this.setDefaultStyle(selectedButton);
    }
  }

  public checkAnswers() : void{
    this.isCheckClicked = true;
    this.isAnswerCorrect = this.checkCorrectness();
    if (this.isAnswerCorrect) {
      if (this.exerciseWithOccurrences.occurrences > 0) {
        this.decreaseExerciseOccurrences();
      }
    } else {
      this.increaseExerciseOccurrences();
    }
    this.scrollTop();
    this.checkClicked.emit();
  }

  public showNextExercise(): void {
    this.isCheckClicked = false;
    this.nextClicked.emit();
    this.scrollTop();
  }

  /**
   *      AUXILIARY METHODS
   */
  private checkCorrectness(): boolean {
    if (this.clickedAnswersIndexes.length !== this.exerciseWithOccurrences.exercise.correctAnswers.length) {
      return false;
    }
    for (const answer of this.clickedAnswersIndexes) {
      const index = this.exerciseWithOccurrences.exercise.correctAnswers.findIndex(x => x === answer);
      if (index === -1) {
        return false;
      }
    }
    return true;
  }

  private increaseExerciseOccurrences(): void {
    this.exerciseWithOccurrences.occurrences += this.repetitionExerciseNumber;
  }

  private decreaseExerciseOccurrences(): void {
    this.exerciseWithOccurrences.occurrences -= 1;
  }

  private fillAnswerLetterArray(): void {
    this.answerLetters = [];
    for (let i = 65; i <= 65 + this.exerciseWithOccurrences.exercise.answers.length; i++) {
      this.answerLetters.push(String.fromCharCode(i));
    }
  }

  public checkIfAnswerIsSelected(answerIndex: number): boolean {
    return this.clickedAnswersIndexes.findIndex(x => x === answerIndex) !== -1;
  }

  public scrollTop(): void {
    const element = document.querySelector('#testLearnSection') || document.querySelector('#testEditSection');
    element.scrollIntoView({behavior: 'instant', block: 'start'});
  }

  /**
   *      SET STYLES
   */
  private setSelectedStyle(button: any): void {
    button.style.borderBottom = `3px solid ${this.accentColor}`;
  }

  private setDefaultStyle(button: any): void {
    button.style = (<HTMLInputElement>document.getElementById('answer-button-0'));
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent): void {
    if (this.userIsAuthenticated) {
      if (!this.isCheckClicked && event.keyCode >= KEY_CODE.FIRST_ANSWER_KEY &&
        event.keyCode <= KEY_CODE.LAST_ANSWER_KEY &&
        event.keyCode - 49 <= this.exerciseWithOccurrences.exercise.answers.length - 1) {
        this.addAnswer(event.keyCode - 49);
      }

      if (event.keyCode === KEY_CODE.SPACE_BAR_KEY || event.keyCode === KEY_CODE.ENTER_KEY) {
        if (this.isCheckClicked) {
          this.showNextExercise();
        } else {
          this.checkAnswers();
        }
      }
    }
  }

}
