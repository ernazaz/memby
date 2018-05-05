import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable, of } from 'rxjs';
import { Users } from '../models/users';
import * as firebase from 'firebase';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  user$: Observable<firebase.User>;
  appUser: Users;
  isCompany: boolean;

  constructor( private auth: AuthService) {
    this.user$ = auth.authState;
    /*
    auth.appUsers$.subscribe( appUser => {
      this.appUser = appUser;
      this.isCompany = appUser.isCompany;
    }); */

    
   }
  
  logout(){
    this.auth.signOut();
  }
  ngOnInit() {
  }

}
