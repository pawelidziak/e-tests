import {Component, Input, OnInit} from '@angular/core';
import {TestModel} from '@core/models';
import {slideFromTop} from '../../animations';
import {AppSettingsService} from '@core/services';
import {ALL_ROUTES} from '@shared/routes';

@Component({
  selector: 'app-test-boxes',
  templateUrl: './tests-boxes.component.html',
  styleUrls: ['./tests-boxes.component.scss'],
  animations: [slideFromTop()]
})
export class TestsBoxesComponent implements OnInit {

  @Input() testList: TestModel[];
  public ALL_ROUTES = ALL_ROUTES;
  public searchText: TestModel[];

  constructor(public appSettings: AppSettingsService) {
  }

  ngOnInit() {
  }

}
