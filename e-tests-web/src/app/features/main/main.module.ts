import {NgModule} from '@angular/core';
import {MainComponent} from './main.component';
import {SharedModule} from '../../shared/shared.module';
import {
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule, MatTooltipModule
} from '@angular/material';
import {AppSettingsComponent} from '../app-settings/app-settings.component';
import {AppSettingsModule} from '../app-settings/app-settings.module';
import {HeaderModule} from './header/header.module';
import {AuthComponent} from '../auth/auth.component';
import {AuthModule} from '../auth/auth.module';
import {ScrollDispatchModule} from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    SharedModule,
    HeaderModule,
    AppSettingsModule,
    AuthModule,

    ScrollDispatchModule,

    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatTooltipModule
  ],
  exports: [
    MainComponent
  ],
  providers: [],
  entryComponents: [AppSettingsComponent, AuthComponent]
})
export class MainModule {
}
