import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public hidePassword = true;

  public errorMsg: string;
  public responseMsg: string;

  public registerForm: FormGroup;
  public displayName = new FormControl('', Validators.required);
  public email = new FormControl('', [Validators.required, Validators.email]);
  public password = new FormControl('', Validators.required);
  public confirmPassword = new FormControl('', Validators.required);

  constructor() {
  }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm(): void {
    this.registerForm = new FormGroup({
      displayName: this.displayName,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    });
  }

  public register(): void {
    const passwordMismatch = this.password.value !== this.confirmPassword.value;
    if (this.registerForm.invalid || passwordMismatch) {
      return;
    }

    // show some loader

    console.group('FORM');
    console.log(this.displayName.value);
    console.log(this.email.value);
    console.log(this.password.value);
    console.log(this.confirmPassword.value);
    console.groupEnd();
  }
}
