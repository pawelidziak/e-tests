import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {DashboardComponent} from './dashboard.component';
import {dashboardRouting} from './dashboard.routing';
import {MatButtonModule, MatCardModule, MatIconModule, MatTabsModule} from '@angular/material';
import {OnePromoModule} from './one-promo/one-promo.module';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    SharedModule,
    dashboardRouting,

    OnePromoModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule
  ],
  exports: [],
  providers: []
})
export class DashboardModule {
}
