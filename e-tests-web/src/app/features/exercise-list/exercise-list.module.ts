import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {ExerciseListComponent} from './exercise-list.component';
import {ExerciseModule} from '../exercise/exercise.module';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatTabsModule,
} from '@angular/material';

@NgModule({
  declarations: [
    ExerciseListComponent
  ],
  imports: [
    SharedModule,
    ExerciseModule,

    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatMenuModule,
    MatSlideToggleModule

  ],
  exports: [
    ExerciseListComponent
  ],
  providers: []
})
export class ExerciseListModule {
}
