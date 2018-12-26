import {NgModule} from '@angular/core';
import {MainComponent} from './components/main.component';
import {RouterModule} from '@angular/router';
import {MatCardModule, MatSnackBarModule} from '@angular/material';
import {AppFooterModule, AppHeaderModule, AuthModule, CookieLawComponent, PageHeaderModule} from '@core/components';
import {CommonModule} from '@angular/common';
import {CookieLawModule} from '@core/components/cookie-law/cookie-law.module';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    RouterModule,

    AppHeaderModule,
    PageHeaderModule,
    AppFooterModule,
    AuthModule,

    MatCardModule,
    MatSnackBarModule,
    CookieLawModule
  ],
  providers: [],
  exports: [
    MainComponent,
  ],
  entryComponents: [CookieLawComponent]
})
export class MainModule {
}
