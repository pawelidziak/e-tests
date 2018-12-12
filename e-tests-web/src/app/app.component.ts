import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from './core/services/auth.service';
import {RWDService} from './core/services/RWD.service';
import {listAnimation, routeAnimations} from './shared/animations';
import {LoaderService} from './core/services/loader.service';
import {NavigationStart, Router} from '@angular/router';
import {AppSettingsService} from './core/services/app-settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations, listAnimation()]
})
export class AppComponent implements OnInit, OnDestroy {
  private subscriptions: any[] = [];
  public pageOnLoad: boolean;

  public isSmallScreen = false;
  public user: any;
  public isUserLoaded: boolean;
  public headerHeight = 48;

  public isIEOrEdge: boolean;

  constructor(private rwdService: RWDService,
              private auth: AuthService,
              private loader: LoaderService,
              private router: Router,
              public appSettings: AppSettingsService) {
    this.loader.start();
    this.subscriptions.push(
      this.loader.isOnLoad.subscribe(res => this.pageOnLoad = res)
    );

    this.router.events.subscribe(event => {
      // Scroll to top if accessing a page, not via browser history stack
      if (event instanceof NavigationStart) {
        // window.scrollTo(0, 0);
      }
    });
  }

  ngOnInit() {
    this.isIEOrEdge = /msie\s|trident\/|edge\//i.test(window.navigator.userAgent);
    if (!this.isIEOrEdge) {
      this.getUser();
      this.getRWDValue();
    } else {
      this.loader.complete();
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private getUser(): void {
    this.subscriptions.push(
      this.auth.currentUserObservable.subscribe(
        res => {
          this.user = res;
          this.isUserLoaded = true;
          this.loader.complete();
        },
        error => {
          console.log(error);
          this.loader.complete();
        }
      ));
  }

  private getRWDValue(): void {
    this.subscriptions.push(
      this.rwdService.isSmallScreen.subscribe(res => this.isSmallScreen = res)
    );
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event) {
    if (this.appSettings.logoutAfterRefresh) {
      this.auth.signOut();
    }
  }
}
