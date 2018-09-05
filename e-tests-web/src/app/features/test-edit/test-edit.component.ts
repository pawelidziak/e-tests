import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TestCreate} from '../../core/models/Test';
import {NewTestService} from '../../core/services/NewTest.service';
import {Exercise} from '../../core/models/Exercise';

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
              private testService: NewTestService) {
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

  private getExercises() {
    this.subscriptions.push(
      this.testService.getTestExercises(this.testId).subscribe(
        res => this.exercises = res,
        error => console.log(error)
      )
    );
  }

  private getTest(): void {
    this.subscriptions.push(
      this.testService.getTestById(this.testId).subscribe(
        res => this.testInfo = res,
        error => console.log(error)
      )
    );
  }

  public saveTestInfo() {

  }

}
