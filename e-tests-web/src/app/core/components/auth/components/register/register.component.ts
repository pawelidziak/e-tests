import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '@core/services';
import {MatDialogRef, MatTabGroup} from '@angular/material';
import {AuthComponent} from '@core/components/auth/components/auth.component';
import {ALL_ROUTES} from '@shared/routes';
import {environment} from '@env/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Input() matTabGrp: MatTabGroup;
  @Input() authDialog: MatDialogRef<AuthComponent>;
  @Output() onLoading: EventEmitter<boolean> = new EventEmitter();

  public hidePassword = true;

  public errorMsg: string;
  public responseMsg: string;

  public registerForm: FormGroup;
  public displayName = new FormControl('', Validators.required);
  public email = new FormControl('', [Validators.required, Validators.email]);
  public password = new FormControl('', Validators.required);
  public confirmPassword = new FormControl('', Validators.required);
  public confirmPolicies = new FormControl(false, Validators.required);
  public confirmPoliciesAccepted = true;

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
      confirmPassword: this.confirmPassword,
      confirmPolicies: this.confirmPolicies
    });
  }

  public register(): void {
    const passwordMismatch = this.password.value !== this.confirmPassword.value;
    this.confirmPoliciesAccepted = this.confirmPolicies.value;
    if (this.registerForm.invalid || passwordMismatch || !this.confirmPoliciesAccepted) {
      return;
    }

    this.onLoading.emit(true);

    this.auth.emailPasswordRegister(this.displayName.value, this.email.value, this.password.value)
      .then(() => {
        this.authDialog.close();
        this.onLoading.emit(false);
      })
      .catch(error => {
        this.matTabGrp.realignInkBar();
        this.errorMsg = error;
        this.responseMsg = '';
        this.scrollTop();
        this.onLoading.emit(false);
      });
  }

  public scrollTop(): void {
    const element = document.querySelector('#registerContainer');
    element.scrollIntoView({behavior: 'smooth', block: 'start'});
  }

  public navigateToPolicy(): void {
    window.open(`${environment.appUrl}${ALL_ROUTES.POLICIES}`, '_blank');
  }
}
