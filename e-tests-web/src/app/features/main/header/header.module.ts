import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {MatButtonModule, MatIconModule, MatMenuModule, MatToolbarModule} from '@angular/material';
import {HeaderComponent} from './header.component';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    SharedModule,

    MatToolbarModule,
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
