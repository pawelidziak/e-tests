import {Component, OnDestroy, OnInit} from '@angular/core';
import {HeaderService} from '../../core/services/header.service';
import {Router} from '@angular/router';
import {TestService} from '../../core/services/test.service';
import {TestModel} from '../../core/models/Test';
import {ALL_ROUTES} from '../../shared/ROUTES';
import {LoaderService} from '../../core/services/loader.service';
import {Subscription} from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-tests-list',
  templateUrl: './tests-list.component.html',
  styleUrls: ['./tests-list.component.scss'],
})
export class TestsListComponent implements OnInit, OnDestroy {
  private subscription$: Subscription;

  public searchText: string;
  public testList: Array<TestModel>;

  constructor(private headerService: HeaderService,
              private router: Router,
              private testService: TestService,
              private loader: LoaderService) {
    this.loader.start();
  }

  ngOnInit() {
    this.getTestsList();
    this.headerService.setCurrentRoute(['home', 'tests']);
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  public navigateToTest(testId: string): void {
    this.router.navigate([`${ALL_ROUTES.CREATED_TEST}/${testId}`]);
  }

  private getTestsList(): void {
    this.subscription$ = this.testService.getTestsByCurrentUser().subscribe(
        res => {
          this.testList = res;
          this.loader.complete();
        },
        error => {
          console.log(error);
          this.loader.complete();
        }
      );
  }

}
