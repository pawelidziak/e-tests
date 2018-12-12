import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {DashboardComponent} from './dashboard.component';
import {dashboardRouting} from './dashboard.routing';
import {MatButtonModule, MatCardModule, MatIconModule} from '@angular/material';
import {OneFeatureModule} from './one-feature/one-feature.module';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    SharedModule,
    dashboardRouting,

    OneFeatureModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [],
  providers: []
})
export class DashboardModule {
}
