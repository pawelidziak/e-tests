import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Test, TestCreate} from '../../core/models/Test';
import {NewTestService} from '../../core/services/NewTest.service';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-test-edit',
  templateUrl: './test-edit.component.html',
  styleUrls: ['./test-edit.component.scss']
})
export class TestEditComponent implements OnInit, OnDestroy {
  private subscriptions: any = [];

  private testId: string;
  // TODO change to NEWTest
  public testInfo: TestCreate;
  public testNameControl: FormControl;

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

  }

  private getTest(): void {
    this.subscriptions.push(
      this.testService.getTestById(this.testId).subscribe(
        res => {
          this.testInfo = res;

          this.testNameControl  = new FormControl(this.testInfo.name, Validators.required);
        },
        error => console.log(error)
      )
    );
  }


}
