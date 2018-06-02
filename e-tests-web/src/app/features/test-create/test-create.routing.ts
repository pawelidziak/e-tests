import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TestCreateComponent} from './test-create.component';

const routes: Routes = [
  {
    path: '', component: TestCreateComponent
  }
]as Routes;

export const testCreateRouting: ModuleWithProviders = RouterModule.forChild(routes);
