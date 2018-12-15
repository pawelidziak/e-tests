import {NgModule} from '@angular/core';
import {SharedModule} from '@shared/shared.module';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {SpinnerModule} from '@shared/components';
import {
  MatButtonModule, MatCheckboxModule,
  MatDialogModule, MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatTabsModule
} from '@angular/material';
import {AuthComponent} from '@core/components/auth/components/auth.component';

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
