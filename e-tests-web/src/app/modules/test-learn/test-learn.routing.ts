import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TestLearnComponent} from './components/test-learn.component';

const routes: Routes = [
  {
    path: '', component: TestLearnComponent
  }
]as Routes;

export const testLearnRouting: ModuleWithProviders = RouterModule.forChild(routes);
