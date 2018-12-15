import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserProfileComponent} from './components/user-profile.component';

const routes: Routes = [
  {
    path: '', component: UserProfileComponent
  }
]as Routes;

export const userProfileRouting: ModuleWithProviders = RouterModule.forChild(routes);
