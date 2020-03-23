import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { IonicStorageModule } from '@ionic/storage';

import { AuthService } from 'src/app/services/auth.service';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { CollectService } from 'src/app/services/collect.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule.enablePersistence(),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    AuthGuardService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AngularFirestoreModule,
    CollectService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
