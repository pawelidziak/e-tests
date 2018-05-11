import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {TestLearnComponent} from './test-learn.component';
import {TestConfigModule} from './test-config/test-config.module';
import {ExerciseModule} from './exercise/exercise.module';
import {testLearnRouting} from './test-learn.routing';
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
    TestLearnComponent
  ],
  imports: [
    SharedModule,
    testLearnRouting,
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

  ],
  providers: []
})
export class TestLearnModule {
}
