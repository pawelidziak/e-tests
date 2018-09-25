import {NgModule} from '@angular/core';
import {StickyHideToolbarComponent} from './sticky-hide-toolbar.component';
import {SharedModule} from '../shared.module';
import {MatToolbarModule} from '@angular/material';


@NgModule({
  declarations: [StickyHideToolbarComponent],
  imports: [
    SharedModule,

    MatToolbarModule
  ],
  exports: [StickyHideToolbarComponent],
  providers: []
})
export class StickyHideToolbarModule {
}
