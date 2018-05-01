import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable'
import { AngularFireAuth } from 'angularfire2/auth';
import { Route, Router } from '@angular/router';
import { RouterModule } from '@angular/router'; 
import { variable } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user$: Observable<firebase.User>;
  message;
  

  constructor(private afAUth: AngularFireAuth,
    private auth: AuthService, router: Router,
    ) {
    this.user$ = afAUth.authState

  } 
    ngOnInit(){
     
    }
   

  title = 'app';
}
