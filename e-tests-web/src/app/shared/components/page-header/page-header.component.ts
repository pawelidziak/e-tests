import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {HeaderService, HeaderValues} from '../../../core/services/header.service';
import {AppSettingsService} from '../../../core/services/app-settings.service';
import {RWDService} from "../../../core/services/RWD.service";

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
  public maxChar: number;
  public isXSmallScreen: boolean;

  constructor(private headerService: HeaderService,
              private rwdService: RWDService,
              public appSettings: AppSettingsService) {
  }

  ngOnInit() {
    this.getHeaderValues();
    this.getRwdValue();
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

  private getRwdValue(): void {
    this.rwdService.isXSmallScreen.subscribe(
      res => {
        this.isXSmallScreen = res;
        if (res) {
          this.maxChar = 10
        } else {
          this.maxChar = 30;
        }
      }
    )
  }
}
