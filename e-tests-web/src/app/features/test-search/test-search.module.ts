import {NgModule} from '@angular/core';
import {testsSearchRouting} from './test-search.routing';
import {TestSearchComponent} from './test-search.component';
import {SharedModule} from '../../shared/shared.module';
import {TestsTableModule} from '../tests-table.component/tests-table.module';

@NgModule({
  declarations: [
    TestSearchComponent
  ],
  imports: [
    SharedModule,
    testsSearchRouting,

    TestsTableModule,
  ],
  exports: [],
  providers: []
})
export class TestSearchModule {
}
