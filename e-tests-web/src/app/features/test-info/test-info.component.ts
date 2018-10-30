import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatBottomSheet} from '@angular/material';
import {TestService} from '../../core/services/test.service';
import {TestModel} from '../../core/models/Test';
import {TestSettingsBottomSheetComponent} from './test-settings-bottom-sheet/test-settings-bottom-sheet.component';
import {Exercise} from '../../core/models/Exercise';
import {TestExercisesService} from '../../core/services/test-exercises.service';
import {AuthService} from '../../core/services/auth.service';
import {ALL_ROUTES, ROUTE_PARAMS} from '../../shared/ROUTES';
import {HeaderService} from '../../core/services/header.service';
import {AppSettingsService} from '../../core/services/app-settings.service';
import {LoaderService} from '../../core/services/loader.service';
import {slideFromTop} from '../../shared/animations';

@Component({
  selector: 'app-test-info',
  templateUrl: './test-info.component.html',
  styleUrls: ['./test-info.component.scss'],
  animations: [slideFromTop()]
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
              private exercisesService: TestExercisesService,
              private bottomSheet: MatBottomSheet,
              private headerService: HeaderService,
              private loader: LoaderService,
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

  private getTest() {
    this.subscriptions.push(
      this.testService.getTestById(this.testId).subscribe(
        res => {
          this.test = res;
          this.headerService.setCurrentRoute(['home', 'tests']);
          this.getExercises();
        },
        error => console.log(error)
      )
    );
  }

  private getExercises() {
    this.subscriptions.push(
      this.exercisesService.getTestExercises(this.testId).subscribe(
        res => {
          this.exercises = res;
          this.loader.complete();
        },
        error => {
          console.log(error);
          this.loader.complete();
        }
      )
    );
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
      .then(() => console.log('zapisano'))
      .catch(error => console.log(error));
  }

  /**
   *    HELPERS
   */
  public testIncorrect(): boolean {
    return !(this.test.name && this.test.tags.length);
  }

  public openMoreBottomSheet(): void {
    this.bottomSheet.open(TestSettingsBottomSheetComponent);
  }

  public navigateToLearn(): void {
    this.router.navigate([`${ALL_ROUTES.CREATED_TEST}/${this.testId}/${ALL_ROUTES.TEST_LEARN}`]);
  }
}

