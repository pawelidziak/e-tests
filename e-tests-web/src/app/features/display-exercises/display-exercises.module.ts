import {NgModule} from '@angular/core';
import {DisplayOneExerciseComponent} from './display-one-exercise/display-one-exercise.component';
import {DisplayExercisesComponent} from './display-exercises.component';
import {SharedModule} from '../../shared/shared.module';
import {
  MatButtonModule, MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatSnackBarModule,
  MatToolbarModule, MatTooltipModule
} from '@angular/material';
import {MyPipesModule} from '../../shared/pipes/my-pipes.module';

@NgModule({
  declarations: [
    DisplayExercisesComponent,
    DisplayOneExerciseComponent
  ],
  imports: [
    SharedModule,
    MyPipesModule,

    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatToolbarModule
  ],
  exports: [DisplayExercisesComponent],
  providers: []
})
export class DisplayExercisesModule {
}
