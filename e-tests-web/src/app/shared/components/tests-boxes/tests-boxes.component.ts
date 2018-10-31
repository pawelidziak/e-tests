import {Component, Input, OnInit} from '@angular/core';
import {TestModel} from '../../../core/models/Test';
import {slideFromTop} from '../../animations';
import {AppSettingsService} from "../../../core/services/app-settings.service";

@Component({
  selector: 'app-test-boxes',
  templateUrl: './tests-boxes.component.html',
  styleUrls: ['./tests-boxes.component.scss'],
  animations: [slideFromTop()]
})
export class TestsBoxesComponent implements OnInit {

  @Input() testList: TestModel[];
  public searchTest: string;

  constructor(public appSettings: AppSettingsService) {
  }

  ngOnInit() {
  }

}
