import {NgModule} from '@angular/core';
import {CookieLawComponent} from '@core/components';
import {SharedModule} from '@shared/shared.module';
import {MatButtonModule, MatSnackBarModule} from '@angular/material';

@NgModule({
  declarations: [
    CookieLawComponent
  ],
  imports: [
    SharedModule,

    MatSnackBarModule,
    MatButtonModule
  ],
  exports: [
    CookieLawComponent
  ]
})
export class CookieLawModule {
}
