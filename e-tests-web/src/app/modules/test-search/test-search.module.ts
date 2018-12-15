import {NgModule} from '@angular/core';
import {testsSearchRouting} from './test-search.routing';
import {TestSearchComponent} from './components/test-search.component';
import {SharedModule} from '@shared/shared.module';
import {TestsTableModule, TestsBoxesModule} from '@shared/components';
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
