import {NgModule} from '@angular/core';
import {MatFormFieldModule, MatInputModule} from '@angular/material';
import {TestNameComponent} from './test-name.component';
import {SharedModule} from '../../../shared.module';

@NgModule({
  declarations: [TestNameComponent],
  imports: [
    SharedModule,

    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [TestNameComponent],
  providers: []
})
export class TestNameModule {
}
