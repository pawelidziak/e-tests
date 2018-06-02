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

  public testId: string;
  public dataSource: MatTableDataSource<Exercise>;
  public test: Test;
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
        this.test = res;
        // TODO change text to testName
        this.setHeader('Exercises');
      },
      error => console.log(error)
    );
  }

  private setHeader(headerText: string) {
    this.headerService.setHeaderButtonAndText(HeaderButtonType.BACK, headerText);
  }

}
