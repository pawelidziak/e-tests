import {AfterViewInit, Component, HostBinding, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {RWDService} from '../../core/services/RWD.service';
import {CdkScrollable, OverlayContainer, ScrollDispatcher} from '@angular/cdk/overlay';
import {AppSettingsComponent} from '../app-settings/app-settings.component';
import {MatDialog, MatSidenav} from '@angular/material';
import {routeAnimations, slideFromRightAnimation} from '../../shared/animations';
import {ALL_ROUTES} from '../../shared/ROUTES';
import {ScrollService} from '../../core/services/scroll.service';
import {map} from 'rxjs/operators';
import {MyTheme, ThemeService} from '../../core/services/theme.service';
import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [routeAnimations, slideFromRightAnimation()]
})
export class MainComponent implements OnInit, OnDestroy, AfterViewInit {
  private subscriptions: any[] = [];
  @ViewChild(CdkScrollable) scrollable: CdkScrollable;
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

  constructor(private rwdService: RWDService,
              private auth: AuthService,
              private scrollService: ScrollService,
              private themeService: ThemeService,
              private zone: NgZone,
              private scroll: ScrollDispatcher,
              public dialog: MatDialog,
              public overlayContainer: OverlayContainer) {
  }

  ngOnInit() {
    this.getUser();
    this.getRWDValue();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  ngAfterViewInit() {
    this.subscriptions.push(
      this.scroll.scrolled()
        .pipe(map(() => {
          this.zone.run(() => this.scrollService.setScrollOffsetTop(this.scrollable.getElementRef().nativeElement.scrollTop));
        }))
        .subscribe()
    );
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

  public openSettingsDialog(): void {
    const dialogRef = this.dialog.open(AppSettingsComponent, {
      width: '300px'
    });

    this.subscriptions.push(
      dialogRef.afterClosed().subscribe(result => {
        if (result && result.theme) {
          this.onSetTheme(result.theme);
        }
      })
    );
  }

  private onSetTheme(theme: MyTheme): void {
    this.themeService.currentTheme = theme;
    const effectiveTheme = theme.name;
    this.componentCssClass = effectiveTheme;
    const classList = this.overlayContainer.getContainerElement().classList;
    const toRemove = Array.from(classList).filter((item: string) =>
      item.includes('-theme')
    );
    if (toRemove.length) {
      classList.remove(...toRemove);
    }
    classList.add(effectiveTheme);
  }

  public closeDrawer(drawer: MatSidenav): void {
    if (this.isSmallScreen) {
      drawer.close();
    }
  }

  public openAuthDialog(): void {
    this.auth.openAuthDialog(false);
  }

  public logout(): void {
    this.auth.signOut();
  }
}


