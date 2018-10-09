import {
  Component,
  ElementRef,
  HostBinding,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {CdkScrollable, OverlayContainer} from '@angular/cdk/overlay';
import {AuthService} from './core/services/auth.service';
import {ThemeService} from './core/services/theme.service';
import {RWDService} from './core/services/RWD.service';
import {ALL_ROUTES} from './shared/ROUTES';
import {MatSidenav} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private subscriptions: any[] = [];
  @ViewChild(CdkScrollable) scrollable: CdkScrollable;
  @ViewChild('mainContainer') mainContainer: ElementRef;
  @HostBinding('class') componentCssClass;

  public generalLinks = [
    {label: 'Search', path: ALL_ROUTES.SEARCH, icon: 'search'},
    {label: 'Create', path: ALL_ROUTES.CREATE_TEST, icon: 'add'},
  ];
  public privateLinks = [
    {label: 'Your tests', path: ALL_ROUTES.USER_TESTS_LIST, icon: 'view_list'},
  ];

  public isSmallScreen = false;
  public user: any;
  public isUserLoaded: boolean;

  public headerHeight = 48;

  constructor(private rwdService: RWDService,
              private auth: AuthService,
              private themeService: ThemeService,
              public overlayContainer: OverlayContainer) {

  }

  ngOnInit() {
    this.getUser();
    this.getRWDValue();
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

  private getRWDValue(): void {
    this.subscriptions.push(
      this.rwdService.isMediumScreen.subscribe(res => {
        this.isSmallScreen = res;
      })
    );
  }

  // public openSettingsDialog(): void {
  //   const dialogRef = this.dialog.open(AppSettingsComponent, {
  //     width: '300px'
  //   });
  //
  //   this.subscriptions.push(
  //     dialogRef.afterClosed().subscribe(result => {
  //       if (result && result.theme) {
  //         this.onSetTheme(result.theme);
  //       }
  //     })
  //   );
  // }

  // private onSetTheme(theme: MyTheme): void {
  //   this.themeService.currentTheme = theme;
  //   const effectiveTheme = theme.name;
  //   this.componentCssClass = effectiveTheme;
  //   const classList = this.overlayContainer.getContainerElement().classList;
  //   const toRemove = Array.from(classList).filter((item: string) =>
  //     item.includes('-theme')
  //   );
  //   if (toRemove.length) {
  //     classList.remove(...toRemove);
  //   }
  //   classList.add(effectiveTheme);
  // }

  public closeDrawer(drawer: MatSidenav): void {
    if (this.isSmallScreen) {
      drawer.close();
    }
  }


}
