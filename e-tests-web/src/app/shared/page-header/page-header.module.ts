import {NgModule} from '@angular/core';
import {PageHeaderComponent} from './page-header.component';
import {SharedModule} from '../shared.module';
import {MatButtonModule, MatIconModule, MatToolbarModule} from '@angular/material';

@NgModule({
  declarations: [PageHeaderComponent],
  imports: [
    SharedModule,

    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [PageHeaderComponent],
  providers: []
})
export class PageHeaderModule {
}
