import {NgModule} from '@angular/core';
import {PageHeaderComponent} from './page-header.component';
import {SharedModule} from '../../shared.module';
import {MatButtonModule, MatIconModule,} from '@angular/material';
import {MyPipesModule} from "../../pipes/my-pipes.module";

@NgModule({
  declarations: [PageHeaderComponent],
  imports: [
    SharedModule,
    MyPipesModule,

    MatButtonModule,
    MatIconModule
  ],
  exports: [PageHeaderComponent],
  providers: []
})
export class PageHeaderModule {
}
