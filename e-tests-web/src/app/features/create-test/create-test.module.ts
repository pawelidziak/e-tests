import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {CreateTestComponent} from './create-test.component';
import {createTestRouting} from './create-test.routing';
import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatStepperModule
} from '@angular/material';
import {ExerciseListModule} from '../exercise-list/exercise-list.module';
import {SectionsModule} from './sections/sections.module';

@NgModule({
  declarations: [
    CreateTestComponent
  ],
  imports: [
    SharedModule,
    createTestRouting,
    ExerciseListModule,
    SectionsModule,

    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatStepperModule
  ],
  exports: [],
  providers: []
})
export class CreateTestModule {
}
