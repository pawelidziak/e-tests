import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {JwtInterceptor} from './jwt.interceptor';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {throwIfAlreadyLoaded} from './module-import-guard';
import {TestService} from './services/test.service';
import {TestListService} from './services/test-list.service';
import {Overlay} from '@angular/cdk/overlay';
import {HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import {GestureConfig} from '@angular/material';
import {HeaderService} from './services/header.service';
import {RWDService} from './services/RWD.service';
import {CacheService} from './services/cache.service';
import {FirebaseModule} from './firebase.module';
import {AuthService} from './services/auth.service';
import {CanDeactivateGuard} from './can-deactivate-guard';
import {NewTestService} from './services/NewTest.service';
import {LoaderService} from './services/loader.service';
import {AuthGuard} from './auth.guard';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FirebaseModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  exports: [],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig},

    LoaderService,
    Overlay, // needed for angular ckd
    RWDService,
    CanDeactivateGuard,
    CacheService,
    HeaderService,
    TestListService,
    TestService,
    NewTestService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
