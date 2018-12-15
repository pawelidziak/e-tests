import {NgModule} from '@angular/core';
import {DisplayExercisesComponent} from './components/display-exercises.component';
import {SharedModule} from '@shared/shared.module';
import {MyPipesModule} from '@shared/pipes/my-pipes.module';
import {DisplayOneExerciseModule} from './components/display-one-exercise/display-one-exercise.module';
import {AddEditExerciseComponent} from './components/add-edit-exercise/add-edit-exercise.component';
import {AddEditExerciseModule} from './components/add-edit-exercise/add-edit-exercise.module';
import {
  MatButtonModule, MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatTooltipModule
} from '@angular/material';

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
  providers: [],
  entryComponents: [AddEditExerciseComponent]
})
export class DisplayExercisesModule {
}
