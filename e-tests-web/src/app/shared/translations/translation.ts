import {InjectionToken} from '@angular/core';
// import translations
import { LANG_EN_NAME, LANG_EN_TRANS } from './lang-en';
import { LANG_PL_NAME, LANG_PL_TRANS } from './lang-pl';

// translation token
export const TRANSLATIONS = new InjectionToken('translations');

// all translations
export const dictionary = {
  [LANG_EN_NAME]: LANG_EN_TRANS,
  [LANG_PL_NAME]: LANG_PL_TRANS,
};

// providers
export const TRANSLATION_PROVIDERS = [
  { provide: TRANSLATIONS, useValue: dictionary },
];
