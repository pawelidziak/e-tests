import {NgModule} from '@angular/core';
import {SharedModule} from '@shared/shared.module';
import {TestConfigComponent} from './test-config.component';
import {A11yModule} from '@angular/cdk/a11y';
import {
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatSliderModule
} from '@angular/material';

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
