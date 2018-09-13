import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TestCreate} from '../../core/models/Test';
import {TestService} from '../../core/services/test.service';
import {Exercise} from '../../core/models/Exercise';
import {TestExercisesService} from '../../core/services/test-exercises.service';
import {MatSnackBar} from '@angular/material';
import {AuthService} from '../../core/services/auth.service';
import {ALL_ROUTES, ROUTE_PARAMS} from '../../shared/ROUTES';
import {fadeInAnimation} from '../../shared/animations';

@Component({
  selector: 'app-test-edit',
  templateUrl: './test-edit.component.html',
  styleUrls: ['./test-edit.component.scss'],
  animations: [fadeInAnimation()]
})
export class TestEditComponent implements OnInit, OnDestroy {
  private subscriptions: any = [];
  private copyTest: Exercise;

  public testId: string;
  public testInfo: TestCreate;
  public exercises: Exercise[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private auth: AuthService,
              private testService: TestService,
              private exercisesService: TestExercisesService,
              public snackBar: MatSnackBar) {
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

  private getTest(): void {
    this.subscriptions.push(
      this.testService.getTestById(this.testId).subscribe(
        res => {
          if (res && this.auth.currentUserId !== res.authorId) {
            this.router.navigate([ALL_ROUTES.DASHBOARD]);
          } else {
            this.testInfo = res;
            this.copyTest = JSON.parse(JSON.stringify(this.testInfo));
          }
        },
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

  public saveTestInfo() {
    if (this.checkCreateTestCondition() && this.isTestChanged()) {
      this.testService.updateTest(this.testId, this.testInfo)
        .then(() => this.openSnackBar('Test saved', 5000))
        .catch(error => this.openSnackBar(error, 10000));
    }
  }

  private openSnackBar(text: string, duration: number): void {
    this.snackBar.open(text, 'OK', {
      duration: duration
    });
  }

  private checkCreateTestCondition(): boolean {
    return !(this.testInfo.name.length === 0 || this.testInfo.tags.length === 0);
  }

  public isTestChanged(): boolean {
    return JSON.stringify(this.testInfo) !== JSON.stringify(this.copyTest);
  }
}
