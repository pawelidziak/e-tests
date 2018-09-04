import {NgModule} from '@angular/core';
import {MatFormFieldModule, MatInputModule} from '@angular/material';
import {SharedModule} from '../../shared.module';
import {TestDescComponent} from './test-desc.component';

@NgModule({
  declarations: [TestDescComponent],
  imports: [
    SharedModule,

    MatFormFieldModule,
    MatInputModule
  ],
  exports: [TestDescComponent],
  providers: []
})
export class TestDescModule {
}
