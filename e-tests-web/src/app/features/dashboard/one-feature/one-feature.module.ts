import {NgModule} from '@angular/core';
import {MatCardModule, MatIconModule} from '@angular/material';
import {OneFeatureComponent} from './one-feature.component';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  declarations: [
    OneFeatureComponent
  ],
  imports: [
    SharedModule,

    MatCardModule,
    MatIconModule
  ],
  exports: [
    OneFeatureComponent
  ],
  providers: []
})
export class OneFeatureModule {
}
