import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {testCreateRouting} from './test-create.routing';
import {TestCreateComponent} from './test-create.component';
import {TestDetailModule} from '../test-detail/test-detail.module';

@NgModule({
  declarations: [
    TestCreateComponent
  ],
  imports: [
    SharedModule,
    testCreateRouting,
    TestDetailModule
  ],
  exports: [],
  providers: []
})
export class TestCreateModule {
}
