import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ServiceWorkerModule} from '@angular/service-worker';
import {AppComponent} from './app.component';
import {environment} from '../environments/environment';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app.routing';
import {CoreModule} from './core/core.module';
import {SpinnerModule} from './shared/components/spinner/spinner.module';
import {MainModule} from './features/main/main.module';
import {LoaderService} from './core/services/loader.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // angular
    BrowserAnimationsModule,
    BrowserModule,

    // pwa
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),

    // core
    CoreModule,

    // routing
    AppRoutingModule,

    SpinnerModule,
    MainModule
  ],
  providers: [LoaderService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
