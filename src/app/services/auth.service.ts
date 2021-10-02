import { Injectable } from '@angular/core';
import { auth } from 'firebase/compat/app';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user$: Observable<User>;

  constructor(
    private router: Router,
    private firebaseFirestone: AngularFirestore,
    private firebaseAuth: AngularFireAuth,
  ) {
    // Get auth data, then get firestore user document || null
    this.user$ = this.firebaseAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.firebaseFirestone.doc(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  // Login in with email/password
  async SignIn(email: string, password: string, url: string) {
    return this.firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(result => {
        if (result.user.emailVerified) {
          this.SetUserData(result.user).then(() => this.router.navigateByUrl(url));
        } else {
          window.alert('Email is not verified');
          return false;
        }
      }).catch(error => this.handleError(error));
  }

  // Register user with email/password
  async RegisterUser(email: string, password: string) {
    return this.firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.SendVerificationMail();
      }).catch(error => this.handleError(error));
  }

  // Email verification when new user register
  async SendVerificationMail() {
    return (await this.firebaseAuth.currentUser).sendEmailVerification()
      .then(() => {
        this.router.navigate(['auth/register/verify-email']);
      }).catch(error => this.handleError(error));
  }

  // Recover password
  async PasswordRecover(passwordResetEmail: string) {
    return this.firebaseAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email has been sent, please check your inbox.');
      }).catch(error => this.handleError(error));
  }

  // Sign in with Gmail
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth providers
  async AuthLogin(provider) {
    return this.firebaseAuth.signInWithPopup(provider)
      .then(result => {
        this.SetUserData(result.user).then(() => this.router.navigate(['']));
      }).catch(error => this.handleError(error));
  }

  // Store user in storage and firebase
  async SetUserData(user: User, update = false) {
    const userData: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      theme: 'system'
    };
    if (user.displayName) {
      userData.displayName = user.displayName;
    }
    if (user.photoURL) {
      userData.photoURL = user.photoURL;
    }
    if (user.theme) {
      userData.theme = user.theme;
    }

    // recover user from firestone
    const userRef: AngularFirestoreDocument<any> = this.firebaseFirestone.doc(`users/${user.uid}`);

    return userRef.ref.get().then(async doc => {
      if (!doc.exists || update) {
        // if doesn't exist create user in firebase
        await userRef.set(userData, { merge: true });
      }
      return;
    }).catch(error => window.alert(error.message || error));
  }

  // Sign-out
  async SignOut() {
    return this.firebaseAuth.signOut()
    .then(() => this.router.navigate(['auth/login']))
    .catch(error => window.alert(error.message || error));
  }

  // If error, console log and notify user
  private handleError(error: Error) {
    console.error(error);
    window.alert(error.message || error);
  }

}
