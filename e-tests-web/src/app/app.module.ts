import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ServiceWorkerModule} from '@angular/service-worker';
import {AppComponent} from './app.component';
import {environment} from '../environments/environment';

import {SpinnerModule} from './shared/spinner/spinner.module';
import {MainModule} from './features/main/main.module';
import {CoreModule} from './core/core.module';
import {appRouting} from './app.routing';

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
    MainModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
