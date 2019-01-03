import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthGuard, CanDeactivateGuard, throwIfAlreadyLoaded} from './guards';
import {Overlay} from '@angular/cdk/overlay';
import {HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import {GestureConfig} from '@angular/material';
import {TRANSLATION_PROVIDERS} from '@shared/translations';
import {FirebaseModule} from '@core/firebase.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FirebaseModule
  ],
  exports: [],
  providers: [
    AuthGuard,
    CanDeactivateGuard,
    {provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig},
    Overlay, // needed for angular ckd
    TRANSLATION_PROVIDERS
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
