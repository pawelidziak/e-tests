import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {ALL_ROUTES} from '@shared/routes';
import {AppSettingsService} from '@core/services';

@Component({
  selector: 'app-cookie-law',
  templateUrl: './cookie-law.component.html',
  styleUrls: ['./cookie-law.component.scss']
})
export class CookieLawComponent implements OnInit {

  public ALL_ROUTES = ALL_ROUTES;

  constructor(private snackBar: MatSnackBar,
              private appSettings: AppSettingsService) {
  }

  ngOnInit() {
  }

  public dismissSnackbar(): void {
    this.appSettings.acceptCookies();
    this.snackBar.dismiss();
  }
}
