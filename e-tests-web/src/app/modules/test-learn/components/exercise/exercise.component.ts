import {Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ExerciseWithOccurrences} from '@core/models';
import {slideFromBottom, slideFromRight} from '@shared/animations';
import {AppSettingsService, MY_COLORS} from '@core/services';

export enum KEY_CODE {
  FIRST_ANSWER_KEY = 49,
  LAST_ANSWER_KEY = 57,
  FIRST_ANSWER_NUMERIC_KEY = 97,
  LAST_ANSWER_NUMERIC_KEY = 105,
  SPACE_BAR_KEY = 32,
  ENTER_KEY = 13
}

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss'],
  animations: [slideFromBottom(), slideFromRight()]
})
export class ExerciseComponent implements OnInit, OnChanges {
  private RANDOM_CORRECT_FEEDBACK = [
    'nice',
    'keep-it-up',
    'good',
    'you-are-getting-better'
  ];
  private RANDOM_INCORRECT_FEEDBACK = [
    'wrong',
    'keep-trying',
    'repeat-this',
    'learn-it'
  ];
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
  public feedbackMsg: string;

  constructor(private themeService: AppSettingsService) {
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

  public checkAnswers(): void {
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
    this.feedbackMsg = this.drawFeedBackMessage();
    this.checkClicked.emit();

    if (this.isAnswerCorrect) {
      setTimeout(() => this.showNextExercise(), 1000);
    }
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
    // window.scrollTo(0, 0);
    const element = document.getElementById('learnSection');
    element.scrollIntoView();
  }

  private drawFeedBackMessage(): string {
    if (this.isAnswerCorrect) {
      return this.RANDOM_CORRECT_FEEDBACK[Math.floor(Math.random() * this.RANDOM_CORRECT_FEEDBACK.length)];
    } else {
      return this.RANDOM_INCORRECT_FEEDBACK[Math.floor(Math.random() * this.RANDOM_INCORRECT_FEEDBACK.length)];
    }
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

  @HostListener('window:keydown', ['$event'])
  preventSpacebarScroll(event: KeyboardEvent): void {
    if (event.keyCode === KEY_CODE.SPACE_BAR_KEY) {
      event.preventDefault();
    }

  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent): void {
    this.handleKeyboardShortcuts(event.keyCode);
  }

  private handleKeyboardShortcuts(keyCode: number): void {
    if (this.userIsAuthenticated) {
      if (!this.isCheckClicked) {
        // 1, 2, ... 9
        if (keyCode >= KEY_CODE.FIRST_ANSWER_KEY && keyCode <= KEY_CODE.LAST_ANSWER_KEY &&
          keyCode - KEY_CODE.FIRST_ANSWER_KEY < this.exerciseWithOccurrences.exercise.answers.length) {
          this.addAnswer(keyCode - KEY_CODE.FIRST_ANSWER_KEY);
        }
        // 1, 2, ... 9 ON NUMERIC PAD
        if (keyCode >= KEY_CODE.FIRST_ANSWER_NUMERIC_KEY && keyCode <= KEY_CODE.LAST_ANSWER_NUMERIC_KEY &&
          keyCode - KEY_CODE.FIRST_ANSWER_NUMERIC_KEY < this.exerciseWithOccurrences.exercise.answers.length) {
          this.addAnswer(keyCode - KEY_CODE.FIRST_ANSWER_NUMERIC_KEY);
        }
      }

      if (keyCode === KEY_CODE.SPACE_BAR_KEY || keyCode === KEY_CODE.ENTER_KEY) {
        if (this.isCheckClicked) {
          this.showNextExercise();
        } else {
          this.checkAnswers();
        }
      }
    }
  }
}
