import {Component, OnInit} from '@angular/core';
import {TestListService} from '../../core/services/test-list.service';
import {HeaderButtonType, HeaderService} from '../../core/services/header.service';
import {Router} from '@angular/router';
import {TestShortInfo} from '../../core/models/TestShortInfo';

@Component({
  selector: 'app-tests-list',
  templateUrl: './tests-list.component.html',
  styleUrls: ['./tests-list.component.scss']
})
export class TestsListComponent implements OnInit {

  public searchText: string;
  private shortTestList: Array<TestShortInfo>;

  constructor(private testListService: TestListService,
              private headerService: HeaderService,
              private router: Router) {
  }

  ngOnInit() {
    this.getTestsList();
  }

  public navigateToTest(test: TestShortInfo): void {
    this.testListService.saveCurrentTest(test);
    this.router.navigateByUrl(`/test-info/${test.testId}`);
  }

  private getTestsList(): void {
    const sub$ = this.testListService.getTestsList().subscribe(
      res => {
        this.shortTestList = res;
        this.headerService.setHeaderButtonAndText(HeaderButtonType.MENU, '');
      },
      error => console.log(error)
    );
  }

}
