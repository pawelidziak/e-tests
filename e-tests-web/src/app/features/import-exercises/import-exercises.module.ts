import {NgModule} from '@angular/core';
import {ImportExercisesComponent} from './import-exercises.component';
import {SharedModule} from '../../shared/shared.module';
import {
  MatButtonModule, MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatMenuModule, MatSelectModule,
} from '@angular/material';
import {DisplayOneExerciseModule} from '../display-exercises/display-one-exercise/display-one-exercise.module';
import {importExercisesRouting} from './import-exercises.routing';
import {SpinnerModule} from '../../shared/components/spinner/spinner.module';
import {ImportExportExercisesService} from '../../core/services/import-export-exercises.service';
import {AddEditExerciseComponent} from '../display-exercises/add-edit-exercise/add-edit-exercise.component';
import {AddEditExerciseModule} from '../display-exercises/add-edit-exercise/add-edit-exercise.module';
import {DirectivesModule} from '../../shared/directives/directives.module';

@NgModule({
  declarations: [
    ImportExercisesComponent
  ],
  imports: [
    SharedModule,
    MatDialogModule,
    importExercisesRouting,
    DirectivesModule,
    SpinnerModule,
    DisplayOneExerciseModule,
    AddEditExerciseModule,

    MatSelectModule,
    MatMenuModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule
  ],
  exports: [],
  providers: [ImportExportExercisesService],
  entryComponents: [AddEditExerciseComponent]
})
export class ImportExercisesModule {
}
