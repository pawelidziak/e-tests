import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoaderService} from '@core/services';
import {environment} from '@env/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private subscriptions: any[] = [];
  public pageOnLoad: boolean;
  public isIEOrEdge: boolean;
  private env = environment;

  constructor(private loader: LoaderService) {
    this.subscriptions.push(
      this.loader.isOnLoad.subscribe(res => this.pageOnLoad = res)
    );
  }

  ngOnInit() {
    this.isIEOrEdge = /msie\s|trident\/|edge\//i.test(window.navigator.userAgent);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  public downloadWin(): void {
    this.openLink(this.env.winDownload);
  }

  public downloadMacOS(): void {
    this.openLink(this.env.macDownload);
  }

  public downloadLinux(): void {
    this.openLink(this.env.linuxDownload);
  }

  private openLink(url: string): void {
    window.open(url, '_blank');
  }
}
