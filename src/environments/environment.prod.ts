export const environment = {
  production: true,
  firebaseConfig : {
    // tslint:disable: no-string-literal
    apiKey: window['env']['FIREBASE_APIKEY'],
    authDomain: window['env']['FIREBASE_AUTHDOMAIN'],
    databaseURL: window['env']['FIREBASE_DATABASEURL'],
    projectId: window['env']['FIREBASE_PROJECTID'],
    storageBucket: window['env']['FIREBASE_STORAGE_BUCKET'],
    messagingSenderId: window['env']['FIREBASE_MESSAGINGSENDERID'],
    appId: window['env']['FIREBASE_APPID'],
    measurementId: window['env']['FIREBASE_MEASUREMENTID']
  }
};
