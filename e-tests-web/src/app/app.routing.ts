import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {AuthGuard} from './core/auth.guard';
import {ALL_ROUTES, ROUTE_PARAMS} from './shared/ROUTES';

const appRoutes: Routes = [
  /**
   * Define lazy loading routes here
   */
  {
    path: ALL_ROUTES.DASHBOARD,
    loadChildren: 'app/features/dashboard/dashboard.module#DashboardModule'
  },
  {
    path: ALL_ROUTES.APP_SETTINGS,
    loadChildren: 'app/features/app-settings/app-settings.module#AppSettingsModule'
  },
  {
    path: `${ALL_ROUTES.CREATED_TEST}/:${ROUTE_PARAMS.TEST_ID}/${ALL_ROUTES.TEST_LEARN}`,
    loadChildren: 'app/features/test-learn/test-learn.module#TestLearnModule'
  },
  {
    path: ALL_ROUTES.CREATE_TEST,
    loadChildren: 'app/features/test-create/test-create.module#TestCreateModule'
  },
  // {
  //   path: ALL_ROUTES.USER_TESTS_LIST,
  //   loadChildren: 'app/features/tests-table/tests-table.module#TestsTableModule',
  //   canActivate: [AuthGuard]
  // },
  {
    path: ALL_ROUTES.SEARCH,
    loadChildren: 'app/features/test-search/test-search.module#TestSearchModule'
  },
  {
    path: `${ALL_ROUTES.CREATED_TEST}/:${ROUTE_PARAMS.TEST_ID}`,
    loadChildren: 'app/features/test-info/test-info.module#TestInfoModule'
  },
  {
    path: `${ALL_ROUTES.USER_TESTS_LIST}`,
    loadChildren: 'app/features/user-tests/user-tests.module#UserTestsModule',
    canActivate: [AuthGuard]
  },
  {
    path: `${ALL_ROUTES.CREATED_TEST}/:${ROUTE_PARAMS.TEST_ID}/${ALL_ROUTES.IMPORT_EXERCISES}`,
    loadChildren: 'app/features/import-exercises/import-exercises.module#ImportExercisesModule'
  },
  // otherwise redirect to dashboard
  {path: '', redirectTo: ALL_ROUTES.DASHBOARD, pathMatch: 'full'},
  {path: '**', redirectTo: ALL_ROUTES.DASHBOARD}
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes, {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  preloadingStrategy: PreloadAllModules
});
