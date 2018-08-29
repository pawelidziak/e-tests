import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../core/services/auth.service';
import {MatDialogRef, MatTabGroup} from '@angular/material';
import {AuthComponent} from '../auth.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Input() matTabGrp: MatTabGroup;
  @Input() authDialog: MatDialogRef<AuthComponent>;

  public hidePassword = true;
  public errorMsg: string;
  public responseMsg: string;

  public loginForm: FormGroup;
  public email = new FormControl('', [Validators.required, Validators.email]);
  public password = new FormControl('', Validators.required);
  public rememberMe = new FormControl(true);

  public forgotEmail = new FormControl('', [Validators.required, Validators.email]);

  constructor(private auth: AuthService) {
  }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm(): void {
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password,
      rememberMe: this.rememberMe
    });
  }

  public loginWithEmail(): void {
    if (this.loginForm.invalid) {
      return;
    }

    // TODO show some loader

    this.auth.emailPasswordLogin(this.email.value, this.password.value)
      .then(() => this.authDialog.close())
      .catch(error => {
        this.matTabGrp.realignInkBar();
        this.errorMsg = error;
      });
  }

  public forgotPassword(): void {
    if (this.forgotEmail.invalid) {
      return;
    }

    this.auth.resetPassword(this.forgotEmail.value)
      .then(() => {
        this.matTabGrp.realignInkBar();
        this.responseMsg = 'Instructions have been sent to the email.';
        this.errorMsg = '';
      })
      .catch(error => {
        this.matTabGrp.realignInkBar();
        this.errorMsg = error;
        this.responseMsg = '';
      });
  }
}
