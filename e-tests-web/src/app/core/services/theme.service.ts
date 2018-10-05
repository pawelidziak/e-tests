import {Injectable} from '@angular/core';

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
    primary: '#61616',
    accent: '#43a047',
    warn: '#f44336'
  }
];

@Injectable()
export class ThemeService {
  private _currentTheme: MyTheme = MY_THEMES[2];

  constructor() {
  }

  get currentTheme(): MyTheme {
    return this._currentTheme;
  }

  set currentTheme(value: MyTheme) {
    this._currentTheme = value;
  }
}
