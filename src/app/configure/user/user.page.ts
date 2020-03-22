import { Component, Input, ViewChild } from '@angular/core';
import { ModalController, NavParams, IonInput } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage {
  @Input() userInfo: User;
  @ViewChild('displayName') displayName: IonInput;

  constructor(
    private modalController: ModalController,
    private authService: AuthService,
  ) { }

  async dismiss() {
    this.userInfo.displayName = this.displayName.value as string;
    await this.modalController.dismiss(this.userInfo);
  }

  async logOut() {
    await this.modalController.dismiss();
    return this.authService.SignOut();
  }

}
