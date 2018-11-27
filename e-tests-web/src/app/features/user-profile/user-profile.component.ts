import {Component, OnDestroy, OnInit} from '@angular/core';
import {HeaderService} from '../../core/services/header.service';
import {AppSettingsService} from '../../core/services/app-settings.service';
import {AuthService} from '../../core/services/auth.service';
import {LoaderService} from '../../core/services/loader.service';
import {ROUTE_PARAMS} from '../../shared/ROUTES';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../core/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  private subscriptions: any[] = [];
  public user: any;
  public owner: any;
  private userId: string;
  public isOwner: boolean;

  constructor(private headerService: HeaderService,
              private route: ActivatedRoute,
              private userService: UserService,
              private auth: AuthService,
              public loader: LoaderService,
              public appSettings: AppSettingsService) {
    this.subscriptions.push(
      this.route.parent.params.subscribe(params => {
        this.userId = params[ROUTE_PARAMS.USER_ID];
        this.getUser();
        this.getCurrentUser();
      })
    );
  }

  ngOnInit() {
    console.log('init')
    this.headerService.setCurrentRoute([
      {label: 'user-profile-title', path: ''}
    ]);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private getUser(): void {
    this.loader.start();
    this.subscriptions.push(
      this.userService.getUserById(this.userId).subscribe(
        res => {
          console.log(res);
        }, error => console.log(error)
      )
    );
  }

  private getCurrentUser(): void {
    this.loader.start();
    this.subscriptions.push(
      this.auth.currentUserObservable.subscribe(
        res => {
          this.owner = res;
          console.log(this.owner);
          this.loader.complete();
        },
        error => {
          console.log(error);
          this.loader.complete();
        }
      ));
  }
}
