import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {SectionsComponent} from './sections.component';

@NgModule({
  declarations: [
    SectionsComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    SectionsComponent
  ],
  providers: []
})
export class SectionsModule {
}
