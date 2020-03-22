import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage {

  constructor(
    private authService: AuthService
  ) { }

  sendEmail() {
    return this.authService.SendVerificationMail();
  }

}
