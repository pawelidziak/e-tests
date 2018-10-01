import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {TestLearnComponent} from './test-learn.component';
import {TestConfigModule} from './test-config/test-config.module';
import {ExerciseModule} from './exercise/exercise.module';
import {testLearnRouting} from './test-learn.routing';
import {MatButtonModule, MatIconModule, MatProgressBarModule, MatTooltipModule} from '@angular/material';
import {StickyHideToolbarModule} from '../../shared/sticky-hide-toolbar/sticky-hide-toolbar.module';
import {TestConfigComponent} from './test-config/test-config.component';

@NgModule({
  declarations: [
    TestLearnComponent
  ],
  imports: [
    SharedModule,
    testLearnRouting,
    TestConfigModule,
    ExerciseModule,

    StickyHideToolbarModule,

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
