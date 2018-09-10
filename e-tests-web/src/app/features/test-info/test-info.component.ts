import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatBottomSheet} from '@angular/material';
import {NewTestService} from '../../core/services/NewTest.service';
import {TestCreate} from '../../core/models/Test';
import {TestSettingsBottomSheetComponent} from './test-settings-bottom-sheet/test-settings-bottom-sheet.component';
import {Exercise} from '../../core/models/Exercise';
import {TestExercisesService} from '../../core/services/test-exercises.service';
import {AuthService} from '../../core/services/auth.service';
import {ALL_ROUTES, ROUTE_PARAMS} from '../../shared/ROUTES';
import {fadeInAnimation} from '../../shared/animations';

@Component({
  selector: 'app-test-info',
  templateUrl: './test-info.component.html',
  styleUrls: ['./test-info.component.scss'],
  animations: [fadeInAnimation()]
})
export class TestInfoComponent implements OnInit, OnDestroy {
  private subscriptions: any = [];

  public testId: string;
  public test: TestCreate;
  public exercises: Exercise[];

  constructor(private route: ActivatedRoute,
              public auth: AuthService,
              private router: Router,
              private testService: NewTestService,
              private exercisesService: TestExercisesService,
              private bottomSheet: MatBottomSheet) {

    this.subscriptions.push(
      this.route.parent.params.subscribe(params => {
        this.testId = params[ROUTE_PARAMS.TEST_ID];
        this.getTest();
        this.getExercises();
      })
    );
  }

  ngOnInit() {
    this.checkAuthor();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private checkAuthor() {

  }

  private getTest() {
    this.subscriptions.push(
      this.testService.getTestById(this.testId).subscribe(
        res => this.test = res,
        error => console.log(error)
      )
    );
  }

  private getExercises() {
    this.subscriptions.push(
      this.exercisesService.getTestExercises(this.testId).subscribe(
        res => this.exercises = res,
        error => console.log(error)
      )
    );
  }

  public openMoreBottomSheet(): void {
    this.bottomSheet.open(TestSettingsBottomSheetComponent);
  }

  public navigateToEdit(): void {
    this.router.navigate([`${ALL_ROUTES.CREATED_TEST}/${this.testId}/${ALL_ROUTES.EDIT_TEST}`]);
  }

}

