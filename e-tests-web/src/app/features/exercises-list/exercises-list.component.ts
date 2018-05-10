import {Component, OnInit} from '@angular/core';
import {Exercise} from '../../core/models/Exercise';
import {MatTableDataSource} from '@angular/material';
import {TestListService} from '../../core/services/TestListService';
import {ActivatedRoute} from '@angular/router';
import {HeaderService} from '../../core/services/HeaderService';

@Component({
  selector: 'app-exercises-list',
  templateUrl: './exercises-list.component.html',
  styleUrls: ['./exercises-list.component.scss']
})
export class ExercisesListComponent implements OnInit {

  public dataSource: MatTableDataSource<Exercise>;
  public showAnswers = [];
  public exerciseEditableBooleans = [];
  private testId: string;

  constructor(private route: ActivatedRoute,
              private headerService: HeaderService,
              private testListService: TestListService) {
    const routeSub$ = this.route.params.subscribe(params => {
      this.testId = params['testId'];
      this.getExercises();
    });

  }

  ngOnInit() {
  }

  getExercises(): void {
    this.testListService.getTestExercisesList(this.testId).subscribe(
      res => {
        this.dataSource = new MatTableDataSource<Exercise>(res);
        this.initAuxiliaryTabs();
        this.setHeader('Exercises');
      },
      error => console.log(error)
    );
  }

  /**
   *        ADD / DELETE
   */
  public saveNewExercise(exercise: Exercise, i: number): void {
    this.exerciseEditableBooleans[i] = false;
    // TODO connect to FB
    this.stopEditExercise(i);
  }

  public deleteOneAnswer(answers: Array<string>, i: number): void {
    // TODO connect to FB and delete one answer in exercise
    answers.splice(i, 1);
  }

  public deleteOneExercise(exercise: Exercise): void {
    // TODO connect to FB and delete one exercise
    const index = this.dataSource.filteredData.findIndex(x => x.id === exercise.id);
    this.dataSource.filteredData.splice(index, 1);
    this.showAnswers.splice(index, 1);
    this.exerciseEditableBooleans.splice(index, 1);
  }

  /**
   *        AUXILIARY
   */
  public startEditExercise(i: number) {
    this.exerciseEditableBooleans[i] = true;
    this.showAnswers[i] = true;
  }

  public stopEditExercise(i: number) {
    this.exerciseEditableBooleans[i] = false;
    this.changeEmptyInputs(this.dataSource.filteredData[i]);
  }

  public showNewExercise() {
    const newExercise: Exercise = {
      id: '',
      question: '',
      answers: ['', ''],
      correctAnswer: 0,
      number: this.dataSource.filteredData.length,
      testId: this.dataSource.filteredData[0].testId,
    };

    this.dataSource.filteredData.push(newExercise);
    this.showAnswers.push(true);
    this.exerciseEditableBooleans.push(true);
  }

  public changeAnswersVisibility(i: number) {
    if (!this.exerciseEditableBooleans[i]) {
      this.showAnswers[i] = !this.showAnswers[i];
    }
  }

  public applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public getLetterFromAscii(i: number): string {
    return String.fromCharCode(65 + i);
  }

  public customTrackBy(index: number, obj: any): any {
    return index;
  }

  private setHeader(headerText: string) {
    this.headerService.setHeaderText(headerText);
    this.headerService.setBackButton();
  }

  private initAuxiliaryTabs(): void {
    for (let i = 0; i < this.dataSource.filteredData.length; i++) {
      this.showAnswers.push(false);
      this.exerciseEditableBooleans.push(false);
    }
    this.showAnswers[0] = true;
  }

  private changeEmptyInputs(exercise: Exercise) {
    if (exercise.question.trim().length === 0) {
      exercise.question = '...';
    }
    for (let i = 0; i < exercise.answers.length; i++) {
      if (exercise.answers[i].trim().length === 0) {
        exercise.answers[i] = '...';
      }
    }
  }
}
