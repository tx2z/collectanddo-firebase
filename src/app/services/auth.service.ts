import { Injectable, NgZone } from '@angular/core';
import { auth } from 'firebase/app';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: User;
  authState = new BehaviorSubject(false);

  constructor(
    public afStore: AngularFirestore,
    public firebaseAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private storage: Storage
  ) {
    this.firebaseAuth.authState.subscribe(user => {
      if (user) {
        console.log(user);
        this.userData = user;
        storage.set('user', JSON.stringify(this.userData));
        // JSON.parse(localStorage.getItem('user'));
        this.authState.next(true);
      } else {
        this.authState.next(false);
        storage.set('user', null);
        // JSON.parse(localStorage.getItem('user'));
        this.authState.next(false);
      }
    });
  }

  // Login in with email/password
  async SignIn(email: string, password: string, url: string) {
    return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password)
    .then((result) => {
      if (result.user.emailVerified) {
        this.authState.next(true);
        this.router.navigateByUrl(url);
      } else {
        window.alert('Email is not verified');
        return false;
      }
    }).catch((error) => {
      window.alert(error.message);
    });
  }

  // Register user with email/password
  async RegisterUser(email: string, password: string) {
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password)
    .then((result) => {
      this.SetUserData(result.user);
      this.SendVerificationMail();
    }).catch((error) => {
      window.alert(error.message);
    });
  }

  // Email verification when new user register
  async SendVerificationMail() {
    await this.firebaseAuth.auth.currentUser.sendEmailVerification();
    this.router.navigate(['start/register/verify-email']);
  }

  // Recover password
  async PasswordRecover(passwordResetEmail: string) {
    try {
      await this.firebaseAuth.auth.sendPasswordResetEmail(passwordResetEmail);
      window.alert('Password reset email has been sent, please check your inbox.');
    } catch (error) {
      window.alert(error);
    }
  }

  /*
  // Returns true when user is looged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  // Returns true when user's email is verified
  get isEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user.emailVerified !== false) ? true : false;
  }
*/
  // Sign in with Gmail
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth providers
  async AuthLogin(provider) {
    try {
      const result = await this.firebaseAuth.auth.signInWithPopup(provider);
      this.ngZone.run(() => {
        this.router.navigate(['']);
      });
      this.SetUserData(result.user);
      this.authState.next(true);
    } catch (error) {
      window.alert(error);
    }
  }

  // Store user in localStorage
  SetUserData(user: User) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || user.email,
      photoURL: user.photoURL || '',
      emailVerified: user.emailVerified
    };
    return userRef.set(userData, {
      merge: true
    });
  }

  // Sign-out
  async SignOut() {
    await this.firebaseAuth.auth.signOut();
    localStorage.removeItem('user');
    this.authState.next(false);
    this.router.navigate(['start/login']);
  }

  isAuthenticated() {
    return this.authState.value;
  }

}
