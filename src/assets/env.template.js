(function(window) {
  window.env = window.env || {};

  // Environment variables
  window["env"]["FIREBASE_APIKEY"] = "${FIREBASE_APIKEY}";
  window["env"]["FIREBASE_AUTHDOMAIN"] = "${FIREBASE_AUTHDOMAIN}";
  window["env"]["FIREBASE_DATABASEURL"] = "${FIREBASE_DATABASEURL}";
  window["env"]["FIREBASE_PROJECTID"] = "${FIREBASE_PROJECTID}";
  window["env"]["FIREBASE_STORAGE_BUCKET"] = "${FIREBASE_STORAGE_BUCKET}";
  window["env"]["FIREBASE_MESSAGINGSENDERID"] = "${FIREBASE_MESSAGINGSENDERID}";
  window["env"]["FIREBASE_APPID"] = "${FIREBASE_APPID}";
  window["env"]["FIREBASE_MEASUREMENTID"] = "${FIREBASE_MEASUREMENTID}";
})(this);