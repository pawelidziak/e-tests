import {Injectable} from '@angular/core';
import {LocalStorageService} from './local-storage.service';

export const MY_COLORS = {
  MATERIAL_GREEN: '#8BC34A',
  MATERIAL_RED: '#F44336'
};

export interface MyTheme {
  name: string;
  label: string;
  primary: string;
  accent: string;
  accentSecond: string;
  warn: string;
  textColor: string;
}
/*
#5E5094
#3D73AE
#1C95CA
 */
export const MY_THEMES: Array<MyTheme> = [
  {
    name: 'indigo-theme',
    label: 'Blue',
    primary: '#304ffe',
    accent: '#039be5',
    accentSecond: '#a6ffcb',
    warn: '#f44336',
    textColor: '#FAFAFA'
  },
  {
    name: 'light-theme', label: 'Light',
    primary: '#f5f5f5',
    accent: '#dcedc8',
    accentSecond: '#a6ffcb',
    warn: '#f44336',
    textColor: '#000'
  },
  {
    name: 'dark-theme', label: 'Dark',
    primary: '#455a64',
    accent: '#263238',
    accentSecond: '#546e7a',
    warn: '#f44336',
    textColor: '#FAFAFA'
  }
];

@Injectable()
export class AppSettingsService {
  private readonly APP_SETTINGS_KEY = 'app-settings';

  private _currentTheme: MyTheme = MY_THEMES[0];
  private _currentSettings: AppSettings;

  constructor() {
    this.assignSettings();
  }

  get currentTheme(): MyTheme {
    return this._currentTheme;
  }

  set currentTheme(value: MyTheme) {
    this._currentTheme = value;
    this._currentSettings = {
      language: this._currentSettings.language,
      theme: value.name
    };
    this.saveSettingsToLocalStorage();
    this.applyTheme();
  }


  private assignSettings() {
    this._currentSettings = LocalStorageService.getObject(this.APP_SETTINGS_KEY);
    if (this._currentSettings) {
      this.currentTheme = MY_THEMES[MY_THEMES.findIndex(x => x.name === this._currentSettings.theme)];
    }
    if (!this._currentSettings) {
      this._currentSettings = {
        language: 'ENG',
        theme: this.currentTheme.name
      };
    }
    this.applyTheme();
  }

  private saveSettingsToLocalStorage(): void {
    LocalStorageService.setObject(this.APP_SETTINGS_KEY, this._currentSettings);
  }

  private applyTheme(): void {
    const classList = document.getElementById('themeTag').classList;
    const toRemove = Array.from(classList).filter((item: string) =>
      item.includes('-theme')
    );
    if (toRemove.length) {
      classList.remove(...toRemove);
    }
    classList.add(this._currentSettings.theme);
  }
}

export interface AppSettings {
  language: string;
  theme: string;
}
