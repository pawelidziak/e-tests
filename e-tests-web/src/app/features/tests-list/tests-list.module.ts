import {NgModule} from '@angular/core';
import {TestsListComponent} from './tests-list.component';
import {SharedModule} from '../../shared/shared.module';
import {testsListRouting} from './tests-list.routing';
import {
  MatButtonModule,
  MatCardModule, MatChipsModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule
} from '@angular/material';
import {MyPipesModule} from '../../shared/pipes/my-pipes.module';


@NgModule({
  declarations: [
    TestsListComponent
  ],
  imports: [
    SharedModule,
    testsListRouting,
    MyPipesModule,

    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule
  ],
  exports: [],
  providers: []
})
export class TestsListModule {
}
