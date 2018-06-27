import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public hidePassword = true;
  public errorMsg: string;

  public loginForm: FormGroup;
  public email = new FormControl('', [Validators.required, Validators.email]);
  public password = new FormControl('', Validators.required);
  public rememberMe = new FormControl(true);

  public forgotEmail = new FormControl('', [Validators.required, Validators.email]);

  constructor() {
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

    // show some loader

    console.group('FORM');
    console.log(this.email.value);
    console.log(this.password.value);
    console.log(this.rememberMe.value);
    console.groupEnd();
  }

  public forgotPassword(): void {
    if (this.forgotEmail.invalid) {
      return;
    }

    // TODO reset password
  }
}
