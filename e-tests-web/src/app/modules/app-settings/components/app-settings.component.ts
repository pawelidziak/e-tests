import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {HeaderService, AppSettingsService, MY_THEMES, MyTheme} from '../../../core/services/index';

@Component({
  selector: 'app-app-settings',
  templateUrl: './app-settings.component.html',
  styleUrls: ['./app-settings.component.scss']
})
export class AppSettingsComponent implements OnInit {
  public themes = MY_THEMES;
  public languages = ['en', 'pl'];

  constructor(public appSettings: AppSettingsService,
              private headerService: HeaderService,
              @Inject(LOCALE_ID) public locale: string) {
  }

  ngOnInit(): void {
    this.headerService.setCurrentRoute([
      {label: 'settings-title', path: ''}
    ]);
  }

  public changeTheme(theme: MyTheme): void {
    this.appSettings.currentTheme = theme;
  }

  public changeLanguage(lang: string): void {
    this.appSettings.currentLang = lang;
  }

}
