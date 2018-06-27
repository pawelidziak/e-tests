import {NgModule} from '@angular/core';
import {MainComponent} from './main.component';
import {SharedModule} from '../../shared/shared.module';
import {
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import {TopBarModule} from './top-bar/top-bar.module';
import {AppSettingsComponent} from '../app-settings/app-settings.component';
import {AppSettingsModule} from '../app-settings/app-settings.module';
import {HeaderModule} from './header/header.module';
import {ScrollDispatchModule} from '@angular/cdk/scrolling';
import {AuthComponent} from '../auth/auth.component';
import {AuthModule} from '../auth/auth.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    SharedModule,
    TopBarModule,
    HeaderModule,
    AppSettingsModule,
    AuthModule,

    MatDialogModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule,
    ScrollDispatchModule,

    MatListModule,
    MatToolbarModule
  ],
  exports: [
    MainComponent
  ],
  providers: [],
  entryComponents: [AppSettingsComponent, AuthComponent]
})
export class MainModule {
}
