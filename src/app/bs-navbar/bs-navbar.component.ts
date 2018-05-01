import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs/Observable';
import { Users } from '../models/users';

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
    
    auth.appUsers$.subscribe( appUser => {
      this.appUser = appUser;
      this.isCompany = appUser.isCompany;
    });

    
   }
  
  logout(){
    this.auth.signOut();
  }
  ngOnInit() {
  }

}
