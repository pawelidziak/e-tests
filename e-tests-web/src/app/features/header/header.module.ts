import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {HeaderComponent} from './header.component';
import {MatButtonModule, MatIconModule, MatToolbarModule} from '@angular/material';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    SharedModule,

    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    HeaderComponent
  ],
  providers: []
})
export class HeaderModule {
}
