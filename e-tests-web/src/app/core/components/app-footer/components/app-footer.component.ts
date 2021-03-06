import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ALL_ROUTES} from '@shared/routes';
import {AuthService, AppSettingsService, HeaderValues, HeaderService} from '../../../services/index';

@Component({
  selector: 'app-footer',
  templateUrl: './app-footer.component.html',
  styleUrls: ['./app-footer.component.scss']
})
export class AppFooterComponent implements OnInit, OnDestroy {
  private subscriptions: any = [];
  @Input()  public user: any;

  public generalLinks = [
    {label: 'app-header-home', path: ALL_ROUTES.MAIN},
    {label: 'app-header-search', path: ALL_ROUTES.SEARCH},
    {label: 'app-header-create', path: ALL_ROUTES.CREATE_TEST},
  ];
  public accountLinks = [
    {label: 'app-header-study-sets', path: ALL_ROUTES.USER_TESTS_LIST},
    {label: 'app-header-profile', path: ALL_ROUTES.USER_PROFILE}
  ];
  public supportLinks = [
    {label: 'app-header-about', path: ALL_ROUTES.ABOUT},
    {label: 'app-header-download', path: ALL_ROUTES.DOWNLOAD},
    {label: 'app-header-settings', path: ALL_ROUTES.APP_SETTINGS}
  ];

  public headerValues: HeaderValues;

  constructor(private auth: AuthService,
              private headerService: HeaderService,
              public appSettings: AppSettingsService) {
  }

  ngOnInit() {
    this.getHeaderValues();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private getHeaderValues(): void {
    this.subscriptions.push(
      this.headerService.getHeaderValues().subscribe(
        res => this.headerValues = res)
    );
  }

  public openAuthDialog(): void {
    this.auth.openAuthDialog(false);
  }

  public logout(): void {
    this.auth.signOut();
  }

}
