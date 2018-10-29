import {NgModule} from '@angular/core';
import {MatCheckboxModule, MatFormFieldModule, MatInputModule, MatTooltipModule} from '@angular/material';
import {SharedModule} from '../../../shared.module';
import {TestVisibilityComponent} from './test-visibility.component';

@NgModule({
  declarations: [TestVisibilityComponent],
  imports: [
    SharedModule,

    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatCheckboxModule
  ],
  exports: [TestVisibilityComponent],
  providers: []
})
export class TestVisibilityModule {
}
