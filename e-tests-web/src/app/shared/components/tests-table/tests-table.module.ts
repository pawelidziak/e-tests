import {NgModule} from '@angular/core';
import {TestsTableComponent} from './tests-table.component';
import {SharedModule} from '../../shared.module';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule, MatTooltipModule
} from '@angular/material';
import {MyPipesModule} from '../../pipes/my-pipes.module';


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
    MatInputModule,
    MatTooltipModule
  ],
  exports: [
    TestsTableComponent
  ],
  providers: []
})
export class TestsTableModule {
}
