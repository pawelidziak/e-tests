import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {TestComponent} from './test.component';
import {TestConfigModule} from './test-config/test-config.module';
import {ExerciseModule} from './exercise/exercise.module';
import {testRouting} from './test.routing';
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
    TestComponent
  ],
  imports: [
    SharedModule,
    testRouting,
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
export class TestModule {
}
