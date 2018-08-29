import {Component, HostBinding, OnInit} from '@angular/core';
import {RWDService} from '../../core/services/RWD.service';
import {OverlayContainer} from '@angular/cdk/overlay';
import {AppSettingsComponent} from '../app-settings/app-settings.component';
import {MatDialog} from '@angular/material';
import {routerTransition} from '../../shared/animations';
import {ALL_ROUTES} from '../../app.routing';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [routerTransition]

})
export class MainComponent implements OnInit {

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
              public dialog: MatDialog,
              public overlayContainer: OverlayContainer) {
  }

  ngOnInit() {
    this.getRWDValue();
  }

  private getRWDValue(): void {
    const RWDsub$ = this.rwdService.isSmallScreen.subscribe(res => {
      this.isSmallScreen = res;
    });
  }

  public openSettingsDialog(): void {
    const dialogRef = this.dialog.open(AppSettingsComponent, {
      width: '300px'
    });

    const sub$ = dialogRef.afterClosed().subscribe(result => {
      if (result && result.theme) {
        this.onSetTheme(result.theme);
      }
    });
  }

  private onSetTheme(theme: string) {
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
