import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ExerciseWithOccurrences} from '../../../core/models/Exercise';
import {slideFromRightAnimation, slideFromBottomAnimation,} from '../../../shared/animations';
import {MY_COLORS, ThemeService} from '../../../core/services/theme.service';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss'],
  animations: [slideFromBottomAnimation(), slideFromRightAnimation()]
})
export class ExerciseComponent implements OnInit, OnChanges {

  @Input() exerciseWithOccurrences: ExerciseWithOccurrences;
  @Input() repetitionExerciseNumber: number;
  @Input() checkClicked: boolean;
  @Output() answerClicked: EventEmitter<ExerciseWithOccurrences> = new EventEmitter();

  public MY_COLORS = MY_COLORS;
  public accentColor: string;

  public clickedAnswersIndexes: Array<number> = [];
  public answerLetters = [];
  public isAnswerCorrect: boolean;

  public thingState: string;

  constructor(private themeService: ThemeService) {
    this.thingState = 'moveFromRight';
  }

  ngOnInit() {
    this.accentColor = this.themeService.currentTheme.accent;
    this.fillAnswerLetterArray();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      if (changes.checkClicked && changes.checkClicked.currentValue) {
        this.checkAnswers();
      } else {
        this.fillAnswerLetterArray();
        this.clickedAnswersIndexes = [];
      }
      this.answerClicked.emit(this.exerciseWithOccurrences);
      // if (changes.exerciseWithOccurrences && changes.exerciseWithOccurrences.previousValue) {
      //   this.animateExercise();
      // }
    }
  }

  /**
   *      ANIMATION METHODS
   */
  // public animateExercise(): void {
  //   this.thingState = (this.thingState === 'stay') ? 'moveToLeft' : 'moveFromRight';
  // }

  // public handleDone(event: any): void {
  //   if (this.thingState === 'moveToLeft') {
  //     this.thingState = 'moveFromRight';
  //   }
  //   if ((this.thingState !== 'stay') && (this.thingState === event.toState)) {
  //     this.thingState = 'stay';
  //   }
  // }

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

  private checkAnswers() {
    this.isAnswerCorrect = this.checkCorrectness();
    if (this.isAnswerCorrect) {
      if (this.exerciseWithOccurrences.occurrences > 0) {
        this.decreaseExerciseOccurrences();
      }
    } else {
      this.increaseExerciseOccurrences();
    }
  }

  public checkIfAnswerIsSelected(answerIndex: number) {
    return this.clickedAnswersIndexes.findIndex(x => x === answerIndex) !== -1;
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

  /**
   *      SET STYLES
   */
  private setSelectedStyle(button: any): void {
    button.style.borderBottom = `3px solid ${this.accentColor}`;
  }

  private setDefaultStyle(button: any): void {
    button.style = (<HTMLInputElement>document.getElementById('answer-button-0'));
  }

}
