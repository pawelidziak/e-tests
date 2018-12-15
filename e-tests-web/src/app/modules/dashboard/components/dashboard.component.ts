import {Component, OnDestroy, OnInit} from '@angular/core';
import {HeaderService, AppSettingsService, AuthService} from '@core/services';
import {ALL_ROUTES} from '@shared/routes';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private subscriptions: any[] = [];
  public ALL_ROUTES = ALL_ROUTES;
  public isUserLoggedIn: boolean;

  constructor(private auth: AuthService,
              private headerService: HeaderService,
              public appSettings: AppSettingsService) {
  }

  ngOnInit() {
    this.getUser();
    this.headerService.setCurrentRoute([]);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private getUser(): void {
    this.subscriptions.push(
      this.auth.currentUserObservable.subscribe(
        res => this.isUserLoggedIn = !!res,
        error => console.log(error)
      ));
  }

  public openAuthDialog(): void {
    this.auth.openAuthDialog(false);
  }
}
