import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ModalController, IonRouterOutlet } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserPage } from 'src/app/configure/user/user.page';
import { User } from 'src/app/models/user.model';

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

  ngOnInit() {
    this.prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  }

  // Get user preferences every time we load the app
  ionViewWillEnter() {
    this.storage.get('user').then(userString => {
      this.user = JSON.parse(userString);

      // Check preferred mode
      switch (this.user.theme) {
        case('dark'): {
          this.toggleDarkTheme(true);
          break;
        }
        case('light'): {
          this.toggleDarkTheme(false);
          break;
        }
        case('system'): {
          // Listen for changes to the prefers-color-scheme media query
          this.prefersDark.addListener((mediaQuery) => this.toggleDarkTheme(mediaQuery.matches));
        }
      }
    });
  }

  // Add or remove the dark theme based on if the media query matches
  toggleDarkTheme(shouldAdd: boolean) {
    document.body.classList.toggle('dark', shouldAdd);
  }

  // Configure user options modal
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
