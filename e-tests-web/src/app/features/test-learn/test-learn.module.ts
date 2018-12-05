import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {TestLearnComponent} from './test-learn.component';
import {TestConfigModule} from './test-config/test-config.module';
import {ExerciseModule} from './exercise/exercise.module';
import {testLearnRouting} from './test-learn.routing';
import {
  MatButtonModule, MatCardModule,
  MatIconModule,
  MatProgressBarModule,
  MatTooltipModule
} from '@angular/material';
import {TestConfigComponent} from './test-config/test-config.component';
import {SkeletonLoadingModule} from '../../shared/components/skeleton-loading/skeleton-loading.module';

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
