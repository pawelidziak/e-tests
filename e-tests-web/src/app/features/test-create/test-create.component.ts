import {Component, OnInit} from '@angular/core';
import {Test} from '../../core/models/Test';
import {HeaderButtonType, HeaderService} from '../../core/services/header.service';

@Component({
  selector: 'app-test-create',
  templateUrl: './test-create.component.html',
  styleUrls: ['./test-create.component.scss']
})
export class TestCreateComponent implements OnInit {
  public newTest: Test;
  private readonly HEADER_TEXT = 'Create';

  constructor(private headerService: HeaderService) {
  }

  ngOnInit() {
    this.headerService.setHeaderButtonAndText(HeaderButtonType.BACK, this.HEADER_TEXT);
    this.defineEmptyTestInterface();
  }

  private defineEmptyTestInterface() {
    this.newTest = {
      testName: '',
      exercises: [],
      section: '',
      categories: [],
      author: ''
    };
  }
}
