import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Location} from '@angular/common';
import {TestSettings} from '../../../core/models/Test';

@Component({
  selector: 'app-test-config',
  templateUrl: './test-config.component.html',
  styleUrls: ['./test-config.component.scss']
})
export class TestConfigComponent implements OnInit {

  @Output() startTestEvent: EventEmitter<any> = new EventEmitter();
  public occurrencesExerciseNumber = 2;
  public repetitionExerciseNumber = 2;

  constructor(private location: Location) {
  }

  ngOnInit() {
  }

  public startTest(): void {
    const event: TestSettings = {
      occurrencesNumber: this.occurrencesExerciseNumber,
      repetitionNumber: this.repetitionExerciseNumber
    };
    this.startTestEvent.emit(event);
  }

  public backToTest(): void {
    this.location.back();
  }
}
