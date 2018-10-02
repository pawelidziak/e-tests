import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TestSettings} from '../../../core/models/Test';
import {MatDrawer} from '@angular/material';

export interface TestConfig {
  settings: TestSettings;
  isNewTest: boolean;
}

@Component({
  selector: 'app-test-config',
  templateUrl: './test-config.component.html',
  styleUrls: ['./test-config.component.scss']
})
export class TestConfigComponent implements OnInit {
  @Input() configDrawer: MatDrawer;


  @Input() occurrencesExerciseNumber = 2;
  @Output() occurrencesExerciseNumberChange = new EventEmitter();

  @Input() repetitionExerciseNumber = 2;
  @Output() repetitionExerciseNumberChange = new EventEmitter();

  @Input() testIsNew: boolean;


  @Output() saveSettings: EventEmitter<boolean> = new EventEmitter<boolean>();

  public confirmReset: boolean;

  constructor() {
  }

  ngOnInit() {
  }

  public closeDrawer(reset: boolean = this.testIsNew): void {
    // const config: TestConfig = {
    //   settings: {
    //     occurrencesNumber: this.occurrencesExerciseNumber,
    //     repetitionNumber: this.repetitionExerciseNumber,
    //   },
    //   isNewTest: reset
    // };

    this.repetitionExerciseNumberChange.emit(this.repetitionExerciseNumber);
    this.occurrencesExerciseNumberChange.emit(this.occurrencesExerciseNumber);
    this.saveSettings.emit(reset);
  }

}
