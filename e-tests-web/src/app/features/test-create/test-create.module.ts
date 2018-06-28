import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {testCreateRouting} from './test-create.routing';
import {TestCreateComponent} from './test-create.component';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';
import {CategoriesModule} from '../test-detail/categories/categories.module';

@NgModule({
  declarations: [
    TestCreateComponent
  ],
  imports: [
    SharedModule,
    testCreateRouting,

    CategoriesModule,

    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule

  ],
  exports: [],
  providers: []
})
export class TestCreateModule {
}
