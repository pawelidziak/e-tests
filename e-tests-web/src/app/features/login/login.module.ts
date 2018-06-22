import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {LoginComponent} from './login.component';
import {loginRouting} from './login.routing';
import {
  MatButtonModule,
  MatCardModule, MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatTabsModule
} from '@angular/material';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    SharedModule,
    loginRouting,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatCheckboxModule
  ],
  exports: [],
  providers: []
})
export class LoginModule {
}
