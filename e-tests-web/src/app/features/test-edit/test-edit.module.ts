import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {TestEditComponent} from './test-edit.component';
import {testEditRouting} from './test-edit.routing';
import {TestDetailModule} from '../test-detail/test-detail.module';

@NgModule({
  declarations: [
    TestEditComponent
  ],
  imports: [
    SharedModule,
    testEditRouting,
    TestDetailModule
  ],
  exports: [
    TestEditComponent
  ],
  providers: []
})
export class TestEditModule {
}
