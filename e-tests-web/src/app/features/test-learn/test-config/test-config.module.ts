import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatDialogModule, MatFormFieldModule,
  MatIconModule,
  MatMenuModule,
  MatSelectModule,
  MatSliderModule
} from '@angular/material';
import {SharedModule} from '../../../shared/shared.module';
import {TestConfigComponent} from './test-config.component';

@NgModule({
  declarations: [
    TestConfigComponent
  ],
  imports: [
    SharedModule,

    MatSliderModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  exports: [
    TestConfigComponent
  ],
  providers: []
})
export class TestConfigModule {
}
