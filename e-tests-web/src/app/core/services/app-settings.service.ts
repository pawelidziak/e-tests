import {Inject, Injectable} from '@angular/core';
import {LocalStorageService} from './local-storage.service';
import {TRANSLATIONS} from '../../shared/translations/translation';

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
  textColor: string;
}

/*
#5E5094
#3D73AE
#1C95CA
 */
export const MY_THEMES: Array<MyTheme> = [
  {
    name: 'blue-theme',
    label: 'blue',
    primary: '#304ffe',
    accent: '#05d5ff',
    warn: '#f44336',
    textColor: '#FAFAFA'
  },
  {
    name: 'green-theme',
    label: 'green',
    primary: '#2e7d32',
    accent: '#00c853',
    warn: '#f44336',
    textColor: '#FAFAFA'
  },
  {
    name: 'purple-theme',
    label: 'purple',
    primary: '#512da8',
    accent: '#7C4DFF',
    warn: '#f44336',
    textColor: '#FAFAFA'
  },
  {
    name: 'dark-theme',
    label: 'dark',
    primary: '#263238',
    accent: '#546e7a',
    warn: '#f44336',
    textColor: '#FAFAFA'
  }
];

@Injectable()
export class AppSettingsService {
  private readonly APP_SETTINGS_KEY = 'app-settings';

  private _currentTheme: MyTheme = MY_THEMES[0];
  private _currentSettings: AppSettings;
  private _currentLang: string = 'en';
  private _logoutAfterRefresh: boolean;

  constructor(@Inject(TRANSLATIONS) private _translations: any) {
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

  get currentLang(): string {
    return this._currentLang;
  }

  set currentLang(lang: string) {
    this._currentLang = lang;
    this._currentSettings = {
      language: this._currentLang,
      theme: this._currentSettings.theme
    };
    this.saveSettingsToLocalStorage();
  }

  get logoutAfterRefresh(): boolean {
    return this._logoutAfterRefresh;
  }

  set logoutAfterRefresh(value: boolean) {
    this._logoutAfterRefresh = value;
  }

  private assignSettings() {
    this._currentSettings = LocalStorageService.getObject(this.APP_SETTINGS_KEY);
    if (this._currentSettings) {
      this.currentTheme = MY_THEMES[MY_THEMES.findIndex(x => x.name === this._currentSettings.theme)];
      this.currentLang = this._currentSettings.language;
    }
    if (!this._currentSettings) {
      this._currentSettings = {
        language: this.currentLang,
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

  public translateText(key: any): any {
    if (this._translations[this.currentLang] && this._translations[this.currentLang][key]) {
      return this._translations[this.currentLang][key];
    }

    return key;
  }
}

export interface AppSettings {
  language: string;
  theme: string;
}
