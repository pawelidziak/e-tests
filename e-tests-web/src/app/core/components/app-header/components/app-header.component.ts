import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AppSettingsService, AuthService, HeaderService, HeaderValues} from '../../../services/index';
import {ALL_ROUTES} from '@shared/routes';
import {slideFromTopToTop} from '@shared/animations';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
  animations: [slideFromTopToTop()]
})
export class AppHeaderComponent implements OnInit, OnDestroy {
  private subscriptions: any = [];

  @Input() height: number;
  @Input() isSmallScreen: boolean;
  @Input() user: any;

  public ALL_ROUTES = ALL_ROUTES;
  public headerValues: HeaderValues;

  public slideMenu = false;

  public generalLinks = [
    {label: 'app-header-create', path: ALL_ROUTES.CREATE_TEST, icon: 'add'},
    {label: 'app-header-search', path: ALL_ROUTES.SEARCH, icon: 'search'}
  ];

  public otherLinks = [
    {label: 'app-header-about', path: ALL_ROUTES.ABOUT, icon: 'info'},
    {label: 'app-header-download', path: ALL_ROUTES.DOWNLOAD, icon: 'cloud_download'},
    {label: 'app-header-settings', path: ALL_ROUTES.APP_SETTINGS, icon: 'settings'}
  ];

  constructor(private headerService: HeaderService,
              private auth: AuthService,
              public appSettings: AppSettingsService) {
  }

  ngOnInit() {
    this.getHeaderValues();
  }

  ngOnDestroy() {
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

  public openAuthDialog(): void {
    this.auth.openAuthDialog(false);
  }

  public logout(): void {
    this.auth.signOut();
  }

}
