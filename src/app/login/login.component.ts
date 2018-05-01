import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authservice: AuthService) { }
  
  log(login){
    console.log(login);
    let email = login.emails;
    let pass = login.pass;
    this.authservice.loginWithEmail(email,pass);
  }

  ngOnInit() {
  }

}
