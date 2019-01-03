import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppDownloadComponent} from './components/app-download.component';

const routes: Routes = [
  {
    path: '', component: AppDownloadComponent
  }
]as Routes;

export const appDownloadRouting: ModuleWithProviders = RouterModule.forChild(routes);
