import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

const appRoutes: Routes = [
  /**
   * Define lazy loading routes here
   */
  {
    path: 'login',
    loadChildren: 'app/features/login/login.module#LoginModule'
  },
  {
    path: 'test/:testId',
    loadChildren: 'app/features/test-learn/test-learn.module#TestLearnModule'
  },
  {
    path: 'create',
    loadChildren: 'app/features/test-create/test-create.module#TestCreateModule'
  },
  {
    path: 'tests-list',
    loadChildren: 'app/features/tests-list/tests-list.module#TestsListModule'
  },
  {
    path: 'test-info/:testId',
    loadChildren: 'app/features/test-info/test-info.module#TestInfoModule'
  },
  {
    path: 'test/:testId/exercises',
    loadChildren: 'app/features/test-edit/test-edit.module#TestEditModule'
  },
  // otherwise redirect to plan
  {path: '', redirectTo: 'tests-list', pathMatch: 'full'},
  {path: '**', redirectTo: 'tests-list'}
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
