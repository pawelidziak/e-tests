import {NgModule} from '@angular/core';
import {TestDescModule} from './test-desc/test-desc.module';
import {TestCreateDateModule} from './test-create-date/test-create-date.module';
import {TestNameModule} from './test-name/test-name.module';
import {TestTagsModule} from './test-tags/test-tags.module';
import {TestVisibilityModule} from './test-visibility/test-visibility.module';

@NgModule({
  declarations: [],
  imports: [
    TestNameModule,
    TestTagsModule,
    TestDescModule,
    TestCreateDateModule,
    TestVisibilityModule
  ],
  exports: [
    TestNameModule,
    TestTagsModule,
    TestDescModule,
    TestCreateDateModule,
    TestVisibilityModule
  ],
  providers: []
})
export class TestCreateEditPartsModule {
}
