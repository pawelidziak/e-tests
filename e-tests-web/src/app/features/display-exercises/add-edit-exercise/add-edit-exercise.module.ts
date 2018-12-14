import {NgModule} from '@angular/core';
import {AddEditExerciseComponent} from './add-edit-exercise.component';
import {SharedModule} from '../../../shared/shared.module';
import {
  MatButtonModule, MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatTooltipModule
} from '@angular/material';
import {DisplayOneExerciseModule} from '../display-one-exercise/display-one-exercise.module';

@NgModule({
  declarations: [
    AddEditExerciseComponent
  ],
  imports: [
    SharedModule,
    DisplayOneExerciseModule,

    MatDialogModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule
  ],
  exports: [],
  providers: [],
})
export class AddEditExerciseModule {
}
