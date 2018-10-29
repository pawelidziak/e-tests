import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-test-desc',
  templateUrl: './test-desc.component.html',
  styleUrls: ['./test-desc.component.scss']
})
export class TestDescComponent implements OnInit {

  @Input() testDesc: string;
  @Input() disabled = false;
  @Input() width100 = false;
  @Input() margins = false;
  @Input() color = 'primary';
  @Input() appearance = 'standard';
  @Output() testDescChange: EventEmitter<string> = new EventEmitter<string>();

  public testDescControl: FormControl;

  constructor() {
  }

  ngOnInit() {
    this.testDescControl = new FormControl({value: this.testDesc, disabled: this.disabled});
  }

  public setValue(val: string) {
    this.testDesc = val;
    this.testDescChange.emit(this.testDesc);
  }
}
