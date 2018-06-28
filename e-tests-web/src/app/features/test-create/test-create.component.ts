import {Component, OnInit} from '@angular/core';
import {NEWTest} from '../../core/models/Test';
import {HeaderService} from '../../core/services/header.service';
import {Exercise} from '../../core/models/Exercise';

@Component({
  selector: 'app-test-create',
  templateUrl: './test-create.component.html',
  styleUrls: ['./test-create.component.scss'],

})
export class TestCreateComponent implements OnInit {
  public newTest: NEWTest;
  public testExercises: Array<Exercise>;
  public todayDate: Date;
  private readonly HEADER_TEXT = 'Create';

  constructor(private headerService: HeaderService) {
  }

  ngOnInit() {
    this.headerService.setHeaderText(this.HEADER_TEXT);
    this.defineEmptyTest();
  }

  canDeactivate() {
    return window.confirm('Are you sure? Unsaved changes will be lost.');
  }

  private defineEmptyTest() {
    this.newTest = {
      testName: '',
      categories: [],
      author: 'sd',
      desc: '',
      createDate: new Date()
    };
    this.testExercises = [];
  }
}
