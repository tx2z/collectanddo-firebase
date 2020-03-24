import { Component, OnInit } from '@angular/core';
import { ModalController, IonRouterOutlet } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserComponent } from 'src/app/main/components/user/user.component';
import { User } from 'src/app/models/user.model';
import { setTheme } from 'src/app/generics/theme.functions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: 'main.page.html',
  styleUrls: ['main.page.scss']
})
export class MainPage implements OnInit {
  user$: Observable<User>;
  prefersDark: MediaQueryList;

  constructor(
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.user$ = this.authService.user$;
    this.user$.subscribe({
      next: (user) => {
        // Apply the user theme
        setTheme(user.theme);
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
