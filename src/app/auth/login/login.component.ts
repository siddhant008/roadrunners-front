import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

import {AuthService} from '../../services/auth.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

interface loginDataModel { email: string; password: string; }

export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  loginData: {
    email: string,
    password: string
  };
  resLoginData: any;
  loginSubscription: Subscription;
  loggedIn: false;

  constructor(private authService: AuthService, private route: Router, private http: HttpClient) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {

    if (!this.loginForm.valid) {
      return;
    }

    this.loginData = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    };
    console.log(this.loginData);

    this.loginSubscription = this.authService.login(this.loginData).subscribe(resData => {
      console.log(resData);
    }, catchError(this.errorHandler));

    if (this.loggedIn) {
      this.route.navigate(['/home']);
    }
    this.loginForm.reset(this.loginForm.get('password'));
  }
  private errorHandler(error: HttpErrorResponse) {
    if (error) {
      console.log(error);
    }
  }
  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
  }
}
