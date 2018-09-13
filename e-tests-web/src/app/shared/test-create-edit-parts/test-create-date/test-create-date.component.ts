import {Component, Input, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-test-create-date',
  templateUrl: './test-create-date.component.html',
  styleUrls: ['./test-create-date.component.scss']
})
export class TestCreateDateComponent implements OnInit {

  @Input() testCreateDate: Date;
  @Input() disabled = false;
  @Input() width100 = false;
  @Input() margins = false;
  @Input() color = 'primary';
  @Input() appearance = 'standard';

  public testCreateDateControl: FormControl;

  constructor() {
  }

  ngOnInit() {
    this.testCreateDateControl = new FormControl(
      {value: this.testCreateDate, disabled: this.disabled},
      Validators.required);
  }

}
