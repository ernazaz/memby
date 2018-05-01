import { Injectable } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/observable/of';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Users } from './models/users';

@Injectable()
export class AuthService {
  authState: any = null;
  user$: Observable<firebase.User>;
  uid;
 
  constructor(private afAuth: AngularFireAuth,
    private router: Router,
    private route: ActivatedRoute,
    private db: AngularFireDatabase) { 
    this.user$ = afAuth.authState;
  
  }
  signUpWithEmail(email: string, password: string, form) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        
        this.db.object('main_companies/'+ user.uid).set({
          address: form.address,
          companyCode: form.companyCode,
          pvmCode: form.pvmCode,
          ceoName: form.ceoName,
          email: email,
          phoneNumber: form.phoneNumber,
        })
      this.db.object('admin_users/').update({[user.uid]:true});
      this.afAuth.auth.signOut();
      })
    
      .catch(error => {
        console.log(error)
        throw error
      });
      
  }


  loginWithEmail(email: string, password: string) {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        this.router.navigateByUrl(returnUrl);

      })
      .catch(error => {
        console.log(error)
        throw error
      });
  }

  signOut(): void {
    this.afAuth.auth.signOut();
    this.router.navigate(['/login'])
  }

  getUser(uid: string):FirebaseObjectObservable<Users>{
    return this.db.object('/main_companies/'+ uid);
  }

  get appUsers$(): Observable<Users> {
    return this.user$
    .switchMap(user => {
      if (user) return this.getUser(user.uid);

        return Observable.of(null);
    });
  }


}
