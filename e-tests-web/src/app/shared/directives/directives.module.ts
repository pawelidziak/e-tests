import {NgModule} from '@angular/core';
import {CompareValidatorDirective} from './compare-validator.directive';
import {AutofocusDirective} from './auto-focus.directive';
import { DropZoneDirective } from './drop-zone.directive';

@NgModule({
  declarations: [
    CompareValidatorDirective,
    AutofocusDirective,
    DropZoneDirective,
  ],
  imports: [],
  exports: [
    CompareValidatorDirective,
    AutofocusDirective,
    DropZoneDirective
  ],
  providers: []
})
export class DirectivesModule {
}
