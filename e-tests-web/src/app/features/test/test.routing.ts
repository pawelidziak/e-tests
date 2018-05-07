import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TestComponent} from './test.component';

const routes: Routes = [
  {
    path: '', component: TestComponent
  }
]as Routes;

export const testRouting: ModuleWithProviders = RouterModule.forChild(routes);
