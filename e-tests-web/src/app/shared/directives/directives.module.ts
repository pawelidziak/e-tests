import {NgModule} from '@angular/core';
import {CompareValidatorDirective} from "./compare-validator.directive";
import {AutofocusDirective} from "./auto-focus.directive";

@NgModule({
  declarations: [
    CompareValidatorDirective,
    AutofocusDirective,
  ],
  imports: [],
  exports: [
    CompareValidatorDirective,
    AutofocusDirective
  ],
  providers: []
})
export class DirectivesModule {
}
