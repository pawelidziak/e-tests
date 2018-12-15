import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserTestsComponent} from './components/user-tests.component';

const routes: Routes = [
  {
    path: '', component: UserTestsComponent
  }
]as Routes;

export const userTestsRouting: ModuleWithProviders = RouterModule.forChild(routes);
