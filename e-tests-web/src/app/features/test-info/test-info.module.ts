import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {TestInfoComponent} from './test-info.component';
import {testInfoRouting} from './test-info.routing';
import {
  MatBottomSheetModule,
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatIconModule,
  MatTooltipModule
} from '@angular/material';
import {TestSettingsBottomSheetComponent} from './test-settings-bottom-sheet/test-settings-bottom-sheet.component';
import {DisplayExercisesModule} from '../display-exercises/display-exercises.module';

@NgModule({
  declarations: [
    TestInfoComponent,
    TestSettingsBottomSheetComponent,
  ],
  imports: [
    SharedModule,
    testInfoRouting,

    DisplayExercisesModule,

    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatTooltipModule,
    MatBottomSheetModule,
  ],
  exports: [],
  providers: [],
  entryComponents: [TestSettingsBottomSheetComponent]
})
export class TestInfoModule {
}
