import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatSliderModule
} from '@angular/material';
import {SharedModule} from '../../../shared/shared.module';
import {TestConfigComponent} from './test-config.component';
import {A11yModule} from "@angular/cdk/a11y";

@NgModule({
  declarations: [
    TestConfigComponent
  ],
  imports: [
    SharedModule,

    MatSliderModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    A11yModule
  ],
  exports: [],
  providers: []
})
export class TestConfigModule {
}
