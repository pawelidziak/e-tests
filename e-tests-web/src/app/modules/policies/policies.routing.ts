import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PoliciesComponent} from '@modules/policies/components/policies.component';

const routes: Routes = [
  {
    path: '', component: PoliciesComponent
  }
]as Routes;

export const policiesRouting: ModuleWithProviders = RouterModule.forChild(routes);
