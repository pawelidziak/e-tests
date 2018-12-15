import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TestModel} from '@core/models';
import {HeaderService, TestService, LoaderService, AuthService, AppSettingsService} from '@core/services';

@Component({
  selector: 'app-test-search',
  templateUrl: './test-search.component.html',
  styleUrls: ['./test-search.component.scss']
})
export class TestSearchComponent implements OnInit, OnDestroy {
  private subscriptions: any[] = [];
  private userLogged: boolean;

  public testList: TestModel[];
  public isTable = true;

  constructor(private headerService: HeaderService,
              private router: Router,
              private testService: TestService,
              private loader: LoaderService,
              private auth: AuthService,
              public appSettings: AppSettingsService) {
    this.loader.start();
  }

  ngOnInit() {
    this.isLoggedIn();
    this.headerService.setCurrentRoute([
      {label: 'search-title', path: ''}
    ]);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private isLoggedIn(): void  {
    this.subscriptions.push(
      this.auth.currentUserObservable.subscribe(
        res => {
          this.userLogged = !!res;
          this.getTestsList();
        })
    );
  }

  private getTestsList(): void {
    this.subscriptions.push(
      this.testService.getTests().subscribe(
        res => {
          this.testList = res;
          this.getTestAuthor();
          if (this.userLogged) {
            this.getTestSettings();
          } else {
            this.loader.complete();
          }
        },
        error => console.log(error)
      )
    );
  }

  private getTestAuthor(): void  {
    for (const test of this.testList) {
      this.subscriptions.push(
        this.testService.getAuthor(test.authorId).subscribe(
          res => {
            test.authorObj = res;
            this.loader.complete();
          }, error => {
            console.log(error);
            this.loader.complete();
          }
        ));
    }
  }

  private getTestSettings(): void  {
    if (this.testList.length) {
      for (const test of this.testList) {
        this.subscriptions.push(
          this.testService.getTestSettings(test.id).subscribe(
            res => {
              test.settings = res;
              this.loader.complete();
            }, error => console.log(error)
          ));
      }
    } else {
      this.loader.complete();
    }
  }
}
