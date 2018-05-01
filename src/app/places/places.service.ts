import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { AuthService } from '../auth.service';
import { Upload } from './upload';

@Injectable()
export class PlacesService {

  constructor(private db: AngularFireDatabase, private auth: AuthService) { }
  private basePath:string = '/logos';
  uploads: FirebaseObjectObservable<Upload[]>;

  save(form,upload: Upload,uid){
    let storageRef = firebase.storage().ref();
    let uploadTask;
    uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);
   uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          let snap = snapshot as firebase.storage.UploadTaskSnapshot
        },
        (error) => {
          console.log(error)
        },
        () => {
          // upload success
          upload.url = uploadTask.snapshot.downloadURL
          upload.name = upload.file.name
          this.saveFileData(form,upload,uid)
        }
      );
  }
  getPlace(){
    return this.db.list('/companies/');
  }
  getPlace1(){
    return this.db.list('/companies/');
  }

  private saveFileData(form,upload: Upload,uid){
    form.map(data => {
      let week = [];
      week.push({
        mondayFrom: data.mondayFrom,
        mondayTo: data.mondayTo,
        tuesdayFrom: data.tuesdayFrom,
        tuesdayTo: data.tuesdayTo,
        wednesdayFrom: data.wednesdayFrom,
        wednesdayTo: data.wednesdayTo,
        thursdayFrom: data.thursdayFrom,
        thursdayTo: data.thursdayTo,
        fridayFrom: data.fridayFrom,
        fridayTo: data.fridayTo,
        saturdayFrom: data.saturdayFrom,
        saturdayTo: data.saturdayTo,
        sundayFrom: data.sundayFrom,
        sundayTo: data.sundayTo,
      });
      this.db.list('companies/').push({
        name: data.name,
        latitude: data.latitude,
        longitude: data.longitude,
        category: data.category,
        logo: upload.url,
        description: data.description,
        companyId: uid,
        website: data.website,
        workTime: week,
      });
    }) 

  }

}
