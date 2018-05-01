import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import * as firebase from 'firebase/app';
import { AuthService } from '../auth.service';
import { WorkersService } from './workers.service';
@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.css']
})
export class WorkersComponent implements OnInit {
  private config = environment.firebase;
  workers = [];
  show:boolean;
 
  constructor(private auth: AuthService,
  private workerService: WorkersService) {
    this.workers = [];
    this.auth.user$.subscribe(user => {
      this.workerService.getWorkers(user.uid).subscribe(user => {
        user.map( each => {
          this.workers.push(each);
        })
      })
     })
   }

   add(){
     this.show = !this.show;
   }
  
  register(form){
    console.log(form);
    let emails= form.email;
    let passwords = form.password;

     this.auth.user$.subscribe(user => {
      this.workerService.addWorker(emails,passwords,user.uid);
      this.workers=[];
     })
  }
  actions(worker){
    console.log(worker.$key,"----");

  }
  delete(worker){
    console.log(worker," ssss");
    let user = worker.$key;
    user.delete().then(function() {
      // User deleted.
    }).catch(function(error) {
      console.log(error);
    });
  }

  ngOnInit() {
  }

}
