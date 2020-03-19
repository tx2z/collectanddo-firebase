import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  return = '';

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Get the query params
    this.route.queryParams
      .subscribe(params => this.return = params.return || '');
  }

  logIn(email, password) {
    return this.authService.SignIn(email.value, password.value, this.return);
  }

  recoverPassword(email) {
    return this.authService.PasswordRecover(email.value);
  }

  logInGoogle() {
    return this.authService.GoogleAuth();
  }

}
