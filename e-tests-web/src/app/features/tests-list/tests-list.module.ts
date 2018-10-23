import {NgModule} from '@angular/core';
import {TestsListComponent} from './tests-list.component';
import {SharedModule} from '../../shared/shared.module';
import {
  MatButtonModule,
  MatCardModule, MatChipsModule, MatFormFieldModule,
  MatIconModule, MatInputModule, MatPaginatorModule, MatSelectModule, MatSortModule,
  MatTableModule
} from '@angular/material';
import {MyPipesModule} from '../../shared/pipes/my-pipes.module';
import {SpinnerModule} from '../../shared/spinner/spinner.module';


@NgModule({
  declarations: [
    TestsListComponent
  ],
  imports: [
    SharedModule,
    MyPipesModule,
    SpinnerModule,

    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,

    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  exports: [
    TestsListComponent
  ],
  providers: []
})
export class TestsListModule {
}
