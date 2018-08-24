import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../../shared/animations';
import {HeaderService} from '../../core/services/header.service';
import {RWDService} from '../../core/services/RWD.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],

  animations: [routerTransition]
})
export class DashboardComponent implements OnInit {

  public isSmallScreen: boolean;

  public examples = [
    {path: '/dashboard', label: 'Activity', icon: 'bar_chart'},
    {path: '/s', label: 'Popular', icon: 'trending_up'},
    {path: '/create', label: 'New', icon: 'add'},
    {path: '/d', label: 'About', icon: 'contact_support'}
  ];

  constructor(private headerService: HeaderService,
              private rwdService: RWDService) {
  }

  ngOnInit() {
    this.getRWDValue();
    this.headerService.setHeaderText('Dashboard');
  }
  private getRWDValue(): void {
    const RWDsub$ = this.rwdService.isSmallScreen.subscribe(res => {
      this.isSmallScreen = res;
    });
  }
}
