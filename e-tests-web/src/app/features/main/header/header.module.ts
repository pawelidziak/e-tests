import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {MatButtonModule, MatIconModule, MatMenuModule} from '@angular/material';
import {HeaderComponent} from './header.component';
import {StickyHideToolbarModule} from '../../../shared/sticky-hide-toolbar/sticky-hide-toolbar.module';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    SharedModule,

    StickyHideToolbarModule,

    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ],
  exports: [
    HeaderComponent
  ],
  providers: []
})
export class HeaderModule {
}
