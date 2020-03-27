import { Component, OnInit } from '@angular/core';
import { ModalController, IonRouterOutlet } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserComponent } from 'src/app/main/components/user/user.component';
import { User } from 'src/app/models/user.model';
import { setTheme } from 'src/app/generics/theme.functions';
import { Observable } from 'rxjs';
import { ActionSheetController } from '@ionic/angular';


@Component({
  selector: 'app-main',
  templateUrl: 'main.page.html',
  styleUrls: ['main.page.scss']
})
export class MainPage implements OnInit {
  user$: Observable<User>;
  userPrev: User;
  userImage: string;

  constructor(
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    private authService: AuthService,
    private actionSheetController: ActionSheetController,
  ) { }

  ngOnInit() {
    this.user$ = this.authService.user$;
    this.user$.subscribe({
      next: (user) => {
        if (user) {
          // Apply the user theme
          if (this.userPrev?.theme !== user.theme) {
            setTheme(user.theme);
          }
          // Add user image. Give it 5 seconds to generate
          if (user.photoURL64 && this.userPrev?.photoURL64 !== user.photoURL64) {
            setTimeout(() => {
              this.userImage = user.photoURL64;
            }, 5000);
          }
          // Save info to check against next time
          this.userPrev = user;
        } else {
          this.userPrev = null;
          this.userImage = null;
        }
      },
    });
  }

  // Configure user options modal
  async userModal() {
    const modal = await this.modalController.create({
      component: UserComponent,
      presentingElement: this.routerOutlet.nativeEl
    });

    return await modal.present();
  }

  // Add new element
  async addNewActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Add new...',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Share',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Play (open modal)',
        icon: 'arrow-dropright-circle',
        handler: () => {
          console.log('Play clicked');
        }
      }, {
        text: 'Favorite',
        icon: 'heart',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}
