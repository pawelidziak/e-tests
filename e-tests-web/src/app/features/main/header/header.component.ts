import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {HeaderService} from '../../../core/services/header.service';
import {ALL_ROUTES} from '../../../shared/ROUTES';
import {slideFromTopAnimation} from '../../../shared/animations';
import {MatDrawer} from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [slideFromTopAnimation()]
})
export class HeaderComponent implements OnInit, OnDestroy, OnChanges {
  private subscriptions: any = [];
  public readonly ALL_ROUTES = ALL_ROUTES;

  @Input() user: any;
  @Input() drawer: MatDrawer;

  public isUserAuthenticated = false;
  public headerVisibility: boolean;

  constructor(private headerService: HeaderService) {
  }

  ngOnInit() {
    this.getHeaderVisibility();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isUserAuthenticated = this.user && this.user.emailVerified;
  }

  private getHeaderVisibility(): void {
    this.subscriptions.push(
      this.headerService.getHeaderVisibilityValue().subscribe(
        res => this.headerVisibility = res)
    );
  }
}
