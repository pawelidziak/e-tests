import {Component, OnDestroy, OnInit} from '@angular/core';
import {HeaderService} from '../../core/services/header.service';
import {Router} from '@angular/router';
import {TestService} from '../../core/services/test.service';
import {TestModel} from '../../core/models/Test';
import {ALL_ROUTES} from '../../shared/ROUTES';
import {listSliderTopAnim} from '../../shared/animations';

@Component({
  selector: 'app-tests-list',
  templateUrl: './tests-list.component.html',
  styleUrls: ['./tests-list.component.scss'],
  animations: [listSliderTopAnim()]
})
export class TestsListComponent implements OnInit, OnDestroy {
  private subscriptions: any[] = [];

  public searchText: string;
  public testList: Array<TestModel>;

  constructor(private headerService: HeaderService,
              private router: Router,
              private testService: TestService) {
  }

  ngOnInit() {
    this.headerService.setCurrentRoute(['home', 'tests']);
    this.getTestsList();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  public navigateToTest(testId: string): void {
    this.router.navigate([`${ALL_ROUTES.CREATED_TEST}/${testId}`]);
  }

  private getTestsList(): void {
    this.subscriptions.push(
      this.testService.getTestsByCurrentUser().subscribe(
        res => this.testList = res,
        error => console.log(error)
      )
    );
  }

}
