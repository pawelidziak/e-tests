import {Component, OnInit} from '@angular/core';
import {NEWTest} from '../../core/models/Test';
import {HeaderButtonType, HeaderService} from '../../core/services/header.service';
import {Exercise} from '../../core/models/Exercise';

@Component({
  selector: 'app-test-create',
  templateUrl: './test-create.component.html',
  styleUrls: ['./test-create.component.scss']
})
export class TestCreateComponent implements OnInit {
  public newTest: NEWTest;
  public testExercises: Array<Exercise>;
  private readonly HEADER_TEXT = 'Create';

  constructor(private headerService: HeaderService) {
  }

  ngOnInit() {
    this.headerService.setHeaderButtonAndText(HeaderButtonType.BACK, this.HEADER_TEXT);
    this.defineEmptyTest();
  }

  private defineEmptyTest() {
    this.newTest = {
      testName: '',
      categories: [],
      author: '',
      desc: '',
      createDate: new Date()
    };
    this.testExercises = [];
  }
}
