import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TestModel} from '../../core/models/Test';
import {HeaderService} from '../../core/services/header.service';
import {TestService} from '../../core/services/test.service';
import {LoaderService} from '../../core/services/loader.service';
import {PagerService} from '../../core/services/pager.service';
import {AuthService} from '../../core/services/auth.service';
import {AppSettingsService} from "../../core/services/app-settings.service";

@Component({
  selector: 'app-test-search',
  templateUrl: './test-search.component.html',
  styleUrls: ['./test-search.component.scss']
})
export class TestSearchComponent implements OnInit, OnDestroy {
  private subscriptions: any[] = [];
  private userLogged: boolean;

  public testList: TestModel[];
  public isTable = false;

  constructor(private headerService: HeaderService,
              private router: Router,
              private pagerService: PagerService,
              private testService: TestService,
              private loader: LoaderService,
              private auth: AuthService,
              public appSettings: AppSettingsService) {
  }

  ngOnInit() {
    this.loader.start();
    this.isLoggedIn();
    this.headerService.setCurrentRoute(['home', 'search']);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private isLoggedIn() {
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
          this.testList.forEach(x => this.testList.push(x));
          this.testList.forEach(x => this.testList.push(x));
          this.getTestAuthor();
          if (this.userLogged) {
            this.getTestSettings();
          } else {
            this.loader.complete();
          }
        },
        error => {
          console.log(error);
        }
      )
    );
  }

  private getTestAuthor() {
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

  private getTestSettings() {
    for (const test of this.testList) {
      this.subscriptions.push(
        this.testService.getTestSettings(test.id).subscribe(
          res => {
            test.settings = res;
            this.loader.complete();
          }, error => console.log(error)
        ));
    }
  }
}
