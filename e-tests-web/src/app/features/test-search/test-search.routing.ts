import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TestSearchComponent} from './test-search.component';

const routes: Routes = [
  {
    path: '', component: TestSearchComponent
  }
]as Routes;

export const testsSearchRouting: ModuleWithProviders = RouterModule.forChild(routes);
