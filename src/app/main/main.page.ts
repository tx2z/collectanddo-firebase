import { Component, OnInit } from '@angular/core';
import { ModalController, IonRouterOutlet } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserComponent } from 'src/app/main/components/user/user.component';
import { User } from 'src/app/models/user.model';
import { setTheme } from 'src/app/generics/theme.functions';
import { Observable, from, of } from 'rxjs';
import { delay, concatMap } from 'rxjs/operators';

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
  ) { }

  ngOnInit() {
    this.user$ = this.authService.user$;
    this.user$.subscribe({
      next: (user) => {
        if (user) {
          // Apply the user theme
          if (this.userPrev?.theme !== user.theme) {
            console.log('Change theme');
            setTheme(user.theme);
          }
          // Add user image. Give it 5 seconds to generate
          if (user.photoURL64 && this.userPrev?.photoURL64 !== user.photoURL64) {
            console.log('change image');
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

}
