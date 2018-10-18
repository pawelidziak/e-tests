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
  warn: string;
}

export const MY_THEMES: Array<MyTheme> = [
  {
    name: 'indigo-theme',
    label: 'Indigo',
    primary: '#283593',
    accent: '#03a9f4',
    warn: '#f44336'
  },
  {
    name: 'teal-theme', label: 'Teal',
    primary: '#00695c',
    accent: '#ef6c00',
    warn: '#f44336'
  },
  {
    name: 'light-theme', label: 'Light',
    primary: '#f5f5f5',
    accent: '#43a047',
    warn: '#f44336'
  },
  {
    name: 'dark-theme', label: 'Dark',
    primary: '#616161',
    accent: '#43a047',
    warn: '#f44336'
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
