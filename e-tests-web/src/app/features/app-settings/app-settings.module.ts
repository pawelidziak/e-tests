import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {MatButtonModule, MatCardModule, MatIconModule, MatMenuModule} from '@angular/material';
import {AppSettingsComponent} from './app-settings.component';
import {appSettingsRouting} from './app-settings.routing';

@NgModule({
  declarations: [
    AppSettingsComponent
  ],
  imports: [
    SharedModule,
    appSettingsRouting,

    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ],
  providers: []
})
export class AppSettingsModule {
}
