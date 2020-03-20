import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})

export class RegistrationPage {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  signUp(email, password) {
    this.authService.RegisterUser(email.value, password.value);
  }

}
