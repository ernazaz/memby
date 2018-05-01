import { Component, OnInit } from '@angular/core';

import { Upload } from '../places/upload';
import { AuthService } from '../auth.service';
import { ReturnService } from './return.service';
@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.css']
})
export class ReturnComponent implements OnInit {
  items$;
  items=[];
  addForm:boolean = false;
  view:boolean = false;
  constructor(public auth: AuthService, public returnService: ReturnService) {

    this.auth.user$.subscribe(user => {
      this.items$ = this.returnService.getItems(user.uid);
    
   })
  }
  url;
  selectedFiles: FileList;
  currentUpload: Upload;
  

    detectFiles(event) {
      this.selectedFiles = event.target.files;
      let reader = new FileReader();
    reader.onload = (event: any) => {
      this.url = event.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);
  }
 
  addForms(){
    this.information = {};
    this.view = false;
    this.addForm = !this.addForm;
  }
  viewItem(){
    this.addForm = false;
    this.view = !this.view;
  }
  
  return(item){
    let file = this.selectedFiles.item(0)
    this.currentUpload = new Upload(file);
    this.auth.user$.subscribe(user => {
      this.returnService.save(user.uid,this.currentUpload,item);
    })
    console.log(this.currentUpload);
  }
information ={};
  info(item){
    this.information = item;

  }

  ngOnInit() {
  }

}
