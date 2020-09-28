// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
