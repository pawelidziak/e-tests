import {NgModule} from '@angular/core';
import {TestsTableComponent} from './tests-table.component';
import {SharedModule} from '../../shared/shared.module';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';
import {MyPipesModule} from '../../shared/pipes/my-pipes.module';


@NgModule({
  declarations: [
    TestsTableComponent
  ],
  imports: [
    SharedModule,
    MyPipesModule,

    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,

    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    TestsTableComponent
  ],
  providers: []
})
export class TestsTableModule {
}
