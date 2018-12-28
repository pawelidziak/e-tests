import {Component, OnInit} from '@angular/core';
import {HeaderService} from '@core/services';
import {environment} from '@env/environment';
import {ALL_ROUTES} from '@shared/routes';

@Component({
  selector: 'app-app-download',
  templateUrl: './app-download.component.html',
  styleUrls: ['./app-download.component.scss']
})
export class AppDownloadComponent implements OnInit {

  private env = environment;

  constructor(private headerService: HeaderService) {
  }

  ngOnInit() {
    this.headerService.setCurrentRoute([
      {label: 'app-download-title', path: ''}
    ]);
  }

  public downloadWin10(): void {
    this.openLink(this.env.winStore);
  }

  public downloadWinOlder(): void {
    this.openLink(this.env.winDownload);
  }

  public downloadMacOS(): void {
    this.openLink(this.env.macDownload);
  }

  private openLink(url: string): void {
    window.open(url, '_blank');
  }

}
