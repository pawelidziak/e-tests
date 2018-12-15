import {NgModule} from '@angular/core';
import {SharedModule} from '@shared/shared.module';
import {testInfoRouting} from './test-info.routing';
import {TestInfoComponent} from './components/test-info.component';
import {TestSettingsBottomSheetComponent} from './components/test-settings-bottom-sheet/test-settings-bottom-sheet.component';
import {DisplayExercisesModule} from '../display-exercises/display-exercises.module';
import {TestDescModule, TestNameModule, TestTagsModule} from '@shared/components/test-create-edit-parts';
import {
  MatBottomSheetModule,
  MatButtonModule,
  MatCardModule,
  MatTooltipModule,
  MatIconModule, MatListModule,
  MatTabsModule, MatSnackBarModule
} from '@angular/material';

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
