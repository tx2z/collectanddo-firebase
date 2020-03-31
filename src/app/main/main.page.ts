import { Component, OnInit } from '@angular/core';
import { ModalController, IonRouterOutlet, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserComponent } from 'src/app/main/components/user/user.component';
import { User } from 'src/app/models/user.model';
import { setTheme } from 'src/app/generics/theme.functions';
import { Observable } from 'rxjs';
import { ActionSheetController } from '@ionic/angular';
import { CollectionService } from 'src/app/services/collection.service';
import { CollectionData } from '../models/collection.model';

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
    private alertController: AlertController,
    private collectionService: CollectionService,
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
      buttons: [
      {
        text: 'Collection',
        icon: 'bookmarks-outline',
        handler: () => {
          this.collectionAdd();
        }
      }, {
        text: 'Item',
        icon: 'bookmark-outline',
        handler: () => {
          console.log('Play clicked');
        }
      }, {
        text: 'Event',
        icon: 'calendar-outline',
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

  // Add new collection
  async collectionAdd() {
    const alert = await this.alertController.create({
      translucent: true,
      header: 'Add new Collection',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Name'
        },
        // multiline input.
        {
          name: 'description',
          type: 'textarea',
          placeholder: 'Description'
        },
        {
          name: 'type',
          type: 'text',
          placeholder: 'Type'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Add Collection',
          handler: collectionForm => {
            console.log(collectionForm);
            const newCollection: CollectionData = {
              title: collectionForm.title,
              description: collectionForm.description,
              type: collectionForm.type,
            };
            this.collectionService.addNewCollection(newCollection);
          }
        }
      ]
    });

    await alert.present();
  }

}
