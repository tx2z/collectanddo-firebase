import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireFunctionsModule } from '@angular/fire/functions';

/*import { IonicStorageModule } from '@ionic/storage';*/

import { AuthService } from 'src/app/services/auth.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    /*IonicStorageModule.forRoot(),*/
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireStorageModule,
    AngularFireFunctionsModule,
    IonicModule.forRoot(),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AngularFirestoreModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
