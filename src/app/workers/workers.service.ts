import { Injectable } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import * as firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { environment } from '../../environments/environment';
import { AngularFireAuth } from 'angularfire2/auth';
@Injectable()
export class WorkersService {

  private config = environment.firebase;
  authState;
  uid;
  worker$: Observable<firebase.User>;
  constructor(private afAuth: AngularFireAuth,
    private db: AngularFireDatabase) { }
  
  addWorker(emails,passwords,id){
    let secondaryApp = firebase.initializeApp(this.config, "Secondary");
    secondaryApp.auth().createUserWithEmailAndPassword(emails, passwords)
    .then((user) => {
      this.db.object('/companies_workers/'+ id +'/'+ user.uid + '/').set({
        worker: emails,
      });
      this.db.object('/companies_registration/'+ user.uid).set({
        worker: emails,
        isAdmin: false,
      });
       //I don't know if the next statement is necessary 
      secondaryApp.auth().signOut();
   });
  }

  getWorkers(id){
    return this.db.list('/companies_workers/'+id);
  }
 


}
