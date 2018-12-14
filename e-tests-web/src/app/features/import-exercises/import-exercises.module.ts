import {NgModule} from '@angular/core';
import {ImportExercisesComponent} from './import-exercises.component';
import {MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatMenuModule} from '@angular/material';
import {DisplayOneExerciseModule} from '../display-exercises/display-one-exercise/display-one-exercise.module';
import {importExercisesRouting} from './import-exercises.routing';
import {AddEditExerciseComponent} from '../display-exercises/add-edit-exercise/add-edit-exercise.component';
import {AddEditExerciseModule} from '../display-exercises/add-edit-exercise/add-edit-exercise.module';
import {SharedModule} from '../../shared/shared.module';
import {SpinnerModule} from '../../shared/components/spinner/spinner.module';
import {DirectivesModule} from '../../shared/directives/directives.module';
import {ImportExportExercisesService} from '../../core/services/import-export-exercises.service';


@NgModule({
  declarations: [
    ImportExercisesComponent
  ],
  imports: [
    SharedModule,
    importExercisesRouting,
    DirectivesModule,
    SpinnerModule,
    DisplayOneExerciseModule,
    AddEditExerciseModule,

    MatMenuModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [],
  providers: [ImportExportExercisesService],
  entryComponents: [AddEditExerciseComponent]
})
export class ImportExercisesModule {
}
