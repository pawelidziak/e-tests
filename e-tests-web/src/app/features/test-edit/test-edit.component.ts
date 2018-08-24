import {Component, OnInit} from '@angular/core';
import {Exercise} from '../../core/models/Exercise';
import {MatTableDataSource} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {HeaderButtonType, HeaderService} from '../../core/services/header.service';
import {Test} from '../../core/models/Test';
import {TestService} from '../../core/services/test.service';

@Component({
  selector: 'app-test-edit',
  templateUrl: './test-edit.component.html',
  styleUrls: ['./test-edit.component.scss']
})
export class TestEditComponent implements OnInit {

  private testId: string;
  public dataSource: MatTableDataSource<Exercise>;
  // TODO change to NEWTest
  public testInfo: Test;
  public testExercises: Array<Exercise>;
  constructor(private route: ActivatedRoute,
              private headerService: HeaderService,
              private testService: TestService) {
    const routeSub$ = this.route.params.subscribe(params => {
      this.testId = params['testId'];
      this.getExercises();
    });
  }

  ngOnInit() {
  }

  private getExercises(): void {
    const sub$ = this.testService.getTest(this.testId).subscribe(
      res => {
        this.testInfo = res;
        this.testExercises = res.exercises;
        // TODO change label to testName
        this.setHeader('Exercises');
      },
      error => console.log(error)
    );
  }

  private setHeader(headerText: string) {
    this.headerService.setHeaderButtonAndText(HeaderButtonType.BACK, headerText);
  }

}
