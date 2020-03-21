import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ModalController, IonRouterOutlet } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserPage } from 'src/app/configure/user/user.page';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  user: User;

  constructor(
    private storage: Storage,
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    private authService: AuthService,
  ) {}

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.storage.get('user').then(userString => {
      this.user = JSON.parse(userString);
    });
  }

  async userModal() {
    const userInfo = JSON.parse(JSON.stringify(this.user));
    const modal = await this.modalController.create({
      component: UserPage,
      componentProps: {
        userInfo,
      },
      presentingElement: this.routerOutlet.nativeEl
    });

    modal.onDidDismiss().then((modalInfo) => {
      const newUserInfo: User = modalInfo.data;
      if (newUserInfo) {
        const newUserInfoString = JSON.stringify(newUserInfo);
        if ( newUserInfoString !== JSON.stringify(this.user)) {
          this.user = newUserInfo;
          return this.authService.SetUserData(newUserInfo, true);
        }
      }
    });
    return await modal.present();
  }

}
