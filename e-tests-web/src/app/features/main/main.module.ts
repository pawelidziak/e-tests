import {NgModule} from '@angular/core';
import {MainComponent} from './main.component';
import {SharedModule} from '../../shared/shared.module';
import {MatButtonModule, MatDialogModule, MatIconModule, MatSidenavModule} from '@angular/material';
import {TopBarModule} from './top-bar/top-bar.module';
import {AppSettingsComponent} from '../app-settings/app-settings.component';
import {AppSettingsModule} from '../app-settings/app-settings.module';
import {HeaderModule} from './header/header.module';
import {ScrollDispatchModule} from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    SharedModule,
    TopBarModule,
    HeaderModule,
    AppSettingsModule,

    MatDialogModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,

    ScrollDispatchModule
  ],
  exports: [
    MainComponent
  ],
  providers: [],
  entryComponents: [AppSettingsComponent]
})
export class MainModule {
}
