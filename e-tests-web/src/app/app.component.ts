import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from './core/services/auth.service';
import {RWDService} from './core/services/RWD.service';
import {ALL_ROUTES} from './shared/ROUTES';
import {MatSidenav} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private subscriptions: any[] = [];

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

  public isAppSidenavOpened: boolean;
  public headerHeight = 48;

  constructor(private rwdService: RWDService,
              private auth: AuthService) {

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
