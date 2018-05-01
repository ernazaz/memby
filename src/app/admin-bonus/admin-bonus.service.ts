import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase';
import { RouterStateSnapshot } from '@angular/router';


@Injectable()

export class AdminBonusService {
  storageRef = firebase.storage().ref();
  private getUrl;
  constructor(private db: AngularFireDatabase) { }

  save(bonus, image, name) {
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
        this.uploadImage(bonus, this.getUrl, );
      }
    );
  }
  private uploadImage(bonus, url) {
    this.db.list('memby_offers/').push({
      title: bonus.title,
      points: bonus.points,
      description: bonus.description,
      photo: this.getUrl,
    }
    );
  }

}
