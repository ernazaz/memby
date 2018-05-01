import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup } from '@angular/forms';
import { DiscountsService } from './discounts.service';
import { AuthService } from '../auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.css']
})
export class DiscountsComponent implements OnInit {
  uid;
  places = [];
  total = [];
  today;
  logo;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  photos;
  companyName;
  constructor(private discountService: DiscountsService,
    private auth: AuthService) {
    this.today = new Date();
    //------- Check all discount and delete expired 
    this.discountService.getAll()
      .subscribe(pin => {
        pin.map(all => {
          let deadLine: any = new Date(all.date);
          if ((deadLine - this.today) <= 0) {
            this.discountService.removeExpiredDate(all.$key, all,all.companyKey);
          }
        })
      })
    //------ Get All pins
    this.auth.user$.subscribe(user => {
      if (user) {
        this.uid = user.uid;
        this.discountService.getPlaces().subscribe(user => {
          this.places = [];
          user.map(place => {
            if (place.companyId == this.uid) {
              this.places.push(place);
            }
          })
        })
      }
      return null;
    })
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

  offer: boolean;
  add() {
    this.offer = !this.offer;
  }

  discountKey;
  keys;
  forms;
  disc = {};
  edit: boolean;
  button: boolean;
  //---- Here show or hide discounts
  show() {
    this.edit = false;
    this.forms = !this.forms;
    this.disc = {};
    this.croppedImage = null;
    this.imageChangedEvent = null;
  }
  // ----- Discount Information
  pinInfo(pin) {
    this.forms = false;
    this.edit = false;
    this.button = true;
    this.discountKey = pin.$key;
    this.total = [];
    let objekt;
    this.logo = pin.logo;
    this.companyName = pin.name;
    //----- Here get all discount by Pins
    this.discountService.getKeys(this.discountKey)
      .subscribe(Id => {
        Id.map(keys => {
          this.discountService.getDiscount(keys.$key).subscribe(
            discount => {
              this.total.push(discount);
            })
        })
      })

  }
  //-----Save Discount
  save(discounts) {
    let key;
    let image = this.croppedImage.split(/,(.+)/)[1];
    let name = this.photos.name;
    this.auth.user$.subscribe(user => {
      this.discountService.save(discounts, this.discountKey, user.uid, image, name, this.logo, this.companyName);
    })
  }
  // Get Information about discount ----
  getDiscount(discout) {
    this.disc = discout;
    this.keys = discout.$key;
    this.forms = false;
    this.edit = true;
  }
  //----- Update Discount --------
  update(discount) {
    console.log(discount);
    this.discountService.update(discount, this.discountKey, this.keys);
  }

  ngOnInit() {
  }

}
