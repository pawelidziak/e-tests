import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {AuthComponent} from './auth.component';
import {
  MatButtonModule, MatCheckboxModule,
  MatDialogModule, MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatTabsModule
} from '@angular/material';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {SpinnerModule} from '../../shared/components/spinner/spinner.module';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    SharedModule,
    SpinnerModule,

    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatCheckboxModule,
    MatDialogModule
  ],
  exports: [],
  providers: [],
  entryComponents: [AuthComponent]
})
export class AuthModule {
}
