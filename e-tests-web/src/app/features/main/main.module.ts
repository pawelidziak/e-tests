import {NgModule} from '@angular/core';
import {MainComponent} from './main.component';
import {SharedModule} from '../../shared/shared.module';
import {MatButtonModule, MatDialogModule, MatIconModule, MatSidenavModule} from '@angular/material';
import {HeaderModule} from '../header/header.module';
import {AppSettingsComponent} from '../app-settings/app-settings.component';
import {AppSettingsModule} from '../app-settings/app-settings.module';

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    SharedModule,
    HeaderModule,
    AppSettingsModule,

    MatDialogModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    MainComponent
  ],
  providers: [],
  entryComponents: [AppSettingsComponent]
})
export class MainModule {
}
