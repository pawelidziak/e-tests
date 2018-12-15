import {NgModule} from '@angular/core';
import {SharedModule} from '@shared/shared.module';
import {TestLearnComponent} from './components/test-learn.component';
import {TestConfigModule} from './components/test-config/test-config.module';
import {ExerciseModule} from './components/exercise/exercise.module';
import {testLearnRouting} from './test-learn.routing';
import {TestConfigComponent} from './components/test-config/test-config.component';
import {SkeletonLoadingModule} from '@shared/components';
import {
  MatButtonModule, MatCardModule,
  MatIconModule,
  MatProgressBarModule,
  MatTooltipModule
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
    SkeletonLoadingModule,

    MatCardModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule
  ],
  exports: [],
  providers: [],
  entryComponents: [TestConfigComponent]
})
export class TestLearnModule {
}
