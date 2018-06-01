import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateTestComponent} from './create-test.component';

const routes: Routes = [
  {
    path: '', component: CreateTestComponent
  }
]as Routes;

export const createTestRouting: ModuleWithProviders = RouterModule.forChild(routes);
