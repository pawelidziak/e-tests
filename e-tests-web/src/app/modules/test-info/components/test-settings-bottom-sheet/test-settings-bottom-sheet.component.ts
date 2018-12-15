import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material';
import {Exercise, TestModel} from '../../../../core/models/index';
import {ALL_ROUTES} from '@shared/routes';
import {Router} from '@angular/router';
import {TestService, AppSettingsService, AuthService} from '@core/services';
import {ExerciseUtils} from '@shared/utils';

@Component({
  selector: 'app-test-settings-bottom-sheet',
  templateUrl: './test-settings-bottom-sheet.component.html',
  styleUrls: ['./test-settings-bottom-sheet.component.scss']
})
export class TestSettingsBottomSheetComponent implements OnInit {

  public test: TestModel;
  private testExercises: Exercise[];

  constructor(private bottomSheetRef: MatBottomSheetRef<TestSettingsBottomSheetComponent>,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
              private router: Router,
              public auth: AuthService,
              private appSettings: AppSettingsService,
              private testService: TestService) {
    this.test = this.data.test;
    this.testExercises = this.data.testExercises;
  }

  ngOnInit() {
  }

  public exportToFile(): void {
    ExerciseUtils.downloadExercisesAsFile(this.prepareExerciseListToExport(), this.test.name);
    this.bottomSheetRef.dismiss();
  }

  private prepareExerciseListToExport(): any[] {
    const preparedList: any[] = [];
    for (const exercise of this.testExercises) {
      preparedList.push({
        question: exercise.question,
        correctAnswers: exercise.correctAnswers,
        answers: exercise.answers
      });
    }
    return preparedList;
  }

  public navigateToImport(): void {
    this.bottomSheetRef.dismiss();
    this.router.navigate([`${ALL_ROUTES.CREATED_TEST}/${this.test.id}/${ALL_ROUTES.IMPORT_EXERCISES}`]);
  }

  public deleteTest(): void {
    if (confirm(this.appSettings.translateText('test-info-confirm-delete'))) {
      this.testService.deleteTest(this.test.id)
        .then(() => {
          this.bottomSheetRef.dismiss();
          this.router.navigateByUrl(ALL_ROUTES.DASHBOARD);
        })
        .catch(error => console.log(error));
    }
  }
}
