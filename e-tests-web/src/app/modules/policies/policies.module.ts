import {NgModule} from '@angular/core';
import {SharedModule} from '@shared/shared.module';
import {PoliciesComponent} from './components/policies.component';
import {policiesRouting} from './policies.routing';
import {MatCardModule, MatExpansionModule} from '@angular/material';

@NgModule({
  declarations: [
    PoliciesComponent
  ],
  imports: [
    SharedModule,
    policiesRouting,

    MatCardModule,
    MatExpansionModule
  ],
  exports: [],
  providers: []
})
export class PoliciesModule {
}
