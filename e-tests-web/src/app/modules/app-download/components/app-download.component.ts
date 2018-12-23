import {Component, OnInit} from '@angular/core';
import {HeaderService} from '@core/services';

@Component({
  selector: 'app-app-download',
  templateUrl: './app-download.component.html',
  styleUrls: ['./app-download.component.scss']
})
export class AppDownloadComponent implements OnInit {

  constructor(private headerService: HeaderService) {
  }

  ngOnInit() {
    this.headerService.setCurrentRoute([
      {label: 'app-download-title', path: ''}
    ]);
  }

  public downloadWin10(): void {
    // TODO
  }

  public downloadWinOlder(): void {
    // TODO
  }

  public downloadMacOS(): void {
    // TODO
  }

}
