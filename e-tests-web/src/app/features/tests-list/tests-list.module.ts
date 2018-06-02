import {NgModule} from '@angular/core';
import {TestsListComponent} from './tests-list.component';
import {SharedModule} from '../../shared/shared.module';
import {testsListRouting} from './tests-list.routing';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatTableModule
} from '@angular/material';
import {CharLimitPipe} from '../../shared/pipes/char-limit.pipe';
import {FilterTestPipe} from '../../shared/pipes/filter-test.pipe';


@NgModule({
  declarations: [
    TestsListComponent,
    CharLimitPipe,
    FilterTestPipe
  ],
  imports: [
    SharedModule,
    testsListRouting,

    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatCardModule,
    MatTableModule
  ],
  exports: [],
  providers: []
})
export class TestsListModule {
}
