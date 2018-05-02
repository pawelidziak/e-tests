import {NgModule} from '@angular/core';
import {MainComponent} from './main.component';
import {SharedModule} from '../../shared/shared.module';
import {MatSidenavModule} from '@angular/material';
import {HeaderModule} from '../header/header.module';

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    SharedModule,
    HeaderModule,

    MatSidenavModule
  ],
  exports: [
    MainComponent
  ],
  providers: []
})
export class MainModule {
}
