import {Component, OnDestroy, OnInit} from '@angular/core';
import {RWDService} from '../../core/services/RWD.service';
import {HeaderService} from '../../core/services/header.service';
import {AppSettingsService} from '../../core/services/app-settings.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private subscriptions: any[] = [];

  public isSmallScreen: boolean;

  public examples = [
    {path: '/dashboard', label: 'Activity', icon: 'bar_chart'},
    {path: '/s', label: 'Popular', icon: 'trending_up'},
    {path: '/create', label: 'New', icon: 'add'},
    {path: '/d', label: 'About', icon: 'contact_support'}
  ];

  constructor(private rwdService: RWDService,
              private headerService: HeaderService,
              public appSettings: AppSettingsService) {
  }

  ngOnInit() {
    this.getRWDValue();
    this.headerService.setCurrentRoute([]);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private getRWDValue(): void {
    this.subscriptions.push(
      this.rwdService.isSmallScreen.subscribe(res => {
        this.isSmallScreen = res;
      })
    );
  }
}
