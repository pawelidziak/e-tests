import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

const appRoutes: Routes = [
  /**
   * Define lazy loading routes here
   */
  {
    path: 'test/:testId',
    loadChildren: 'app/features/test/test.module#TestModule'
  },
  {
    path: 'tests-list',
    loadChildren: 'app/features/tests-list/tests-list.module#TestsListModule'
  },
  // otherwise redirect to plan
  {path: '', redirectTo: 'tests-list', pathMatch: 'full'},
  {path: '**', redirectTo: 'tests-list'}
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
