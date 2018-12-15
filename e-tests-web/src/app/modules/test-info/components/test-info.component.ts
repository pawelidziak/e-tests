import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatBottomSheet, MatSnackBar} from '@angular/material';
import {TestService, AuthService, HeaderService, AppSettingsService, LoaderService} from '@core/services';
import {TestModel, Exercise} from '@core/models';
import {TestSettingsBottomSheetComponent} from './test-settings-bottom-sheet/test-settings-bottom-sheet.component';
import {ROUTE_PARAMS, ALL_ROUTES} from '@shared/routes';
import {environment} from '@env/environment';

@Component({
  selector: 'app-test-info',
  templateUrl: './test-info.component.html',
  styleUrls: ['./test-info.component.scss']
})
export class TestInfoComponent implements OnInit, OnDestroy {
  private subscriptions: any[] = [];

  public testId: string;
  public test: TestModel;
  public exercises: Exercise[];

  public editTestMode: boolean;
  private copyTest: TestModel;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private testService: TestService,
              private bottomSheet: MatBottomSheet,
              private headerService: HeaderService,
              private loader: LoaderService,
              private snackBar: MatSnackBar,
              public appSettings: AppSettingsService,
              public auth: AuthService) {
    this.loader.start();
    this.subscriptions.push(
      this.route.parent.params.subscribe(params => {
        this.testId = params[ROUTE_PARAMS.TEST_ID];
        this.getTest();
      })
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private getTest(): void {
    this.subscriptions.push(
      this.testService.getTestById(this.testId).subscribe(
        res => {
          if (res) {
            this.test = res;
            this.test.id = this.testId;
            this.exercises = this.test.exercises;
            if (!this.test.authorObj) {
              this.getAuthor();
            }
            this.headerService.setCurrentRoute([
              {label: 'tests-title', path: ALL_ROUTES.SEARCH},
              {label: this.test.name, path: ``},
            ]);
            this.loader.complete();
          } else {
            this.loader.complete();
          }
        },
        error => console.log(error)
      )
    );
  }

  private getAuthor(): void {
    this.subscriptions.push(
      this.testService.getAuthor(this.test.authorId).subscribe(
        res => {
          this.test.authorObj = res;
          this.loader.complete();
        }, () => this.loader.complete()
      ));

  }

  public startEditMode(): void {
    this.editTestMode = true;
    this.copyTest = JSON.parse(JSON.stringify(this.test));
  }

  public stopEditMode(save: boolean): void {
    this.editTestMode = false;
    if (!save && this.copyTest) {
      this.test = JSON.parse(JSON.stringify(this.copyTest));
    }
    delete this.copyTest;

    if (save) {
      this.saveTest();
    }
  }

  private saveTest(): void {
    this.testService.updateTest(this.testId, this.test)
      .catch(error => console.log(error));
  }

  /**
   *    HELPERS
   */
  public testIncorrect(): boolean {
    return !(this.test.name && this.test.tags.length);
  }

  public openMoreBottomSheet(): void {
    this.bottomSheet.open(TestSettingsBottomSheetComponent, {
      data: {test: this.test, testExercises: this.exercises}
    });
  }

  public navigateToLearn(): void {
    this.router.navigate([`${ALL_ROUTES.CREATED_TEST}/${this.testId}/${ALL_ROUTES.TEST_LEARN}`]);
  }

  public openShareSnackbar(): void {
    this.copyTestUrlToClipboard(`${environment.appUrl}${ALL_ROUTES.CREATED_TEST}/${this.testId}`);
    this.snackBar.open(this.appSettings.translateText('test-info-share-text'), 'OK', {
      duration: 5000,
    });
  }

  private copyTestUrlToClipboard(val: string): void {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}

