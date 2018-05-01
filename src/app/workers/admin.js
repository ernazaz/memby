import * as admin from 'firebase-admin';
var admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
  });
