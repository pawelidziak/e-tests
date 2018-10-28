import {NgModule} from '@angular/core';
import {testsSearchRouting} from './test-search.routing';
import {TestSearchComponent} from './test-search.component';
import {SharedModule} from '../../shared/shared.module';
import {TestsTableModule} from '../tests-table.component/tests-table.module';
import {MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule} from '@angular/material';
import {BoxListModule} from './box-list/box-list.module';


@NgModule({
  declarations: [
    TestSearchComponent
  ],
  imports: [
    SharedModule,
    testsSearchRouting,

    BoxListModule,
    TestsTableModule,

    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  exports: [],
  providers: []
})
export class TestSearchModule {
}
