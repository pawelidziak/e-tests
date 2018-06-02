import {Component, HostBinding, OnInit, ViewChild} from '@angular/core';
import {RWDService} from '../../core/services/RWD.service';
import {CdkScrollable, OverlayContainer} from '@angular/cdk/overlay';
import {AppSettingsComponent} from '../app-settings/app-settings.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  @HostBinding('class') componentCssClass;
  @ViewChild(CdkScrollable) scrollable: CdkScrollable;
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


  public openDialog(): void {
    const dialogRef = this.dialog.open(AppSettingsComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.theme) {
        this.onSetTheme(result.theme);
      }
    });
  }

  private onSetTheme(theme: string) {
    this.overlayContainer.getContainerElement().classList.add(theme);
    this.componentCssClass = theme;
  }
}
