import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-test-visibility',
  templateUrl: './test-visibility.component.html',
  styleUrls: ['./test-visibility.component.scss']
})
export class TestVisibilityComponent implements OnInit {

  @Input() testVisibility: boolean;
  @Input() tooltip: string;
  @Input() disabled = false;
  @Input() margins = false;
  @Input() color = 'primary';
  @Output() testVisibilityChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  public testVisibilityControl: FormControl;

  constructor() {
  }

  ngOnInit() {
    this.testVisibilityControl = new FormControl({value: this.testVisibility, disabled: this.disabled});
  }

  public setValue(val: boolean) {
    this.testVisibility = val;
    this.testVisibilityChange.emit(this.testVisibility);
  }
}
