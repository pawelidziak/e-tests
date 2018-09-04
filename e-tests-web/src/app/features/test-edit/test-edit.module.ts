import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {TestEditComponent} from './test-edit.component';
import {testEditRouting} from './test-edit.routing';
import {
  MatButtonModule,
  MatCardModule, MatExpansionModule,
  MatToolbarModule
} from '@angular/material';
import {TestNameModule} from '../../shared/test-create-edit-parts/test-name/test-name.module';
import {TestTagsModule} from '../../shared/test-create-edit-parts/test-tags/test-tags.module';
import {TestDescModule} from '../../shared/test-create-edit-parts/test-desc/test-desc.module';

@NgModule({
  declarations: [
    TestEditComponent
  ],
  imports: [
    SharedModule,
    testEditRouting,

    TestNameModule,
    TestTagsModule,
    TestDescModule,

    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule
  ],
  exports: [
  ],
  providers: []
})
export class TestEditModule {
}
