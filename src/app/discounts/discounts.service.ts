import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
@Injectable()
export class DiscountsService {

  constructor(private db: AngularFireDatabase,
  private auth: AuthService) { }
  private  getKey;
  private uid;
  private imageUrl;
  storageRef = firebase.storage().ref();
  getPlaces(){
    return this.db.list('/companies/');
  }
 save (discounts,key,id,photo,name,logo,companyName){
    let basePath = ('/discountImages/' + name);
    let uploadTask;
    //--------- Upload Image
    uploadTask = this.storageRef.child(basePath).putString(photo, 'base64', { contentType: 'image/png' });
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
       this.imageUrl = uploadTask.snapshot.downloadURL;
       //this.uploadConversion(offer, this.getUrl,id ,total,length,date);
       this.save1(discounts,key,id,this.imageUrl,logo,companyName);
      }
    );
  }
  private save1 (discount,key,uid,imageUrl,logo,companyName){
    this.getKey = uid;
    let objectKey;

     objectKey = this.db.list('/small_discounts/').push({
      name: discount.name,
      shortcut: discount.size,
      description: discount.description,
      companyId: uid,
      companyKey: key,
      date: discount.date,
      photo: imageUrl,
      logo:logo,
      companyName: companyName,
    }).key;

   this.db.object('/companies/'+key+'/small_discounts/').update({[objectKey]: true});
  }
  getKeys (key){
    return this.db.list('/companies/'+key+'/small_discounts/');
  }
  getDiscount(key){
    return this.db.object('/small_discounts/'+key);
  } 

  update(discount,key, keys){
    return this.db.object('/small_discounts/'+ key+"/"+keys).update(discount);
  }
  getAll(){
    return this.db.list('/small_discounts/');
  }
  removeExpiredDate(key,data,id){
    this.db.object('/companies/'+id+'/expired_discounts/').update({[key]: false});
    this.db.list('/companies/'+id+'/small_discounts/'+key+"/").remove();
    this.db.list('/small_discounts/').remove(key);
     this.db.object('/expired_data/'+key).set(data);
     
  
  }
 


}
