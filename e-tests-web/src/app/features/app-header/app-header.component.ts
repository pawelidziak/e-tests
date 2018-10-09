import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {HeaderService, HeaderValues} from '../../core/services/header.service';
import {MatDrawer} from '@angular/material';
import {ThemeService} from '../../core/services/theme.service';
import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit, OnDestroy {
  private subscriptions: any = [];

  @Input() height: number;
  @Input() drawer: MatDrawer;

  public headerValues: HeaderValues;
  public user: any;
  public isUserLoaded: boolean;

  constructor(private headerService: HeaderService,
              private auth: AuthService,
              public themeService: ThemeService) {
  }

  ngOnInit() {
    this.getHeaderValues();
    this.getUser();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private getUser(): void {
    this.subscriptions.push(
      this.auth.currentUserObservable.subscribe(
        res => {
          this.user = res;
          this.isUserLoaded = true;
        },
        error => console.log(error)
      ));
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
