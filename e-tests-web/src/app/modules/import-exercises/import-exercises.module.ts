import {NgModule} from '@angular/core';
import {ImportExercisesComponent} from './components/import-exercises.component';
import {MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatMenuModule} from '@angular/material';
import {DisplayOneExerciseModule} from '../display-exercises/components/display-one-exercise/display-one-exercise.module';
import {importExercisesRouting} from './import-exercises.routing';
import {SharedModule} from '@shared/shared.module';
import {SpinnerModule} from '@shared/components';
import {DirectivesModule} from '@shared/directives/directives.module';
import {AddEditExerciseModule} from '@modules/display-exercises/components/add-edit-exercise/add-edit-exercise.module';
import {AddEditExerciseComponent} from '@modules/display-exercises/components/add-edit-exercise/add-edit-exercise.component';


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
  providers: [],
  entryComponents: [AddEditExerciseComponent]
})
export class ImportExercisesModule {
}
