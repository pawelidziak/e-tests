import {Component, HostBinding, OnInit} from '@angular/core';
import {RWDService} from '../../core/services/RWD.service';
import {OverlayContainer} from '@angular/cdk/overlay';
import {AppSettingsComponent} from '../app-settings/app-settings.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  @HostBinding('class') componentCssClass;
  public isSmallScreen = false;

  constructor(private rwdService: RWDService,
              public dialog: MatDialog,
              public overlayContainer: OverlayContainer) {
    this.rwdService.isSmallScreen.subscribe(res => {
      this.isSmallScreen = res;
    });

  }

  ngOnInit() {
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(AppSettingsComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.theme) {
        this.onSetTheme(result.theme);
      }
    });
  }

  private onSetTheme(theme) {
    this.overlayContainer.getContainerElement().classList.add(theme);
    this.componentCssClass = theme;
  }
}
