import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {HeaderService, HeaderValues} from '../../core/services/header.service';
import {ThemeService} from '../../core/services/theme.service';
import {slideFromTopAnimation} from '../animations';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
  animations: [slideFromTopAnimation()]
})
export class PageHeaderComponent implements OnInit, OnDestroy {
  private subscriptions: any = [];
  @Input() height: number;

  public headerValues: HeaderValues;

  constructor(private headerService: HeaderService,
              public themeService: ThemeService) {
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

}
