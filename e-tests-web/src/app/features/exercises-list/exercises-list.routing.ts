import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExercisesListComponent} from './exercises-list.component';

const routes: Routes = [
  {
    path: '', component: ExercisesListComponent
  }
]as Routes;

export const exercisesListRouting: ModuleWithProviders = RouterModule.forChild(routes);
