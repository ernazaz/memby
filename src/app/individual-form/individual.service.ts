import { Injectable, ErrorHandler } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase';

import { RouterStateSnapshot } from '@angular/router';


@Injectable()
export class IndividualService {
//-------------------------------------------------------
  private basePath = '/uploads/images';
  private getUrl;
  constructor(private db: AngularFireDatabase) { }
  storageRef = firebase.storage().ref();
  saveImage = [];
  private form;
  private key;

//----------------------------------------------------
//------- Konversija
getUsers(){
  return this.db.list('/users_info/');
}
getOffer(id){
  return this.db.list('/individual_offers/'+id);
}

Conversion (offer, image,name,id,total,length,date){
  let basePath = ('/uploads/' + name);
  let uploadTask;
  //--------- Upload Image
  uploadTask = this.storageRef.child(basePath).putString(image, 'base64', { contentType: 'image/png' });
  // -------------- Here checking all uploading
  uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
    (snapshot) => {
      // upload in progress
      let snap = snapshot as firebase.storage.UploadTaskSnapshot
    },
    (error) => {
      // upload failed
      console.log(error)
    },
    () => {
      // upload success
      this.getUrl = uploadTask.snapshot.downloadURL;
     this.uploadConversion(offer, this.getUrl,id ,total,length,date);
    }
  );
}
private uploadConversion(bonus, url,id,total,length,date) {
  let saveForm = [];
  let objectKey;
  
  bonus.map(users => {
    this.db.object('/individual_offers/'+id+'/').set(
      {reached: length,
      expired_date: date});
    objectKey = this.db.list('/individual_offers/'+id).push({
      category: users.category,
      gender: users.gender,
      age_from: users.age_from,
      age_To: users.age_To,
      center_longitude: users.center_longitude,
      center_latitude: users.center_latitude,
      radius: users.radius,
      photo: url,
      companyId: id,
      title: users.title,
    }).key;
    this.db.object('/companies_registration/'+id+'/individual/').update({[this.key]: true});
    this.saveUsers(total,objectKey,id);
})
}
saveUsers(total,objectKey,id){
  total.map( user => {
    return this.db.object('/individual_offers_users/'+id+'/'+objectKey+'/').update({[user.$key]: false});
  })
}


}






