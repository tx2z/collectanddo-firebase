import { Component, ViewChild, OnInit } from '@angular/core';
import { ModalController, IonInput } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { setTheme } from 'src/app/generics/theme.functions';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  user$: Observable<User>;
  userInfo: User;
  private userRef: AngularFirestoreDocument<any>;

  @ViewChild('displayName') displayName: IonInput;

  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private firebaseStorage: AngularFirestore,
  ) { }

  ngOnInit() {
    this.user$ = this.authService.user$;
    this.user$.subscribe({
      next: (user) => {
        this.userInfo = user;
        this.userRef = this.firebaseStorage.doc(`users/${this.userInfo.uid}`);
      },
    });
  }

  async dismiss() {
    return await this.modalController.dismiss();
  }

  toggleMode(event) {
    const theme = event.detail.value;
    setTheme(theme);
    this.userRef.set({theme}, { merge: true });
  }

  changeDisplayName() {
    const displayName = this.displayName.value as string;
    this.userRef.set({displayName}, { merge: true });
  }

  async logOut() {
    await this.modalController.dismiss();
    return this.authService.SignOut();
  }

}
