import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {HeaderComponent} from './header.component';
import {MatButtonModule, MatIconModule, MatMenuModule, MatToolbarModule} from '@angular/material';

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
