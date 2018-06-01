import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {TestEditComponent} from './test-edit.component';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
} from '@angular/material';
import {testEditRouting} from './test-edit.routing';
import {ExerciseListModule} from '../exercise-list/exercise-list.module';

@NgModule({
  declarations: [
    TestEditComponent
  ],
  imports: [
    SharedModule,
    testEditRouting,
    ExerciseListModule,

    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatListModule
  ],
  exports: [
    TestEditComponent
  ],
  providers: []
})
export class TestEditModule {
}
