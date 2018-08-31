import {Component, OnInit} from '@angular/core';
import {HeaderService} from '../../core/services/header.service';
import {ActivatedRoute} from '@angular/router';
import {MatBottomSheet} from '@angular/material';
import {TestListService} from '../../core/services/test-list.service';
import {NewTestService} from '../../core/services/NewTest.service';
import {TestCreate} from '../../core/models/Test';
import {TestSettingsBottomSheetComponent} from './test-settings-bottom-sheet/test-settings-bottom-sheet.component';

@Component({
  selector: 'app-test-info',
  templateUrl: './test-info.component.html',
  styleUrls: ['./test-info.component.scss']
})
export class TestInfoComponent implements OnInit {

  public testId: string;

  public test: TestCreate;
  public exercises: any;

  constructor(private route: ActivatedRoute,
              private testService: NewTestService,
              private testListService: TestListService,
              private headerService: HeaderService,
              private bottomSheet: MatBottomSheet) {
    const routeSub$ = this.route.parent.params.subscribe(params => {
      this.testId = params['testId'];
      this.getTest();
      this.getExercises();
    });
  }


  ngOnInit() {
  }

  private getTest() {
    const sub$ = this.testService.getTestById(this.testId).subscribe(
      res => this.test = res,
      error => console.log(error)
    );
  }

  private getExercises() {
    const sub$ = this.testService.getTestExercises(this.testId).subscribe(
      res => this.exercises = res,
      error => console.log(error)
    );
  }

  private setHeader(headerText: string) {
    this.headerService.setHeaderText(headerText);
  }

  openBottomSheet(): void {
    this.bottomSheet.open(TestSettingsBottomSheetComponent);
  }
}

