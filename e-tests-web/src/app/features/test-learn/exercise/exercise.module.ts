import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {ExerciseComponent} from './exercise.component';
import {MatButtonModule, MatIconModule} from '@angular/material';

@NgModule({
  declarations: [
    ExerciseComponent
  ],
  imports: [
    SharedModule,

    MatButtonModule,
    MatIconModule
  ],
  exports: [
    ExerciseComponent
  ],
  providers: []
})
export class ExerciseModule {
}
