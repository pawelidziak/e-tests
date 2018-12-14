import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ImportExercisesComponent} from './import-exercises.component';

const routes: Routes = [
  {
    path: '', component: ImportExercisesComponent
  }
]as Routes;

export const importExercisesRouting: ModuleWithProviders = RouterModule.forChild(routes);
