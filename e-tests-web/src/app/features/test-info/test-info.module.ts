import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {TestInfoComponent} from './test-info.component';
import {testInfoRouting} from './test-info.routing';
import {
  MatBottomSheetModule, MatButtonModule,
  MatCardModule, MatChipsModule,
  MatExpansionModule, MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatSelectModule, MatTooltipModule
} from '@angular/material';
import {TestSettingsBottomSheetComponent} from './test-settings-bottom-sheet/test-settings-bottom-sheet.component';
import {ExerciseListModule} from '../test-detail/exercise-list/exercise-list.module';
import {DisplayExercisesComponent} from './display-exercises/display-exercises.component';
import {MyPipesModule} from '../../shared/pipes/my-pipes.module';

@NgModule({
  declarations: [
    TestInfoComponent,
    TestSettingsBottomSheetComponent,
    DisplayExercisesComponent,
  ],
  imports: [
    SharedModule,
    testInfoRouting,
    ExerciseListModule,
    MyPipesModule,

    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatTooltipModule,
    MatBottomSheetModule,

    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatExpansionModule
  ],
  exports: [],
  providers: [],
  entryComponents: [TestSettingsBottomSheetComponent]
})
export class TestInfoModule {
}
