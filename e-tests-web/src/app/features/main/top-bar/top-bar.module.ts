import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {TopBarComponent} from './top-bar.component';
import {MatButtonModule, MatIconModule, MatMenuModule, MatToolbarModule} from '@angular/material';

@NgModule({
  declarations: [
    TopBarComponent
  ],
  imports: [
    SharedModule,

    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ],
  exports: [
    TopBarComponent
  ],
  providers: [],
})
export class TopBarModule {
}
