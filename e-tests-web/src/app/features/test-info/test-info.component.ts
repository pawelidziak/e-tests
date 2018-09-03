import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatBottomSheet} from '@angular/material';
import {NewTestService} from '../../core/services/NewTest.service';
import {TestCreate} from '../../core/models/Test';
import {TestSettingsBottomSheetComponent} from './test-settings-bottom-sheet/test-settings-bottom-sheet.component';
import {Exercise} from '../../core/models/Exercise';

@Component({
  selector: 'app-test-info',
  templateUrl: './test-info.component.html',
  styleUrls: ['./test-info.component.scss']
})
export class TestInfoComponent implements OnInit, OnDestroy {
  private subscriptions: any = [];

  public testId: string;
  public test: TestCreate;
  public exercises: Exercise[];

  constructor(private route: ActivatedRoute,
              private testService: NewTestService,
              private bottomSheet: MatBottomSheet) {

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

  private getTest() {
    this.subscriptions.push(
      this.testService.getTestById(this.testId).subscribe(
        res => this.test = res,
        error => console.log(error)
      )
    );
  }

  private getExercises() {
    this.subscriptions.push(
      this.testService.getTestExercises(this.testId).subscribe(
        res => this.exercises = res,
        error => console.log(error)
      )
    );
  }

  public openBottomSheet(): void {
    this.bottomSheet.open(TestSettingsBottomSheetComponent);
  }
}

