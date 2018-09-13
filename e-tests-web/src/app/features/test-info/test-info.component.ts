import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatBottomSheet} from '@angular/material';
import {TestService} from '../../core/services/test.service';
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
  private subscriptions: any[] = [];

  public testId: string;
  public test: TestCreate;
  public exercises: Exercise[];
  public originalExercisesLength: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private testService: TestService,
              private exercisesService: TestExercisesService,
              private bottomSheet: MatBottomSheet,
              public auth: AuthService) {

    this.subscriptions.push(
      this.route.parent.params.subscribe(params => {
        this.testId = params[ROUTE_PARAMS.TEST_ID];
        this.getTest();
        this.getExercises();
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
        res => this.test = res,
        error => console.log(error)
      )
    );
  }

  private getExercises() {
    this.subscriptions.push(
      this.exercisesService.getTestExercises(this.testId).subscribe(
        res => {
          this.exercises = res;
          this.originalExercisesLength = this.exercises.length;
        },
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

