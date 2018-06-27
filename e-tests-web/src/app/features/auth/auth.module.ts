import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {AuthComponent} from './auth.component';
import {
  MatButtonModule,
  MatCardModule, MatCheckboxModule, MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatTabsModule
} from '@angular/material';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {CompareValidatorDirective} from '../../shared/directives/compare-validator.directive';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    CompareValidatorDirective
  ],
  imports: [
    SharedModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatCheckboxModule,
    MatExpansionModule
  ],
  exports: [],
  providers: []
})
export class AuthModule {
}
