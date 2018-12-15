import {NgModule} from '@angular/core';
import {SharedModule} from '@shared/shared.module';
import {AppHeaderComponent} from './components/app-header.component';
import {MatButtonModule, MatCardModule, MatDividerModule, MatIconModule, MatMenuModule} from '@angular/material';

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
