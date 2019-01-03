import {NgModule} from '@angular/core';
import {SharedModule} from '@shared/shared.module';
import {DashboardComponent} from './components/dashboard.component';
import {dashboardRouting} from './dashboard.routing';
import {OneFeatureComponent} from './components/one-feature/one-feature.component';
import {MatButtonModule, MatCardModule, MatIconModule} from '@angular/material';
import {SkeletonLoadingModule} from '@shared/components';

@NgModule({
  declarations: [
    DashboardComponent,
    OneFeatureComponent
  ],
  imports: [
    SharedModule,
    dashboardRouting,

    MatCardModule,
    MatButtonModule,
    MatIconModule,
    SkeletonLoadingModule
  ],
  exports: [],
  providers: []
})
export class DashboardModule {
}
