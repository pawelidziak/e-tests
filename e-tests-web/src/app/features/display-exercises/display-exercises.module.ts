import {NgModule} from '@angular/core';
import {DisplayExercisesComponent} from './display-exercises.component';
import {SharedModule} from '../../shared/shared.module';
import {
  MatButtonModule, MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatTooltipModule
} from '@angular/material';
import {MyPipesModule} from '../../shared/pipes/my-pipes.module';
import {DisplayOneExerciseModule} from './display-one-exercise/display-one-exercise.module';
import {ImportExportExercisesService} from '../../core/services/import-export-exercises.service';
import {AddEditExerciseComponent} from './add-edit-exercise/add-edit-exercise.component';
import {AddEditExerciseModule} from './add-edit-exercise/add-edit-exercise.module';

@NgModule({
  declarations: [
    DisplayExercisesComponent
  ],
  imports: [
    SharedModule,
    MyPipesModule,
    DisplayOneExerciseModule,
    AddEditExerciseModule,

    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  exports: [DisplayExercisesComponent],
  providers: [ImportExportExercisesService],
  entryComponents: [AddEditExerciseComponent]
})
export class DisplayExercisesModule {
}
