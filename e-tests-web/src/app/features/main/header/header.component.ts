import {Component, Input, OnInit} from '@angular/core';
import {HeaderButtonType, HeaderService} from '../../../core/services/header.service';
import {Location} from '@angular/common';
import {MatSidenav} from '@angular/material';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() drawer: MatSidenav;
  @Input() isSmallScreen: boolean;

  public headerButton: HeaderButtonType;
  public headerText: string;
  public HeaderButtonType = HeaderButtonType;
  public user: any;

  constructor(private headerService: HeaderService,
              private location: Location,
              private auth: AuthService) {
  }

  ngOnInit() {
    this.getUser();
    this.getHeaderButton();
    this.getHeaderText();
  }

  private getUser() {
    const sub$ = this.auth.currentUserAuthState.subscribe(
      res => {
        this.user = res;
      },
      error => console.log(error)
    );
  }

  public openAuthDialog(): void {
    this.auth.openAuthDialog(false);
  }

  public backClicked(): void {
    this.location.back();
  }

  private getHeaderButton(): void {
    const buttonSub$ = this.headerService.getHeaderButtonValue().subscribe(
      res => this.headerButton = res);
  }

  private getHeaderText(): void {
    const textSub$ = this.headerService.getHeaderTextValue().subscribe(
      res => this.headerText = res);
  }

  public logout(): void {
    this.auth.signOut();
  }
}
