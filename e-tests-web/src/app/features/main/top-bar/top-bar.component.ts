import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';
import {MatDialog} from '@angular/material';
import {AuthComponent} from '../../auth/auth.component';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  public user: any;

  constructor(private auth: AuthService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
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
}
