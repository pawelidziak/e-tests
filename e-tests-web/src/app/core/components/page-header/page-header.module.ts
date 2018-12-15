import {NgModule} from '@angular/core';
import {PageHeaderComponent} from './components/page-header.component';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {SharedModule} from '@shared/shared.module';
import {MyPipesModule} from '@shared/pipes/my-pipes.module';

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
