import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TestInfoComponent} from './components/test-info.component';

const routes: Routes = [
  {
    path: '', component: TestInfoComponent
  }
]as Routes;

export const testInfoRouting: ModuleWithProviders = RouterModule.forChild(routes);
