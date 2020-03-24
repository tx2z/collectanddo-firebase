import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ModalController, IonRouterOutlet } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserComponent } from 'src/app/main/components/user/user.component';
import { User } from 'src/app/models/user.model';
import { setTheme } from 'src/app/generics/theme.functions';

@Component({
  selector: 'app-main',
  templateUrl: 'main.page.html',
  styleUrls: ['main.page.scss']
})
export class MainPage implements OnInit {
  user: User;
  prefersDark: MediaQueryList;

  constructor(
    private storage: Storage,
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    private authService: AuthService,
  ) {}

  ngOnInit() {}

  // Get user preferences every time we load the app
  ionViewWillEnter() {
    this.storage.get('user').then(userString => {
      this.user = JSON.parse(userString);

      // Apply the user theme
      setTheme(this.user.theme);
    });
  }

  // Configure user options modal
  async userModal() {
    const userInfo = JSON.parse(JSON.stringify(this.user));
    const modal = await this.modalController.create({
      component: UserComponent,
      componentProps: {
        userInfo,
      },
      presentingElement: this.routerOutlet.nativeEl
    });

    modal.onDidDismiss().then((modalInfo) => {
      const updatedUserInfo: User = modalInfo.data;
      if (updatedUserInfo) {
        const updatedUserInfoString = JSON.stringify(updatedUserInfo);
        if ( updatedUserInfoString !== JSON.stringify(this.user)) {
          this.user = updatedUserInfo;
          return this.authService.SetUserData(updatedUserInfo, true);
        }
      }
    });
    return await modal.present();
  }

}
