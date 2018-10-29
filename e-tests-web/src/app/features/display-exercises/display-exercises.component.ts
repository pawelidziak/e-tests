import {Component, Input, OnInit} from '@angular/core';
import {Exercise} from '../../core/models/Exercise';
import {AuthService} from '../../core/services/auth.service';
import {AppSettingsService} from '../../core/services/app-settings.service';
import {scaleOneZero, slideFromRightToRight} from '../../shared/animations';
import {TestService} from '../../core/services/test.service';

@Component({
  selector: 'app-display-exercises',
  templateUrl: './display-exercises.component.html',
  styleUrls: ['./display-exercises.component.scss'],
  animations: [scaleOneZero(), slideFromRightToRight()]
})
export class DisplayExercisesComponent implements OnInit {

  @Input() readonly origExerciseList: Array<Exercise>;
  @Input() readonly authorId: string;
  @Input() readonly editExercisesMode = false;
  @Input() readonly testId: string;

  public copyExerciseList: Array<Exercise>;
  public searchText: string;
  public expandAllExercises = false;
  public fixedAddButton = false;
  public searchInputFocused = false;
  private exercisesNumber: number;

  constructor(private testService: TestService,
              public auth: AuthService,
              public appSettings: AppSettingsService) {
  }

  ngOnInit() {
    this.copyExerciseList = JSON.parse(JSON.stringify(this.origExerciseList));
    this.exercisesNumber = this.copyExerciseList.length;
  }

  public addExercise(): void {
    setTimeout(() => {
      const element = document.querySelector(`#endExercises`);
      element.scrollIntoView({behavior: 'smooth', block: 'end'});
    }, 1);

    this.copyExerciseList.push({
      question: '',
      answers: ['', ''],
      correctAnswers: [0],
      createDate: new Date().getTime()
    });
  }

  public handleExercisAdded(): void {
    this.exercisesNumber++;
    this.testService.setTestExercisesNumber(this.testId, this.exercisesNumber)
      .catch(error => console.log(error));
  }

  public handleExerciseDeleted(exercise: Exercise): void {
    const index = this.copyExerciseList.findIndex(x => x.id === exercise.id);
    this.copyExerciseList.splice(index, 1);
    this.exercisesNumber--;
    this.testService.setTestExercisesNumber(this.testId, this.exercisesNumber)
      .catch(error => console.log(error));
  }

  public handleExerciseCanceled(exercise: Exercise): void {
    if (!exercise.id) {
      const index = this.copyExerciseList.findIndex(x => x.createDate === exercise.createDate);
      this.copyExerciseList.splice(index, 1);
    }
  }

  /**
   * HELPERS
   */
  public identifier = (index: number, item: Exercise) => item.createDate;
}
