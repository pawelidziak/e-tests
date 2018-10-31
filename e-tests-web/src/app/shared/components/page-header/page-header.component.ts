import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {HeaderService, HeaderValues} from '../../../core/services/header.service';
import {AppSettingsService} from '../../../core/services/app-settings.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit, OnDestroy {
  private subscriptions: any = [];
  @Input() height: number;
  @Input() user: any;

  public headerValues: HeaderValues;

  constructor(private headerService: HeaderService,
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
        res => this.headerValues = res)
    );
  }

}
