import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {testCreateRouting} from './test-create.routing';
import {TestCreateComponent} from './test-create.component';
import {MatButtonModule, MatCardModule} from '@angular/material';
import {TestCreateEditPartsModule} from '../../shared/components/test-create-edit-parts/test-create-edit-parts.module';

@NgModule({
  declarations: [
    TestCreateComponent
  ],
  imports: [
    SharedModule,
    testCreateRouting,

    TestCreateEditPartsModule,

    MatCardModule,
    MatButtonModule
  ],
  exports: [],
  providers: []
})
export class TestCreateModule {
}
