import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {ExerciseListComponent} from './test.component';
import {TestConfigModule} from './test-config/test-config.module';
import {ExerciseModule} from './exercise/exercise.module';
import {
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatProgressBarModule,
  MatSlideToggleModule,
  MatTabsModule,
} from '@angular/material';

@NgModule({
  declarations: [
    ExerciseListComponent
  ],
  imports: [
    SharedModule,
    TestConfigModule,
    ExerciseModule,

    MatTabsModule,
    MatButtonModule,
    MatIconModule,
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
