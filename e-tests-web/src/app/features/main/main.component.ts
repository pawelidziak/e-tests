import {Component, HostBinding, OnInit, ViewChild} from '@angular/core';
import {RWDService} from '../../core/services/RWD.service';
import {CdkScrollable, OverlayContainer} from '@angular/cdk/overlay';
import {AppSettingsComponent} from '../app-settings/app-settings.component';
import {MatDialog} from '@angular/material';
import {routerTransition} from '../../shared/animations';
import {HeaderButtonType, HeaderService} from '../../core/services/header.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [routerTransition]

})
export class MainComponent implements OnInit {

  private readonly HEADER_TEXT = 'E-testo';
  public generalLinks = [
    {label: 'Search', path: '/', icon: 'search'},
    {label: 'Create', path: 'create', icon: 'add'},
  ];
  public privateLinks = [
    {label: 'Your tests', path: 'tests-list', icon: 'view_list'},
  ];
  public othersLinks = [
    {label: 'Contact', path: '/', icon: 'contact_support'},
    {label: 'Settings', path: '/', icon: 'settings'},
  ];

  @HostBinding('class') componentCssClass;
  @ViewChild(CdkScrollable) scrollable: CdkScrollable;
  public isSmallScreen = false;

  constructor(private rwdService: RWDService,
              public dialog: MatDialog,
              private headerService: HeaderService,
              public overlayContainer: OverlayContainer) {
  }

  ngOnInit() {
    // this.headerService.setHeaderButtonAndText(HeaderButtonType.MENU, this.HEADER_TEXT);
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
