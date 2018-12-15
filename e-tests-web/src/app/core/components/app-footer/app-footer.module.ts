import {NgModule} from '@angular/core';
import {AppFooterComponent} from './components/app-footer.component';
import {MatButtonModule, MatCardModule} from '@angular/material';
import {SharedModule} from '@shared/shared.module';

@NgModule({
  declarations: [
    AppFooterComponent
  ],
  imports: [
    SharedModule,

    MatButtonModule,
    MatCardModule
  ],
  exports: [
    AppFooterComponent,
  ],
  providers: []
})
export class AppFooterModule {
}
