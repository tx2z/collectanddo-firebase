import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { ModalController, NavParams, IonInput } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  @Input() userInfo: User;
  @ViewChild('displayName') displayName: IonInput;
  toggleStatus = false;

  constructor(
    private modalController: ModalController,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    if (document.body.classList.contains('dark')) {
      this.toggleStatus = true;
    }
  }

  async dismiss() {
    this.userInfo.displayName = this.displayName.value as string;
    // TODO: Add system option
    this.userInfo.theme = this.toggleStatus ? 'dark' : 'light';
    await this.modalController.dismiss(this.userInfo);
  }

  toggleMode(event) {
    this.toggleStatus = event.detail.checked;
    document.body.classList.toggle('dark', event.detail.checked);
  }

  async logOut() {
    await this.modalController.dismiss();
    return this.authService.SignOut();
  }

}
