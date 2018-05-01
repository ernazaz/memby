import { Component, OnInit } from '@angular/core';
import { AdminBonusService } from './admin-bonus.service';


@Component({
  selector: 'app-admin-bonus',
  templateUrl: './admin-bonus.component.html',
  styleUrls: ['./admin-bonus.component.css']
})
export class AdminBonusComponent implements OnInit {
  imageChangedEvent: any = '';
  croppedImage: any = '';
  photos ;
  constructor(private adminBonusService: AdminBonusService) { }
  form: boolean;
  
  
  openForm(){
    this.form = !this.form;
  }

  fileChangeEvent(event: any) {
    this.imageChangedEvent = event;
    this.photos = event.target.files[0];
}
imageCropped(event: any) {
    this.croppedImage = event;
}
imageLoaded() {
    // show cropper
}
loadImageFailed() {
    // show message
}

save(form){
  let image = this.croppedImage.split(/,(.+)/)[1];
  let name = this.photos.name;
  this.adminBonusService.save(form,image,name);
}

  ngOnInit() {
  }

}
