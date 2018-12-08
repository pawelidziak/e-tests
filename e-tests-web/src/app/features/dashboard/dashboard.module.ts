import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {DashboardComponent} from './dashboard.component';
import {dashboardRouting} from './dashboard.routing';
import {MatCardModule, MatIconModule, MatTabsModule} from '@angular/material';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    SharedModule,
    dashboardRouting,

    MatCardModule,
    MatIconModule,
    MatTabsModule
  ],
  exports: [],
  providers: []
})
export class DashboardModule {
}
