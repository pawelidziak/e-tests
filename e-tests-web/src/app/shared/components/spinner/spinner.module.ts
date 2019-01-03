import {NgModule} from '@angular/core';
import {SpinnerComponent} from './spinner.component';
import {SharedModule} from '../../shared.module';

@NgModule({
  declarations: [
    SpinnerComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    SpinnerComponent
  ],
  providers: []
})
export class SpinnerModule {
}
