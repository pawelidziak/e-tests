import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TestCreate} from '../../core/models/Test';
import {NewTestService} from '../../core/services/NewTest.service';
import {Exercise} from '../../core/models/Exercise';
import {TestExercisesService} from '../../core/services/test-exercises.service';

@Component({
  selector: 'app-test-edit',
  templateUrl: './test-edit.component.html',
  styleUrls: ['./test-edit.component.scss']
})
export class TestEditComponent implements OnInit, OnDestroy {
  private subscriptions: any = [];

  public testId: string;
  public testInfo: TestCreate;
  public exercises: Exercise[];

  constructor(private route: ActivatedRoute,
              private testService: NewTestService,
              private exercisesService: TestExercisesService) {
    this.subscriptions.push(
      this.route.parent.params.subscribe(params => {
        this.testId = params['testId'];
        this.getTest();
        this.getExercises();
      })
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private getTest(): void {
    this.subscriptions.push(
      this.testService.getTestById(this.testId).subscribe(
        res => this.testInfo = res,
        error => console.log(error)
      )
    );
  }

  private getExercises() {
    this.subscriptions.push(
      this.exercisesService.getTestExercises(this.testId).subscribe(
        res => this.exercises = res,
        error => console.log(error)
      )
    );
  }

  public saveTestInfo() {
    if (this.checkCreateTestCondition()) {
      // TODO update test
      console.log('save');
    }
  }

  private checkCreateTestCondition(): boolean {
    return !(this.testInfo.name.length === 0 || this.testInfo.tags.length === 0);
  }
}
