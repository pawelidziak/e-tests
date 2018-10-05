import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {TestLearnComponent} from './test-learn.component';
import {TestConfigModule} from './test-config/test-config.module';
import {ExerciseModule} from './exercise/exercise.module';
import {testLearnRouting} from './test-learn.routing';
import {
  MatButtonModule,
  MatIconModule,
  MatProgressBarModule,
  MatSidenavModule,
  MatTooltipModule
} from '@angular/material';
import {StickyHideToolbarModule} from '../../shared/sticky-hide-toolbar/sticky-hide-toolbar.module';

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
    MatProgressBarModule,
    MatSidenavModule
  ],
  exports: [],
  providers: []
})
export class TestLearnModule {
}
