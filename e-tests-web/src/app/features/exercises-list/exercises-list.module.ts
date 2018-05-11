import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {ExercisesListComponent} from './exercises-list.component';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatRadioModule,
} from '@angular/material';
import {exercisesListRouting} from './exercises-list.routing';

@NgModule({
  declarations: [
    ExercisesListComponent
  ],
  imports: [
    SharedModule,
    exercisesListRouting,

    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatListModule
  ],
  exports: [
    ExercisesListComponent
  ],
  providers: []
})
export class ExercisesListModule {
}
