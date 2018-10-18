import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ServiceWorkerModule} from '@angular/service-worker';
import {AppComponent} from './app.component';
import {environment} from '../environments/environment';

import {SpinnerModule} from './shared/spinner/spinner.module';
import {CoreModule} from './core/core.module';
import {appRouting} from './app.routing';
import {
  MatCheckboxModule, MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatListModule,
  MatSelectModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import {AppHeaderModule} from './features/app-header/app-header.module';
import {PageHeaderModule} from './shared/page-header/page-header.module';
import {AuthModule} from './features/auth/auth.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    CoreModule,
    appRouting,
    SpinnerModule,

    // przeniesc do MAIN COMPONENT
    AuthModule,
    AppHeaderModule,
    PageHeaderModule,

    MatSelectModule,

    MatSidenavModule,
    MatListModule,
    MatIconModule,


    MatToolbarModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
