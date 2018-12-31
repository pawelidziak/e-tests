import {Component, OnInit} from '@angular/core';
import {HeaderService, AppSettingsService} from '@core/services';
import {ALL_ROUTES} from '@shared/routes';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public ALL_ROUTES = ALL_ROUTES;

  constructor(private headerService: HeaderService,
              public appSettings: AppSettingsService) {
  }

  ngOnInit() {
    this.headerService.setCurrentRoute([]);
  }

  public scrollToMore(): void {
    document.getElementById('dashboardCard').scrollIntoView();
  }
}
