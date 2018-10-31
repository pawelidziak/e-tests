import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from './core/services/auth.service';
import {RWDService} from './core/services/RWD.service';
import {ALL_ROUTES} from './shared/ROUTES';
import {MatSidenav} from '@angular/material';
import {listAnimation, routeAnimations} from './shared/animations';
import {LoaderService} from './core/services/loader.service';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
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

  public generalLinks = [
    {label: 'Dashboard', path: ALL_ROUTES.DASHBOARD, icon: 'dashboard'},
    {label: 'Search', path: ALL_ROUTES.SEARCH, icon: 'search'},
    {label: 'Create', path: ALL_ROUTES.CREATE_TEST, icon: 'add'},
    {label: 'Popular', path: 'TODO', icon: 'trending_up'}
  ];

  public personalLinks = [
    {label: 'Study sets', path: ALL_ROUTES.USER_TESTS_LIST, icon: 'collections_bookmark'}
  ];

  public otherLinks = [
    {label: 'About', path: 'TODO', icon: 'help'},
    {label: 'Download', path: 'TODO', icon: 'cloud_download'},
    {label: 'Settings', path: ALL_ROUTES.APP_SETTINGS, icon: 'settings'}
  ];

  public isSmallScreen = false;
  public user: any;
  public isUserLoaded: boolean;
  public headerHeight = 48;

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
        console.log(event)

        const urls = event.url.split('/');
        urls[0] = 'home';
        console.log(urls);

        // window.scrollTo(0, 0);
      }
    });
  }

  ngOnInit() {
    this.getUser();
    this.getRWDValue();
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

  public closeDrawer(drawer: MatSidenav): void {
    if (this.isSmallScreen) {
      drawer.close();
    }
  }
}
