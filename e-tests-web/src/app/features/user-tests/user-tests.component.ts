import {Component, OnDestroy, OnInit} from '@angular/core';
import {TestModel} from '../../core/models/Test';
import {AuthService} from '../../core/services/auth.service';
import {TestService} from '../../core/services/test.service';
import {LoaderService} from '../../core/services/loader.service';
import {AppSettingsService} from "../../core/services/app-settings.service";
import {HeaderService} from "../../core/services/header.service";
import {slideFromTop} from "../../shared/animations";
import {ALL_ROUTES} from "../../shared/ROUTES";
import {combineLatest} from "rxjs";

@Component({
  selector: 'app-user-tests',
  templateUrl: './user-tests.component.html',
  styleUrls: ['./user-tests.component.scss'],
  animations: [slideFromTop()]
})
export class UserTestsComponent implements OnInit, OnDestroy {
  private subscriptions: any[] = [];

  public userTests: TestModel[];
  public startedTests: TestModel[];

  public ALL_ROUTES = ALL_ROUTES;
  public selectedTabIndex: number;

  constructor(private testService: TestService,
              public loader: LoaderService,
              private auth: AuthService,
              private headerService: HeaderService,
              public appSettings: AppSettingsService) {
    this.loader.start();
  }

  ngOnInit() {
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
          const subOne$ = this.testService.getStartedTestIdAndSettingsByCurrentUser();
          const subTwo$ = this.testService.getTestsByCurrentUser();

          this.loader.start();
          this.subscriptions.push(
            combineLatest(subOne$, subTwo$).subscribe(
              res => {
                /*
                        res[0] -> user started tests
                        res[1] -> user created tests
                 */
                if (res[0].length) {
                  this.startedTests = [];
                  this.assignTests(res[0]);
                }
                if (res[1].length) {
                  this.userTests = res[1];
                  this.getTestSettings();
                }

                if (res[0].length > 0) {
                  this.selectedTabIndex = 0
                } else {
                  this.selectedTabIndex = 1;
                }
                this.loader.complete();
              }, error1 => console.log(error1)
            )
          );
        })
    );
  }

  /**
   *    GET TEST SETTINGS
   */
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
   *    ASSIGN TEST TO SETTINGS
   */
  private assignTests(settings: any[]) {
    for (let testIdWithSettings of settings) {
      this.loader.start();
      this.subscriptions.push(
        this.testService.getTestById(testIdWithSettings.id, false).subscribe(
          res => {
            if (res) {
              const tmpTest = this.createTestWithSettings(res, testIdWithSettings);
              this.pushOrSetToList(tmpTest);
            } else {
              this.testService.deleteOneTestSettings(testIdWithSettings.id)
                .catch(error => console.log(error))
            }
            this.loader.complete();
          }, error => console.log(error)
        ));
    }
  }

  private createTestWithSettings(res: TestModel, testIdWithSettings: any): TestModel {
    const tmpTest: TestModel = res;
    tmpTest.id = testIdWithSettings.id;
    tmpTest.settings = {
      config: testIdWithSettings.config,
      progress: testIdWithSettings.progress,
      lastModified: testIdWithSettings.lastModified
    };
    return tmpTest;
  }

  private pushOrSetToList(tmpTest: TestModel) {
    const index = this.startedTests.findIndex(x => x.id === tmpTest.id);
    if (index === -1) {
      this.startedTests.push(tmpTest);
    } else {
      this.startedTests[index] = tmpTest;
    }
  }

}
