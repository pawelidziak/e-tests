import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {routeAnimations} from '@shared/animations';
import {RWDService, AuthService, LoaderService, AppSettingsService} from '@core/services';
import {SwUpdate} from '@angular/service-worker';

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
              private swUpdate: SwUpdate,
              public appSettings: AppSettingsService) {
  }

  ngOnInit() {
    this.loader.start();
    this.getUser();
    this.getRWDValue();

    if (this.swUpdate.isEnabled) {
      this.subscriptions.push(
        this.swUpdate.available.subscribe(() => {
          if (confirm(this.appSettings.translateText('new-app-version'))) {
            window.location.reload();
          }
        })
      );
    }
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
