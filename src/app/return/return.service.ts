import { Injectable } from '@angular/core';
import { Upload } from '../places/upload';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { AuthService } from '../auth.service';
import * as firebase from 'firebase'
@Injectable()
export class ReturnService {

  constructor(private db: AngularFireDatabase, private auth: AuthService) { }
  private basePath:string = '/receipts';
  uploads: AngularFireObject<Upload[]>;

  getItems(id){
    return this.db.list('/companies_item_return/'+id);
  }

  save(id,upload: Upload,item){
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
          this.saveFileData(id,upload,item)
        }
      );
  }
  private saveFileData(id,upload: Upload,item){
 
  return    this.db.list('companies_item_return/'+id).push({
        name: item.name,
        cause: item.cause,
        photo: upload.url,
        date: item.date,
      });
  

  }

}
