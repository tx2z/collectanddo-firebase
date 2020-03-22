import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { ModalController, NavParams, IonInput } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { User, Theme } from 'src/app/models/user.model';
import { setTheme } from 'src/app/generics/theme.functions';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  @Input() userInfo: User;
  @ViewChild('displayName') displayName: IonInput;
  private theme: Theme;

  constructor(
    private modalController: ModalController,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.theme = this.userInfo.theme;
  }

  async dismiss() {
    this.userInfo.displayName = this.displayName.value as string;
    this.userInfo.theme = this.theme;
    await this.modalController.dismiss(this.userInfo);
  }

  toggleMode(event) {
    this.theme = event.detail.value;
    setTheme(this.theme);
  }

  async logOut() {
    await this.modalController.dismiss();
    return this.authService.SignOut();
  }

}
