import {Component, OnInit} from '@angular/core';
import {HeaderButtonType, HeaderService} from '../../core/services/header.service';
import {TestService} from '../../core/services/test.service';
import {ActivatedRoute} from '@angular/router';
import {MatTableDataSource} from '@angular/material';
import {Exercise} from '../../core/models/Exercise';
import {TestListService} from '../../core/services/test-list.service';
import {TestShortInfo} from '../../core/models/TestShortInfo';

@Component({
  selector: 'app-test-info',
  templateUrl: './test-info.component.html',
  styleUrls: ['./test-info.component.scss']
})
export class TestInfoComponent implements OnInit {

  public testId: string;
  public dataSource: MatTableDataSource<Exercise>;
  private currentTestShortInfo: TestShortInfo;

  constructor(private route: ActivatedRoute,
              private testService: TestService,
              private testListService: TestListService,
              private headerService: HeaderService) {
    const routeSub$ = this.route.parent.params.subscribe(params => {
      this.testId = params['testId'];
    });
  }


  ngOnInit() {
    this.getTest();
  }

  private getTest() {

    // first check if the test-learn was set (it was, then te page wasn't refresh)
    this.currentTestShortInfo = this.testListService.getCurrentTest();

    if (this.currentTestShortInfo) {
      this.setHeader(this.currentTestShortInfo.testName);
      this.getExercises();
    } else {
      const sub$ = this.testListService.getOneTest(this.testId).subscribe(
        res => {
          this.currentTestShortInfo = res;
          this.setHeader(res.testName);
          this.getExercises();
        },
        error => console.log(error)
      );
    }
  }

  private getExercises() {
    const sub$ = this.testListService.getTestExercisesList(this.currentTestShortInfo.testId).subscribe(
      res => {
        this.dataSource = new MatTableDataSource<Exercise>(res);
      },
      error => console.log(error)
    );
  }

  private setHeader(headerText: string) {
    this.headerService.setHeaderButtonAndText(HeaderButtonType.BACK, headerText);
  }

}
