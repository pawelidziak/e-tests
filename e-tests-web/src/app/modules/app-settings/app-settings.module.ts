import {NgModule} from '@angular/core';
import {SharedModule} from '@shared/shared.module';
import {AppSettingsComponent} from './components/app-settings.component';
import {appSettingsRouting} from './app-settings.routing';
import {MatButtonModule, MatCardModule, MatIconModule, MatMenuModule} from '@angular/material';

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
