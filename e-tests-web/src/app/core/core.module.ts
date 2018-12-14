import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {throwIfAlreadyLoaded} from './module-import-guard';
import {Overlay} from '@angular/cdk/overlay';
import {HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import {GestureConfig} from '@angular/material';
import {HeaderService} from './services/header.service';
import {RWDService} from './services/RWD.service';
import {CacheService} from './services/cache.service';
import {FirebaseModule} from './firebase.module';
import {AuthService} from './services/auth.service';
import {CanDeactivateGuard} from './can-deactivate-guard';
import {TestService} from './services/test.service';
import {LoaderService} from './services/loader.service';
import {AuthGuard} from './auth.guard';
import {AppSettingsService} from './services/app-settings.service';
import {TRANSLATION_PROVIDERS} from '../shared/translations/translation';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FirebaseModule
  ],
  exports: [],
  providers: [
    AuthService,
    AuthGuard,
    {provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig},
    Overlay, // needed for angular ckd
    LoaderService,
    AppSettingsService,
    RWDService,
    CanDeactivateGuard,
    CacheService,
    HeaderService,
    TestService,
    TRANSLATION_PROVIDERS
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
