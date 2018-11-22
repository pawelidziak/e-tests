import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AboutComponent} from "./about.component";

const routes: Routes = [
  {
    path: '', component: AboutComponent
  }
]as Routes;

export const aboutRouting: ModuleWithProviders = RouterModule.forChild(routes);
