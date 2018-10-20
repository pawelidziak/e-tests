import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {TestInfoComponent} from './test-info.component';
import {testInfoRouting} from './test-info.routing';
import {
  MatBottomSheetModule,
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatIconModule, MatTabsModule,
  MatTooltipModule
} from '@angular/material';
import {TestSettingsBottomSheetComponent} from './test-settings-bottom-sheet/test-settings-bottom-sheet.component';
import {DisplayExercisesModule} from '../display-exercises/display-exercises.module';
import {SpinnerModule} from '../../shared/spinner/spinner.module';
import {TestTagsModule} from '../../shared/test-create-edit-parts/test-tags/test-tags.module';
import {TestNameModule} from '../../shared/test-create-edit-parts/test-name/test-name.module';
import {TestDescModule} from '../../shared/test-create-edit-parts/test-desc/test-desc.module';

@NgModule({
  declarations: [
    TestInfoComponent,
    TestSettingsBottomSheetComponent,
  ],
  imports: [
    SharedModule,
    testInfoRouting,
    SpinnerModule,
    DisplayExercisesModule,

    TestNameModule,
    TestTagsModule,
    TestDescModule,

    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatTooltipModule,
    MatBottomSheetModule,
    MatTabsModule
  ],
  exports: [],
  providers: [],
  entryComponents: [TestSettingsBottomSheetComponent]
})
export class TestInfoModule {
}
