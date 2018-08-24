import {NgModule} from '@angular/core';
import {TestsListComponent} from './tests-list.component';
import {SharedModule} from '../../shared/shared.module';
import {testsListRouting} from './tests-list.routing';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule, MatChipsModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatProgressBarModule,
  MatTooltipModule
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

    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatProgressBarModule,
    MatTooltipModule
  ],
  exports: [],
  providers: []
})
export class TestsListModule {
}
