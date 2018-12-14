import {NgModule} from '@angular/core';
import {AppHeaderModule} from '../app-header/app-header.module';
import {AppFooterModule} from '../app-footer/app-footer.module';
import {MainComponent} from './main.component';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {AuthModule} from '../auth/auth.module';
import {MatCardModule} from '@angular/material';
import {PageHeaderModule} from '../../shared/components/page-header/page-header.module';

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,

    AppHeaderModule,
    PageHeaderModule,
    AppFooterModule,
    AuthModule,

    MatCardModule
  ],
  providers: [],
  exports: [
    MainComponent,
  ]
})
export class MainModule {
}
