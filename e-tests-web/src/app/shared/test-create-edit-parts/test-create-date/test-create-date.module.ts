import {NgModule} from '@angular/core';
import {MatFormFieldModule, MatInputModule} from '@angular/material';
import {SharedModule} from '../../shared.module';
import {TestCreateDateComponent} from './test-create-date.component';

@NgModule({
  declarations: [TestCreateDateComponent],
  imports: [
    SharedModule,

    MatFormFieldModule,
    MatInputModule
  ],
  exports: [TestCreateDateComponent],
  providers: []
})
export class TestCreateDateModule {
}
