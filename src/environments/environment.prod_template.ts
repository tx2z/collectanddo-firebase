export const environment = {
  production: true,
  firebaseConfig : {
    apiKey: '${FIREBASE_APIKEY}',
    authDomain: '${FIREBASE_AUTHDOMAIN}',
    databaseURL: '${FIREBASE_DATABASEURL}',
    projectId: '${FIREBASE_PROJECTID}',
    storageBucket: '${FIREBASE_STORAGE_BUCKET}',
    messagingSenderId: '${FIREBASE_MESSAGINGSENDERID}',
    appId: '${FIREBASE_APPID}',
    measurementId: '${FIREBASE_MEASUREMENTID}'
  }
};
