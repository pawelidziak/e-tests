import {NgModule} from '@angular/core';
import {MainComponent} from './components/main.component';
import {RouterModule} from '@angular/router';
import {MatCardModule, MatSnackBarModule} from '@angular/material';
import {AppFooterModule, AppHeaderModule, AuthModule, CookieLawComponent, PageHeaderModule} from '@core/components';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    RouterModule,

    AppHeaderModule,
    PageHeaderModule,
    AppFooterModule,
    AuthModule,

    MatCardModule,
    MatSnackBarModule
  ],
  providers: [],
  exports: [
    MainComponent,
  ],
  entryComponents: [CookieLawComponent]
})
export class MainModule {
}
