import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {MatButtonModule, MatCardModule, MatDividerModule, MatIconModule, MatMenuModule} from '@angular/material';
import {AppHeaderComponent} from './app-header.component';

@NgModule({
  declarations: [
    AppHeaderComponent
  ],
  imports: [
    SharedModule,

    MatCardModule,
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
