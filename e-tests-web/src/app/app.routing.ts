import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

const appRoutes: Routes = [
  /**
   * Define lazy loading routes here
   */
  {
    path: 'test/:testId',
    loadChildren: 'app/features/test-learn/test-learn.module#TestLearnModule'
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
    loadChildren: 'app/features/exercises-list/exercises-list.module#ExercisesListModule'
  },
  // otherwise redirect to plan
  {path: '', redirectTo: 'tests-list', pathMatch: 'full'},
  {path: '**', redirectTo: 'tests-list'}
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
