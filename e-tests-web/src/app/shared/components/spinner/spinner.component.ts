import {Component, OnInit} from '@angular/core';
import {AppSettingsService} from '@core/services';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  constructor(public appSettings: AppSettingsService) {
  }

  ngOnInit() {
  }

}
