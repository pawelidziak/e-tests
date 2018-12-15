import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {RWDService} from '@core/services';
import {Router} from '@angular/router';
import {ALL_ROUTES} from '@shared/routes';
import {TestConfigInput, TestConfigWithRestart} from '@modules/test-learn/models';

@Component({
  selector: 'app-test-config',
  templateUrl: './test-config.component.html',
  styleUrls: ['./test-config.component.scss']
})
export class TestConfigComponent implements OnInit, OnDestroy {
  private subscriptions: any[] = [];

  private readonly testId: string;
  public occurrencesExerciseNumber: number;
  public repetitionExerciseNumber: number;
  public testIsNewOrInProgress: boolean;
  public testIsEnd: boolean;

  public confirmRestart: boolean;
  public isSmallScreen: boolean;

  constructor(private rwdService: RWDService,
              private router: Router,
              public dialogRef: MatDialogRef<TestConfigComponent>,
              @Inject(MAT_DIALOG_DATA) public data: TestConfigInput) {
    this.testId = this.data.testId;
    this.occurrencesExerciseNumber = this.data.occurrencesExerciseNumber;
    this.repetitionExerciseNumber = this.data.repetitionExerciseNumber;
    this.testIsNewOrInProgress = this.data.testIsNewOrInProgress;
    this.testIsEnd = this.data.testIsEnd;
  }

  ngOnInit() {
    this.getRWDValue();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  public closeDrawer(reset: boolean = this.testIsNewOrInProgress): void {
    const settings: TestConfigWithRestart = {
      config: {
        occurrencesNumber: this.occurrencesExerciseNumber,
        repetitionNumber: this.repetitionExerciseNumber
      },
      restartTestProgress: reset
    };

    this.dialogRef.close(settings);

    if (this.confirmRestart) {
      this.confirmRestart = false;
    }
  }

  private getRWDValue(): void {
    this.subscriptions.push(
      this.rwdService.isSmallScreen.subscribe(res => {
        this.isSmallScreen = res;
      })
    );
  }

  public backToTest(): void {
    this.router.navigate([`${ALL_ROUTES.CREATED_TEST}/${this.testId}`]);
    this.closeConfigDialog();
  }

  closeConfigDialog(): void {
    this.dialogRef.close();
  }
}
