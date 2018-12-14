import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {routeAnimations} from '../../shared/animations';
import {RWDService} from '../../core/services/RWD.service';
import {AuthService} from '../../core/services/auth.service';
import {LoaderService} from '../../core/services/loader.service';
import {AppSettingsService} from '../../core/services/app-settings.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [routeAnimations()]
})
export class MainComponent implements OnInit, OnDestroy {
  private subscriptions: any[] = [];

  public isSmallScreen = false;
  public user: any;
  public isUserLoaded = false;
  public headerHeight = 48;

  constructor(private rwdService: RWDService,
              private loader: LoaderService,
              private auth: AuthService,
              public appSettings: AppSettingsService) {
  }

  ngOnInit() {
    this.loader.start();
    this.getUser();
    this.getRWDValue();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private getUser(): void {
    this.subscriptions.push(
      this.auth.currentUserObservable.subscribe(
        res => {
          this.user = res;
          this.isUserLoaded = true;
          this.loader.complete();
        },
        error => {
          console.log(error);
          this.loader.complete();
        }
      ));
  }

  private getRWDValue(): void {
    this.subscriptions.push(
      this.rwdService.isSmallScreen.subscribe(res => this.isSmallScreen = res)
    );
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler() {
    if (this.appSettings.logoutAfterRefresh) {
      this.auth.signOut();
    }
  }
}
