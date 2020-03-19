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
    public authService: AuthService,
    public router: Router
  ) { }

  signUp(email, password) {
    this.authService.RegisterUser(email.value, password.value);
  }

}
