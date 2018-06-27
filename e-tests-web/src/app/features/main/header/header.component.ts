import {Component, Input, OnInit} from '@angular/core';
import {HeaderButtonType, HeaderService} from '../../../core/services/header.service';
import {Location} from '@angular/common';
import {MatDialog, MatSidenav} from '@angular/material';
import {AuthComponent} from '../../auth/auth.component';
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
              private auth: AuthService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getHeaderButton();
    this.getHeaderText();
    this.getUser();
  }

  private getUser() {
    this.auth.currentUserAuthState.subscribe(
      res => {
        this.user = res;
      },
      error => console.log(error)
    );
  }

  public openAuthDialog(): void {
    const dialogRef = this.dialog.open(AuthComponent);

    const sub$ = dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed = ' + result);
    });
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

}
