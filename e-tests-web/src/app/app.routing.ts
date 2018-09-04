import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {AuthGuard} from './core/auth.guard';

export const ALL_ROUTES = {
  DASHBOARD: 'dashboard',
  SEARCH: 'search',
  CREATE_TEST: 'create',
  CREATED_TEST: 'test',
  EDIT_TEST: 'edit',
  USER_TESTS_LIST: 'tests-list'
};

const appRoutes: Routes = [
  /**
   * Define lazy loading routes here
   */
  {
    path: ALL_ROUTES.DASHBOARD,
    loadChildren: 'app/features/dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'test1/:testId',
    loadChildren: 'app/features/test-learn/test-learn.module#TestLearnModule'
  },
  {
    path: ALL_ROUTES.CREATE_TEST,
    loadChildren: 'app/features/test-create/test-create.module#TestCreateModule'
  },
  {
    path: ALL_ROUTES.USER_TESTS_LIST,
    loadChildren: 'app/features/tests-list/tests-list.module#TestsListModule',
    canActivate: [AuthGuard]
  },
  {
    path: `${ALL_ROUTES.CREATED_TEST}/:testId`,
    loadChildren: 'app/features/test-info/test-info.module#TestInfoModule'
  },
  {
    path: `${ALL_ROUTES.CREATED_TEST}/:testId/${ALL_ROUTES.EDIT_TEST}`,
    loadChildren: 'app/features/test-edit/test-edit.module#TestEditModule'
  },
  // otherwise redirect to dashboard
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: '**', redirectTo: 'dashboard'}
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
