import {Component, OnDestroy, OnInit} from '@angular/core';
import {TestModel} from '../../core/models/Test';
import {AuthService} from '../../core/services/auth.service';
import {TestService} from '../../core/services/test.service';
import {LoaderService} from '../../core/services/loader.service';
import {AppSettingsService} from "../../core/services/app-settings.service";
import {HeaderService} from "../../core/services/header.service";
import {slideFromTop} from "../../shared/animations";
import {ALL_ROUTES} from "../../shared/ROUTES";

enum DISPLAY_VALUE {
  BY_SAVED = 'BY_SAVED',
  BY_USER = 'BY_USER',
}

interface ChooseTestDisplay {
  label: string;
  value: DISPLAY_VALUE;
}

@Component({
  selector: 'app-user-tests',
  templateUrl: './user-tests.component.html',
  styleUrls: ['./user-tests.component.scss'],
  animations: [slideFromTop()]
})
export class UserTestsComponent implements OnInit, OnDestroy {
  private subscriptions: any[] = [];

  private userTests: TestModel[];
  private startedTests: TestModel[];
  public currentlySelectedTests: TestModel[];

  public ALL_ROUTES = ALL_ROUTES;

  public selectOptions: ChooseTestDisplay[] = [
    {label: 'Recently started', value: DISPLAY_VALUE.BY_SAVED},
    {label: 'Yours', value: DISPLAY_VALUE.BY_USER}
  ];
  public selected: ChooseTestDisplay = this.selectOptions[0];

  constructor(private testService: TestService,
              private loader: LoaderService,
              private auth: AuthService,
              private headerService: HeaderService,
              public appSettings: AppSettingsService) {
  }

  ngOnInit() {
    this.loader.start();
    this.headerService.setCurrentRoute([
      {label: 'Study sets', path: ''}
    ]);
    this.isLoggedIn();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private isLoggedIn() {
    this.subscriptions.push(
      this.auth.currentUserObservable.subscribe(
        () => {
          this.getUserTestsWithSettings();
          this.getStartedTest();
        })
    );
  }

  /**
   *    GET TEST CREATED BY USERS (WITH SETTINGS)
   */
  private getUserTestsWithSettings(): void {
    this.subscriptions.push(
      this.testService.getTestsByCurrentUser().subscribe(
        res => {
          this.userTests = res;
          this.getTestSettings();
        },
        error => console.log(error)
      )
    );
  }

  private getTestSettings() {
    for (let test of this.userTests) {
      this.loader.start();
      this.subscriptions.push(
        this.testService.getTestSettings(test.id).subscribe(
          res => {
            if (res) {
              test.settings = res;
            }
            this.loader.complete();
          }, error => console.log(error)
        ));
    }
  }

  /**
   *    GET TEST STARTED BY USERS (WITH SETTINGS)
   */
  private getStartedTest(): void {
    this.subscriptions.push(
      this.testService.getStartedTestIdAndSettingsByCurrentUser().subscribe(
        res => {
          this.startedTests = [];
          this.currentlySelectedTests = this.startedTests;
          this.assignTests(res);
        }, error => console.log(error)
      ));
  }

  private assignTests(res: any[]) {
    for (let testIdWithSettings of res) {
      this.loader.start();
      this.subscriptions.push(
        this.testService.getTestById(testIdWithSettings.id).subscribe(
          res => {
            const tmpTest: TestModel = res;
            tmpTest.id = testIdWithSettings.id;
            tmpTest.settings = {
              config: testIdWithSettings.config,
              progress: testIdWithSettings.progress,
              lastModified: testIdWithSettings.lastModified
            };

            const index = this.startedTests.findIndex(x => x.id === tmpTest.id);
            if (index === -1) {
              this.startedTests.push(tmpTest);
            } else {
              this.startedTests[index] = tmpTest;
            }
            this.loader.complete();
          }, error => console.log(error)
        ));
    }
  }

  public changeTests(): void {
    switch (this.selected.value) {
      case DISPLAY_VALUE.BY_SAVED:
        this.currentlySelectedTests = this.startedTests;
        break;
      case DISPLAY_VALUE.BY_USER:
        this.currentlySelectedTests = this.userTests;
        break;
      default:
        this.currentlySelectedTests = this.userTests;
    }
  }
}
