import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthGuard} from '@core/guards';

const appRoutes: Routes = [
  /**
   * Define lazy loading routes here
   */
  // MAIN / DASHBOARD
  {
    path: '',
    loadChildren: '../app/modules/dashboard/dashboard.module#DashboardModule'
  },
  // APP SETTINGS
  {
    // path: ALL_ROUTES.APP_SETTINGS,
    path: 'settings',
    loadChildren: '../app/modules/app-settings/app-settings.module#AppSettingsModule'
  },
  // TEST LEARN
  {
    // path: `${ALL_ROUTES.CREATED_TEST}/:${ROUTE_PARAMS.TEST_ID}/${ALL_ROUTES.TEST_LEARN}`,
    path: 'test/:testId/learn',
    loadChildren: '../app/modules/test-learn/test-learn.module#TestLearnModule'
  },
  // CREATE TEST
  {
    // path: ALL_ROUTES.CREATE_TEST,
    path: 'create',
    loadChildren: '../app/modules/test-create/test-create.module#TestCreateModule'
  },
  // TEST SEARCH
  {
    // path: ALL_ROUTES.SEARCH,
    path: 'search',
    loadChildren: '../app/modules/test-search/test-search.module#TestSearchModule'
  },
  // TEST INFO
  {
    // path: `${ALL_ROUTES.CREATED_TEST}/:${ROUTE_PARAMS.TEST_ID}`,
    path: 'test/:testId',
    loadChildren: '../app/modules/test-info/test-info.module#TestInfoModule'
  },
  // USER STUDY SETS
  {
    // path: `${ALL_ROUTES.USER_TESTS_LIST}`,
    path: 'saved',
    loadChildren: '../app/modules/user-tests/user-tests.module#UserTestsModule',
    canActivate: [AuthGuard]
  },
  // IMPORT EXERCISES
  {
    // path: `${ALL_ROUTES.CREATED_TEST}/:${ROUTE_PARAMS.TEST_ID}/${ALL_ROUTES.IMPORT_EXERCISES}`,
    path: 'test/:testId/import',
    loadChildren: '../app/modules/import-exercises/import-exercises.module#ImportExercisesModule'
  },
  // ABOUT APP
  {
    // path: `${ALL_ROUTES.ABOUT}`,
    path: 'about',
    loadChildren: '../app/modules/about/about.module#AboutModule'
  },
  // USER PROFILE
  {
    // path: `${ALL_ROUTES.USER_PROFILE}`,
    path: 'profile',
    loadChildren: '../app/modules/user-profile/user-profile.module#UserProfileModule',
    canActivate: [AuthGuard]
  },
  // otherwise redirect to ''
  {path: '**', redirectTo: ''}
];

@NgModule({
  // useHash supports github.io demo page, remove in your app
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
