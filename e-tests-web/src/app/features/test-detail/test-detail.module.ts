import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {TestDetailComponent} from './test-detail.component';
import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatStepperModule, MatToolbarModule
} from '@angular/material';
import {ExerciseListModule} from './exercise-list/exercise-list.module';

@NgModule({
  declarations: [
    TestDetailComponent
  ],
  imports: [
    SharedModule,
    ExerciseListModule,

    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatStepperModule,
    MatToolbarModule
  ],
  exports: [
    TestDetailComponent
  ],
  providers: []
})
export class TestDetailModule {
}
