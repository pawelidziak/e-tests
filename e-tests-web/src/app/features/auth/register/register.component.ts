import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../core/services/auth.service';
import {MatTabGroup} from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Input() matTabGrp: MatTabGroup;

  public hidePassword = true;

  public errorMsg: string;
  public responseMsg: string;

  public registerForm: FormGroup;
  public displayName = new FormControl('', Validators.required);
  public email = new FormControl('', [Validators.required, Validators.email]);
  public password = new FormControl('', Validators.required);
  public confirmPassword = new FormControl('', Validators.required);

  constructor(private auth: AuthService) {
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

    // TODO show some loader
    this.auth.emailPasswordRegister(this.displayName.value, this.email.value, this.password.value)
      .then(() => {
        this.matTabGrp.realignInkBar();
        this.responseMsg = 'Verification email has been sent';
        this.errorMsg = '';
        this.scrollTop();
      })
      .catch(error => {
        this.matTabGrp.realignInkBar();
        this.errorMsg = error;
        this.responseMsg = '';
        this.scrollTop();
      });
  }

  public scrollTop(): void {
    const element = document.querySelector('#registerContainer');
    element.scrollIntoView({behavior: 'smooth', block: 'start'});
  }
}
