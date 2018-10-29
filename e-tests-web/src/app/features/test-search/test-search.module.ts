import {NgModule} from '@angular/core';
import {testsSearchRouting} from './test-search.routing';
import {TestSearchComponent} from './test-search.component';
import {SharedModule} from '../../shared/shared.module';
import {TestsTableModule} from '../../shared/components/tests-table/tests-table.module';
import {TestsBoxesModule} from '../../shared/components/tests-boxes/tests-boxes.module';
import {MatButtonModule, MatIconModule} from '@angular/material';

@NgModule({
  declarations: [
    TestSearchComponent
  ],
  imports: [
    SharedModule,
    testsSearchRouting,

    TestsTableModule,
    TestsBoxesModule,

    MatButtonModule,
    MatIconModule
  ],
  exports: [],
  providers: []
})
export class TestSearchModule {
}
