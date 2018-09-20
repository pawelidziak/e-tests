import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {ExerciseComponent} from './exercise.component';
import {MatButtonModule, MatButtonToggleModule, MatCardModule, MatIconModule} from '@angular/material';

@NgModule({
  declarations: [
    ExerciseComponent
  ],
  imports: [
    SharedModule,

    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule
  ],
  exports: [
    ExerciseComponent
  ],
  providers: []
})
export class ExerciseModule {
}
