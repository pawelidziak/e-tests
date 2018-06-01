import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TestEditComponent} from './test-edit.component';

const routes: Routes = [
  {
    path: '', component: TestEditComponent
  }
]as Routes;

export const testEditRouting: ModuleWithProviders = RouterModule.forChild(routes);
