import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthGuard} from '@core/guards';
import {ALL_ROUTES, ROUTE_PARAMS} from '@shared/routes';

const appRoutes: Routes = [
  // MAIN
  {
    path: '',
    loadChildren: './modules/dashboard/dashboard.module#DashboardModule'
  },
  // ABOUT APP
  {
    path: ALL_ROUTES.ABOUT,
    loadChildren: './modules/about/about.module#AboutModule'
  },
  // APP SETTINGS
  {
    path: ALL_ROUTES.APP_SETTINGS,
    loadChildren: './modules/app-settings/app-settings.module#AppSettingsModule'
  },
  // APP DOWNLOAD
  {
    path: ALL_ROUTES.DOWNLOAD,
    loadChildren: './modules/app-download/app-download.module#AppDownloadModule'
  },
  // TEST LEARN
  {
    path: `${ALL_ROUTES.CREATED_TEST}/:${ROUTE_PARAMS.TEST_ID}/${ALL_ROUTES.TEST_LEARN}`,
    loadChildren: './modules/test-learn/test-learn.module#TestLearnModule'
  },
  // CREATE TEST
  {
    path: ALL_ROUTES.CREATE_TEST,
    loadChildren: './modules/test-create/test-create.module#TestCreateModule'
  },
  // TEST SEARCH
  {
    path: ALL_ROUTES.SEARCH,
    loadChildren: './modules/test-search/test-search.module#TestSearchModule'
  },
  // TEST INFO
  {
    path: `${ALL_ROUTES.CREATED_TEST}/:${ROUTE_PARAMS.TEST_ID}`,
    loadChildren: './modules/test-info/test-info.module#TestInfoModule'
  },
  // USER STUDY SETS
  {
    path: ALL_ROUTES.USER_TESTS_LIST,
    loadChildren: './modules/user-tests/user-tests.module#UserTestsModule',
    canActivate: [AuthGuard]
  },
  // IMPORT EXERCISES
  {
    path: `${ALL_ROUTES.CREATED_TEST}/:${ROUTE_PARAMS.TEST_ID}/${ALL_ROUTES.IMPORT_EXERCISES}`,
    loadChildren: './modules/import-exercises/import-exercises.module#ImportExercisesModule'
  },
  // USER PROFILE
  {
    path: `${ALL_ROUTES.USER_PROFILE}`,
    loadChildren: './modules/user-profile/user-profile.module#UserProfileModule',
    canActivate: [AuthGuard]
  },
  // POLICIES
  {
    path: `${ALL_ROUTES.POLICIES}`,
    loadChildren: './modules/policies/policies.module#PoliciesModule'
  },
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
