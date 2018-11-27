import {Component, OnDestroy, OnInit} from '@angular/core';
import {ALL_ROUTES} from '../../shared/ROUTES';
import {AuthService} from '../../core/services/auth.service';
import {Subscription} from 'rxjs';
import {AppSettingsService} from '../../core/services/app-settings.service';
import {HeaderService, HeaderValues} from '../../core/services/header.service';

@Component({
  selector: 'app-footer',
  templateUrl: './app-footer.component.html',
  styleUrls: ['./app-footer.component.scss']
})
export class AppFooterComponent implements OnInit, OnDestroy {
  private subscriptions: any = [];

  public generalLinks = [
    {label: 'app-header-home', path: ALL_ROUTES.DASHBOARD},
    {label: 'app-header-search', path: ALL_ROUTES.SEARCH},
    {label: 'app-header-create', path: ALL_ROUTES.CREATE_TEST},
  ];
  public accountLinks = [
    {label: 'app-header-study-sets', path: ALL_ROUTES.USER_TESTS_LIST}
  ];
  public supportLinks = [
    {label: 'app-header-about', path: ALL_ROUTES.ABOUT},
    {label: 'app-header-download', path: ALL_ROUTES.DOWNLOAD},
    {label: 'app-header-settings', path: ALL_ROUTES.APP_SETTINGS}
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
      res => {
        this.isUserLoggedIn = !!res;
        this.accountLinks.push(
          {label: 'app-header-profile', path: `${this.auth.currentUserId}/${ALL_ROUTES.USER_PROFILE}`}
        );
      },
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
