import {Component, EventEmitter, OnInit, Output} from '@angular/core';

export interface StartTestEvent {
  occurrencesNumber: number;
  repetitionNumber: number;
}

@Component({
  selector: 'app-test-config',
  templateUrl: './test-config.component.html',
  styleUrls: ['./test-config.component.scss']
})
export class TestConfigComponent implements OnInit {

  @Output() startTestEvent: EventEmitter<any> = new EventEmitter();
  public occurrencesExerciseNumber = 2;
  public repetitionExerciseNumber = 2;

  constructor() {
  }

  ngOnInit() {
  }

  startTest(): void {
    const event: StartTestEvent = {
      occurrencesNumber: this.occurrencesExerciseNumber,
      repetitionNumber: this.repetitionExerciseNumber
    };
    this.startTestEvent.emit(event);
  }

}
