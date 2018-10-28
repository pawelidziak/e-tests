import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {BoxListComponent} from './box-list.component';
import {MyPipesModule} from '../../../shared/pipes/my-pipes.module';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSelectModule
} from '@angular/material';
import { BoxItemComponent } from './box-item/box-item.component';


@NgModule({
  declarations: [
    BoxListComponent,
    BoxItemComponent
  ],
  imports: [
    SharedModule,
    MyPipesModule,

    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  exports: [
    BoxListComponent
  ],
  providers: []
})
export class BoxListModule {
}
