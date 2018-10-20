import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from './core/services/auth.service';
import {RWDService} from './core/services/RWD.service';
import {ALL_ROUTES} from './shared/ROUTES';
import {MatSidenav} from '@angular/material';
import {routeAnimations} from './shared/animations';
import {LoaderService} from './core/services/loader.service';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations]
})
export class AppComponent implements OnInit, OnDestroy {
  private subscriptions: any[] = [];
  public pageOnLoad: boolean;

  public generalLinks = [
    {label: 'Search', path: ALL_ROUTES.SEARCH, icon: 'search'},
    {label: 'Create', path: ALL_ROUTES.CREATE_TEST, icon: 'add'},
  ];
  public privateLinks = [
    {label: 'Your tests', path: ALL_ROUTES.USER_TESTS_LIST, icon: 'view_list'},
  ];

  public isMediumScreen = false;
  public user: any;
  public isUserLoaded: boolean;
  public headerHeight = 48;

  constructor(private rwdService: RWDService,
              private auth: AuthService,
              private loader: LoaderService,
              private router: Router) {
    this.subscriptions.push(
      this.loader.isOnLoad.subscribe(
        res => {
          this.pageOnLoad = res;
        }
      )
    );


    this.router.events.subscribe(event => {
      // Scroll to top if accessing a page, not via browser history stack
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
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
        },
        error => console.log(error)
      ));
  }

  private getRWDValue(): void {
    this.subscriptions.push(
      this.rwdService.isMediumScreen.subscribe(res => {
        this.isMediumScreen = res;
      })
    );
  }

  public closeDrawer(drawer: MatSidenav): void {
    if (this.isMediumScreen) {
      drawer.close();
    }
  }
}
