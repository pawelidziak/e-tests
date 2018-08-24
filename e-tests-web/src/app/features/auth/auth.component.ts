import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AuthComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private auth: AuthService) {
    this.auth.currentUserAuthState.subscribe(
      res => {
        if (!res) {
          // dialogRef.disableClose = true;
        }
      },
      error => console.log(error)
    );
  }

  ngOnInit() {
  }
}
