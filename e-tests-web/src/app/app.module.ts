import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ServiceWorkerModule} from '@angular/service-worker';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app.routing';
import {CoreModule} from '@core/core.module';
import {LoaderService} from '@core/services';
import {SpinnerModule} from '@shared/components';
import {environment} from '@env/environment';
import {MainModule} from '@modules/main/main.module';
import {MatButtonModule} from '@angular/material';

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
    MainModule,
    MatButtonModule
  ],
  providers: [LoaderService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
