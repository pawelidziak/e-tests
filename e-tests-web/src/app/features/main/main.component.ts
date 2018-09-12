import {AfterViewInit, Component, HostBinding, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {RWDService} from '../../core/services/RWD.service';
import {CdkScrollable, OverlayContainer, ScrollDispatcher} from '@angular/cdk/overlay';
import {AppSettingsComponent} from '../app-settings/app-settings.component';
import {MatDialog} from '@angular/material';
import {routerTransition} from '../../shared/animations';
import {ALL_ROUTES} from '../../shared/ROUTES';
import {ScrollService} from '../../core/services/scroll.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [routerTransition]
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

  constructor(private rwdService: RWDService,
              private scrollService: ScrollService,
              private zone: NgZone,
              private scroll: ScrollDispatcher,
              public dialog: MatDialog,
              public overlayContainer: OverlayContainer) {
  }

  ngOnInit() {
    this.getRWDValue();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  ngAfterViewInit() {
    this.subscriptions.push(
      this.scroll.scrolled()
        .pipe(map(() => {
          this.zone.run(() => this.scrollService.setScrollPosition(this.scrollable.getElementRef().nativeElement.scrollTop));
        }))
        .subscribe()
    );
  }

  private getRWDValue(): void {
    this.subscriptions.push(
      this.rwdService.isSmallScreen.subscribe(res => {
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

  private onSetTheme(theme: string): void {
    const effectiveTheme = theme;
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

}


