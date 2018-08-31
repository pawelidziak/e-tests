import {Component, OnInit} from '@angular/core';
import {HeaderService} from '../../core/services/header.service';
import {Router} from '@angular/router';
import {NewTestService} from '../../core/services/NewTest.service';
import {TestCreate} from '../../core/models/Test';
import {ALL_ROUTES} from '../../app.routing';

@Component({
  selector: 'app-tests-list',
  templateUrl: './tests-list.component.html',
  styleUrls: ['./tests-list.component.scss']
})
export class TestsListComponent implements OnInit {

  public searchText: string;

  public testList: Array<TestCreate>;

  constructor(private headerService: HeaderService,
              private router: Router,
              private testService: NewTestService) {
  }

  ngOnInit() {
    this.getTestsList();
  }

  public navigateToTest(testId: string): void {
   this.router.navigate([`${ALL_ROUTES.CREATED_TEST}/${testId}`]);
  }

  private getTestsList(): void {
    this.testService.getTestByCurrentUser().subscribe(
      res => this.testList = res,
      error => console.log(error)
    );
  }

}
