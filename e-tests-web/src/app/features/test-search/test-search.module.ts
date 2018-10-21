import {NgModule} from '@angular/core';
import {testsSearchRouting} from './test-search.routing';
import {TestSearchComponent} from './test-search.component';
import {SharedModule} from '../../shared/shared.module';
import {TestsListModule} from '../tests-list/tests-list.module';
import {MatFormFieldModule, MatInputModule, MatSelectModule} from '@angular/material';


@NgModule({
  declarations: [
    TestSearchComponent
  ],
  imports: [
    SharedModule,
    testsSearchRouting,

    TestsListModule,

    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  exports: [],
  providers: []
})
export class TestSearchModule {
}
