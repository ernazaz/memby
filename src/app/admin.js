

var admin = require('firebase-admin');

var serviceAccount = require('./admin-sdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://dosi-8daa7.firebaseio.com"
});
admin.initializeApp(functions.config().firebase);