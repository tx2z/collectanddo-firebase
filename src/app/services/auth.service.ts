import { Injectable, NgZone } from '@angular/core';
import { auth } from 'firebase/app';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: User;

  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.ngFireAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  // Login in with email/password
  async SignIn(email: string, password: string) {
    try {
      const result = await this.ngFireAuth.auth.signInWithEmailAndPassword(email, password);
      this.ngZone.run(() => {
        this.router.navigate(['']);
      });
    } catch (error) {
      window.alert(error);
    }
  }

  // Register user with email/password
  async RegisterUser(email: string, password: string) {
    try {
      const result = await this.ngFireAuth.auth.createUserWithEmailAndPassword(email, password);
      this.ngZone.run(() => {
        this.router.navigate(['']);
      });
      this.SetUserData(result.user);
    } catch (error) {
      window.alert(error);
    }
  }

  // Email verification when new user register
  async SendVerificationMail() {
    await this.ngFireAuth.auth.currentUser.sendEmailVerification();
    this.router.navigate(['verify-email']);
  }

  // Recover password
  async PasswordRecover(passwordResetEmail: string) {
    try {
      await this.ngFireAuth.auth.sendPasswordResetEmail(passwordResetEmail);
      window.alert('Password reset email has been sent, please check your inbox.');
    } catch (error) {
      window.alert(error);
    }
  }

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

  // Sign in with Gmail
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth providers
  async AuthLogin(provider) {
    try {
      const result = await this.ngFireAuth.auth.signInWithPopup(provider);
      this.ngZone.run(() => {
        this.router.navigate(['']);
      });
      this.SetUserData(result.user);
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
    await this.ngFireAuth.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }

}
