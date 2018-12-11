import {NgModule} from '@angular/core';
import {MatButtonModule, MatCardModule, MatIconModule} from '@angular/material';
import {OnePromoComponent} from './one-promo.component';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  declarations: [
    OnePromoComponent
  ],
  imports: [
    SharedModule,

    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    OnePromoComponent
  ],
  providers: []
})
export class OnePromoModule {
}
