import { Component, OnInit } from '@angular/core';
import {HeaderButtonType, HeaderService} from '../../core/services/header.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private readonly HEADER_TEXT = 'Authorization';

  public rememberMe: boolean;

  public error = '';
  public response: string;

  public passwordMismatch = true;

  public registerForm: FormGroup;
  public displayName = new FormControl('', Validators.required);
  public email = new FormControl('', Validators.required);
  public password = new FormControl('', Validators.required);
  public confirmPassword = new FormControl('', Validators.required);

  constructor(private headerService: HeaderService) { }

  ngOnInit() {
    this.headerService.setHeaderButtonAndText(HeaderButtonType.BACK, this.HEADER_TEXT);
    this.registerForm = new FormGroup({
      displayName: this.displayName,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    });
  }

}
