import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {MatButtonModule, MatDividerModule, MatIconModule, MatMenuModule, MatToolbarModule} from '@angular/material';
import {AppHeaderComponent} from './app-header.component';

@NgModule({
  declarations: [
    AppHeaderComponent
  ],
  imports: [
    SharedModule,

    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule
  ],
  exports: [
    AppHeaderComponent
  ],
  providers: []
})
export class AppHeaderModule {
}
