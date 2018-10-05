import {NgModule} from '@angular/core';
import {MatButtonModule, MatIconModule, MatSliderModule} from '@angular/material';
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
    MatIconModule,
  ],
  exports: [
    TestConfigComponent
  ],
  providers: []
})
export class TestConfigModule {
}
