import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {MatButtonModule, MatFormFieldModule, MatIconModule, MatSelectModule} from '@angular/material';
import {AppSettingsComponent} from './app-settings.component';

@NgModule({
  declarations: [
    AppSettingsComponent
  ],
  imports: [
    SharedModule,
    MatSelectModule,
    MatFormFieldModule,
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
