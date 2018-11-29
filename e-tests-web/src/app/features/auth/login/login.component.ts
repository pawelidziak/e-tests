import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../core/services/auth.service';
import {MatDialogRef, MatTabGroup} from '@angular/material';
import {AuthComponent} from '../auth.component';
import {AppSettingsService} from '../../../core/services/app-settings.service';
import {slideFromBottom} from '../../../shared/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [slideFromBottom()]
})
export class LoginComponent implements OnInit {

  @Input() matTabGrp: MatTabGroup;
  @Input() authDialog: MatDialogRef<AuthComponent>;
  @Output() onLoading: EventEmitter<boolean> = new EventEmitter();

  public hidePassword = true;
  public errorMsg: string;
  public responseMsg: string;

  public loginForm: FormGroup;
  public email = new FormControl('', [Validators.required, Validators.email]);
  public password = new FormControl('', Validators.required);
  public rememberMe = new FormControl(true);

  public forgotEmail = new FormControl('', [Validators.required, Validators.email]);
  public showForgotPassword: boolean;

  constructor(private auth: AuthService,
              private appSettings: AppSettingsService) {
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

  public googleLogin(): void {
    this.onLoading.emit(true);
    this.auth.loginWithGoogle()
      .then(() => {
        this.authDialog.close();
        this.appSettings.logoutAfterRefresh = !this.rememberMe.value;
        this.onLoading.emit(false);
      })
      .catch(error => {
        this.matTabGrp.realignInkBar();
        this.errorMsg = error;
        this.scrollTop();
        this.onLoading.emit(false);
      });
  }

  public loginWithEmail(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.onLoading.emit(true);

    this.auth.emailPasswordLogin(this.email.value, this.password.value)
      .then(() => {
        this.authDialog.close();
        this.appSettings.logoutAfterRefresh = !this.rememberMe.value;
        this.onLoading.emit(false);
      })
      .catch(error => {
        this.matTabGrp.realignInkBar();
        this.errorMsg = error;
        this.scrollTop();
        this.onLoading.emit(false);
      });
  }

  public forgotPassword(): void {
    if (this.forgotEmail.invalid) {
      return;
    }

    this.onLoading.emit(true);

    this.auth.resetPassword(this.forgotEmail.value)
      .then(() => {
        this.matTabGrp.realignInkBar();
        this.responseMsg = 'Instructions have been sent to the email.';
        this.errorMsg = '';
        this.scrollTop();
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
    const element = document.querySelector('#loginContainer');
    element.scrollIntoView({behavior: 'smooth', block: 'start'});
  }
}
