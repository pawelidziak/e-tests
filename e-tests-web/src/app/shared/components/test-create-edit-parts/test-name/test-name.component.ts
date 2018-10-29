import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-test-name',
  templateUrl: './test-name.component.html',
  styleUrls: ['./test-name.component.scss']
})
export class TestNameComponent implements OnInit {

  @Input() testName: string;
  @Input() disabled = false;
  @Input() width100 = false;
  @Input() margins = false;
  @Input() color = 'primary';
  @Input() appearance = 'standard';
  @Output() testNameChange: EventEmitter<string> = new EventEmitter<string>();


  public testNameControl: FormControl;

  constructor() {
  }

  ngOnInit() {
    this.testNameControl = new FormControl(
      {value: this.testName, disabled: this.disabled},
      Validators.required);
  }

  public setValue(val: string) {
    this.testName = val;
    this.testNameChange.emit(this.testName);
  }
}
