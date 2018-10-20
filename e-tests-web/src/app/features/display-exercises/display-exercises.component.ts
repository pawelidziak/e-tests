import {Component, Input, OnInit} from '@angular/core';
import {Exercise} from '../../core/models/Exercise';
import {AuthService} from '../../core/services/auth.service';
import {AppSettingsService} from '../../core/services/app-settings.service';
import {scaleOneZero, slideFromRightToRight} from '../../shared/animations';

@Component({
  selector: 'app-display-exercises',
  templateUrl: './display-exercises.component.html',
  styleUrls: ['./display-exercises.component.scss'],
  animations: [scaleOneZero(), slideFromRightToRight()]
})
export class DisplayExercisesComponent implements OnInit {

  @Input() exerciseList: Array<Exercise>;
  @Input() readonly authorId: string;
  @Input() readonly editExercisesMode = false;
  @Input() readonly testId: string;

  public searchText: string;
  public expandAllExercises = false;
  public fixedAddButton = false;
  public searchInputFocused = false;

  private origExerciseSize: number;

  constructor(public auth: AuthService,
              public appSettings: AppSettingsService) {
  }

  ngOnInit() {
    this.origExerciseSize = this.exerciseList.length;
  }

  public addExercise(): void {
    setTimeout(() => {
      const element = document.querySelector(`#endExercises`);
      element.scrollIntoView({behavior: 'smooth', block: 'end'});
    }, 1);

    this.exerciseList.push({
      question: '',
      answers: ['', ''],
      correctAnswers: [0],
      createDate: new Date().getTime()
    });
  }

  public handleExerciseDeleted(exercise: Exercise): void {
    const index = this.exerciseList.findIndex(x => x.id === exercise.id);
    this.exerciseList.splice(index, 1);
    this.origExerciseSize--;
  }

  public handleExerciseCanceled(exerciseNumber: number): void {
    if (exerciseNumber > this.origExerciseSize) {
      this.exerciseList.splice(exerciseNumber - 1, 1);
    }

    window.scrollTo({
      'behavior': 'smooth'
    });
    window.scrollBy({
      'behavior': 'smooth'
    });
  }

  /**
   * HELPERS
   */
  public identifier = (index: number, item: Exercise) => item.createDate;

}
