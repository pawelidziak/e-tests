import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {TestLearnComponent} from './test-learn.component';
import {TestConfigModule} from './test-config/test-config.module';
import {ExerciseModule} from './exercise/exercise.module';
import {testLearnRouting} from './test-learn.routing';
import {
  MatButtonModule, MatCardModule,
  MatIconModule,
  MatMenuModule,
  MatProgressBarModule, MatProgressSpinnerModule, MatSidenavModule,
  MatSlideToggleModule,
  MatTabsModule, MatToolbarModule, MatTooltipModule,
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
    MatTooltipModule,
    MatCardModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule
  ],
  exports: [

  ],
  providers: []
})
export class TestLearnModule {
}
