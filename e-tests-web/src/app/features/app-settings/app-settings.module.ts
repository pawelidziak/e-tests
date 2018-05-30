import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {AppSettingsComponent} from './app-settings.component';

@NgModule({
  declarations: [
    AppSettingsComponent
  ],
  imports: [
    SharedModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    AppSettingsComponent
  ],
  providers: []
})
export class AppSettingsModule {
}
