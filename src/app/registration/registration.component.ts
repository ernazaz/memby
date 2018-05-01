import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private authservice: AuthService) { }

  register(form){
    console.log(form);
    let email= form.email;
    let password = form.passwords;
    this.authservice.signUpWithEmail(email,password,form);
  }

  ngOnInit() {
  }

}
