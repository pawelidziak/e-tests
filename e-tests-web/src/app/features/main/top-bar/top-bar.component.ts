import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  public user: any;

  constructor(private auth: AuthService) {
  }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.auth.currentUserAuthState.subscribe(
      res => {
        console.log(res);
        this.user = res;
      },
      error => console.log(error)
    );
  }

}
