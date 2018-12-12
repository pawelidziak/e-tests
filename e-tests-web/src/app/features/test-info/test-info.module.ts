import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {TestInfoComponent} from './test-info.component';
import {testInfoRouting} from './test-info.routing';
import {
  MatBottomSheetModule,
  MatButtonModule,
  MatCardModule,
  MatTooltipModule,
  MatIconModule, MatListModule,
  MatTabsModule, MatSnackBarModule
} from '@angular/material';
import {TestSettingsBottomSheetComponent} from './test-settings-bottom-sheet/test-settings-bottom-sheet.component';
import {DisplayExercisesModule} from '../display-exercises/display-exercises.module';
import {TestTagsModule} from '../../shared/components/test-create-edit-parts/test-tags/test-tags.module';
import {TestNameModule} from '../../shared/components/test-create-edit-parts/test-name/test-name.module';
import {TestDescModule} from '../../shared/components/test-create-edit-parts/test-desc/test-desc.module';

@NgModule({
  declarations: [
    TestInfoComponent,
    TestSettingsBottomSheetComponent,
  ],
  imports: [
    SharedModule,
    testInfoRouting,
    DisplayExercisesModule,

    TestNameModule,
    TestTagsModule,
    TestDescModule,

    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule,
    MatBottomSheetModule,
    MatTabsModule,
    MatSnackBarModule
  ],
  exports: [],
  providers: [],
  entryComponents: [TestSettingsBottomSheetComponent]
})
export class TestInfoModule {
}
