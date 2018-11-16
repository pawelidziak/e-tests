import {Component, OnDestroy, OnInit} from '@angular/core';
import {ALL_ROUTES} from "../../shared/ROUTES";
import {AuthService} from "../../core/services/auth.service";
import {Subscription} from "rxjs";
import {AppSettingsService} from "../../core/services/app-settings.service";
import {HeaderService, HeaderValues} from "../../core/services/header.service";

@Component({
  selector: 'app-footer',
  templateUrl: './app-footer.component.html',
  styleUrls: ['./app-footer.component.scss']
})
export class AppFooterComponent implements OnInit, OnDestroy {
  private subscriptions: any = [];

  public generalLinks = [
    {label: 'Home', path: ALL_ROUTES.DASHBOARD},
    {label: 'Search', path: ALL_ROUTES.SEARCH},
    {label: 'Create', path: ALL_ROUTES.CREATE_TEST},
  ];
  public accountLinks = [
    {label: 'Study sets', path: ALL_ROUTES.USER_TESTS_LIST},
    {label: 'Profile', path: ALL_ROUTES.USER_PROFILE}
  ];
  public supportLinks = [
    {label: 'About', path: ALL_ROUTES.ABOUT},
    {label: 'Download', path: ALL_ROUTES.DOWNLOAD},
    {label: 'Settings', path: ALL_ROUTES.APP_SETTINGS}
  ];

  public isUserLoggedIn: boolean;
  public headerValues: HeaderValues;

  constructor(private auth: AuthService,
              private headerService: HeaderService,
              public appSettings: AppSettingsService) {
  }

  ngOnInit() {
    this.getHeaderValues();
    this.checkUser();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private getHeaderValues(): void {
    this.subscriptions.push(
      this.headerService.getHeaderValues().subscribe(
        res => {
          this.headerValues = res;
        })
    );
  }

  private checkUser(): void {
    this.subscriptions.push(this.auth.currentUserObservable.subscribe(
      res => this.isUserLoggedIn = !!res,
      error => console.log(error)
    ));
  }

  public openAuthDialog(): void {
    this.auth.openAuthDialog(false);
  }

  public logout(): void {
    this.auth.signOut();
  }

}
