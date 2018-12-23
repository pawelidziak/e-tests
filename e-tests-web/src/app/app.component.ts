import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoaderService} from '@core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private subscriptions: any[] = [];
  public pageOnLoad: boolean;
  public isIEOrEdge: boolean;

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
