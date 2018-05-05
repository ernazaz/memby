


var admin = require('firebase-admin');

var serviceAccount = require('./admin-sdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://dosi-8daa7.firebaseio.com"
});
admin.initializeApp(functions.config().firebase);

admin.auth().createUser({
  email: "user@example.com",
  emailVerified: false,
  phoneNumber: "+11234567890",
  password: "secretPassword",
  displayName: "John Doe",
  photoURL: "http://www.example.com/12345678/photo.png",
  disabled: false
})
  .then(function(userRecord) {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log("Successfully created new user:", userRecord.uid);
  })
  .catch(function(error) {
    console.log("Error creating new user:", error);
  });