import {Component, OnDestroy, OnInit} from '@angular/core';
import {TestModel} from '../../core/models/Test';
import {AuthService} from '../../core/services/auth.service';
import {TestService} from '../../core/services/test.service';
import {LoaderService} from '../../core/services/loader.service';
import {AppSettingsService} from '../../core/services/app-settings.service';
import {HeaderService} from '../../core/services/header.service';
import {slideFromTop} from '../../shared/animations';
import {ALL_ROUTES} from '../../shared/ROUTES';
import {combineLatest} from 'rxjs';

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
      {label: 'study-sets-title', path: ''}
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
          this.loader.start();
          const subOne$ = this.testService.getStartedTestIdAndSettingsByCurrentUser();
          const subTwo$ = this.testService.getTestsByCurrentUser();

          this.subscriptions.push(
            combineLatest(subOne$.observable, subTwo$.observable).subscribe(
              (res: any) => {
                /*
                        res[0] -> user started tests
                        res[1] -> user created tests
                 */
                if (res[0].length) {
                  // means its test
                  if (subOne$.fromCache) {
                    this.startedTests = res[0];
                  } else {
                    this.startedTests = [];
                    this.assignTests(res[0]);
                  }
                }
                if (res[1].length) {
                  this.userTests = res[1];
                  if (!subTwo$.fromCache) {
                    this.getTestSettings();
                  }
                }

                if (res[0].length > 0) {
                  this.selectedTabIndex = 0;
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
    for (let i = 0; i < this.userTests.length; i++) {
      this.loader.start();
      this.subscriptions.push(
        this.testService.getTestSettings(this.userTests[i].id).subscribe(
          res => {
            this.userTests[i].settings = res;
            if (i === this.userTests.length - 1) {
              this.testService.saveUserTestToCache(this.userTests);
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
    for (let i = 0; i < settings.length; i++) {
      this.loader.start();
      this.subscriptions.push(
        this.testService.getTestById(settings[i].id, false).subscribe(
          res => {
            if (res) {
              const tmpTest = this.createTestWithSettings(res, settings[i]);
              this.pushOrSetToList(tmpTest);
            } else {
              this.testService.deleteOneTestSettings(settings[i].id)
                .catch(error => console.log(error));
            }
            if (i === settings.length - 1) {
              this.testService.saveStartedTestToCache(this.startedTests);
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
