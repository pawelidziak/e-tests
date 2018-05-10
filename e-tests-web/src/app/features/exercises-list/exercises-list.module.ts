import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {ExercisesListComponent} from './exercises-list.component';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatExpansionModule,
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
    MatExpansionModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatListModule,

    MatCardModule,
    MatDialogModule
  ],
  exports: [
    ExercisesListComponent
  ],
  providers: []
})
export class ExercisesListModule {
}
