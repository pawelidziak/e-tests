import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ServiceWorkerModule} from '@angular/service-worker';
import {AppComponent} from './app.component';
import {environment} from '../environments/environment';

import {SpinnerModule} from './shared/components/spinner/spinner.module';
import {CoreModule} from './core/core.module';
import {appRouting} from './app.routing';
import {MatButtonModule, MatCardModule, MatIconModule} from '@angular/material';
import {AppHeaderModule} from './features/app-header/app-header.module';
import {PageHeaderModule} from './shared/components/page-header/page-header.module';
import {AuthModule} from './features/auth/auth.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppFooterModule} from "./features/app-footer/app-footer.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    CoreModule,
    appRouting,
    SpinnerModule,

    // stworzyc i przeniesc do MAIN COMPONENT
    AuthModule,
    AppHeaderModule,
    PageHeaderModule,
    AppFooterModule,

    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
