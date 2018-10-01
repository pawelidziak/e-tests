import {Component, Inject, OnInit} from '@angular/core';
import {TestSettings} from '../../../core/models/Test';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

export interface TestConfig {
  settings: TestSettings;
  reset: boolean;
}

@Component({
  selector: 'app-test-config',
  templateUrl: './test-config.component.html',
  styleUrls: ['./test-config.component.scss']
})
export class TestConfigComponent implements OnInit {

  public toReset: boolean;
  public occurrencesExerciseNumber = 2;
  public repetitionExerciseNumber = 2;

  constructor(public dialogRef: MatDialogRef<TestConfigComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.toReset = this.data.toReset;
  }

  public closeDialog(resetTest: boolean): void {
    const config: TestConfig = {
      settings: {
        occurrencesNumber: this.occurrencesExerciseNumber,
        repetitionNumber: this.repetitionExerciseNumber,
      },
      reset: resetTest
    };
    this.dialogRef.close(config);
  }

}
