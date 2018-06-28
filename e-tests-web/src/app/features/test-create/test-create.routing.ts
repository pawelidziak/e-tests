import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TestCreateComponent} from './test-create.component';
import {CanDeactivateGuard} from '../../core/can-deactivate-guard';

const routes: Routes = [
  {
    path: '', component: TestCreateComponent, canDeactivate: [CanDeactivateGuard]
  }
]as Routes;

export const testCreateRouting: ModuleWithProviders = RouterModule.forChild(routes);
