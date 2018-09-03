import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {ExerciseListComponent} from './exercise-list.component';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatRadioModule
} from '@angular/material';
import {OneExerciseComponent} from './one-exercise/one-exercise.component';

@NgModule({
  declarations: [
    ExerciseListComponent,
    OneExerciseComponent
  ],
  imports: [
    SharedModule,

    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatListModule,
    MatCardModule
  ],
  exports: [
    ExerciseListComponent
  ],
  providers: []
})
export class ExerciseListModule {
}
