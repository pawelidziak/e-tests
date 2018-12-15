import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppSettingsComponent} from './components/app-settings/app-settings.component';

const routes: Routes = [
  {
    path: '', component: AppSettingsComponent
  }
]as Routes;

export const appSettingsRouting: ModuleWithProviders = RouterModule.forChild(routes);
