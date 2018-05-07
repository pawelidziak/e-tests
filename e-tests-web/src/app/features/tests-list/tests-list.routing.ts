import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TestsListComponent} from './tests-list.component';

const routes: Routes = [
  {
    path: '', component: TestsListComponent
  }
]as Routes;

export const testsListRouting: ModuleWithProviders = RouterModule.forChild(routes);
