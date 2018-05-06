import { Component, OnInit, ViewChild, Type, NgZone, Input, ElementRef } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Subscriber } from 'rxjs/Subscriber';
import { BrowserModule } from "@angular/platform-browser";
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';
import { HaversineService, GeoCoord } from "ng2-haversine";
import { IndividualService } from './individual.service';
import { AuthService } from '../auth.service';
import { DatePipe } from '@angular/common';
declare var google: any;
@Component({
  selector: 'app-individual-form',
  templateUrl: './individual-form.component.html',
  styleUrls: ['./individual-form.component.css']
})
export class IndividualFormComponent implements OnInit {
    imageChangedEvent: any = '';
    croppedImage: any = '';
    users$;
    useris = [];
    years;
    listCategories = [];
    listGender = [];
    listAgeFrom = [];
    listAgeTo = [];
    listRadius = [];
    listTotal = [];
    coordinates = [];
    photo: boolean;
    photos;
    date = new Date();
    expired;
    offer$;
    totalUsers = [];
    length;
    constructor(private individualService: IndividualService,
      private db: AngularFireDatabase,
      private mapsAPILoader: MapsAPILoader,
      private ngZone: NgZone,
      private _haversineService: HaversineService,
      private auth: AuthService) {
        this.listTotal = [];

        this.individualService.getUsers().valueChanges().subscribe( us => {
            this.length = us.length;
            
            us.map( all => {
                this.listTotal.push(all);
            })
        })
     
      this.date.setDate( this.date.getDate() + 15 );
      this.expired = this.date.toJSON();
      
       this.auth.user$.subscribe(user => {

        this.offer$ = this.individualService.getOffer(user.uid);
       });
    
       
  }
  //----------------------------------   ImageProperties  
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
  openFormat(){
      this.photo = !this.photo;
  }
  offer:boolean;
  add(){
      this.offer = !this.offer;
      
      
  }
  //-------------Array of Categories ---- 
  selects = [
      { id: 0, name: "coffe" },
      { id: 1, name: "Gifts" },
      { id: 2, name: "food" },
      { id: 3, name: "Travel" },
      { id: 4, name: "Entertainment" },
      { id: 5, name: "Beauty" },
      { id: 6, name: "Clothes" },
  ];
  //-------------Save -------------------
  save(form) {
      let totalUsers = [];
      let offer = [];
      offer.push(form);
      let offer1 = [];
      
      this.listTotal.map(name => {
          totalUsers.push({ id: name.$key, isActive: false })
      });
      offer.map(users => {
          if(users.ageTo  == ""){
              users.ageTo = 99;
          }
          offer1 = [{
              category: users.category,
              gender: users.gender,
              age_from: users.ageFrom,
              age_To: users.ageTo,
              center_longitude: this.longitude,
              center_latitude: this.latitude,
              radius: this.dist,
              title: users.title,
          }]
      })
      let image = this.croppedImage.split(/,(.+)/)[1];
      let name = this.photos.name;
      
      this.auth.user$.subscribe(user => {
        this.individualService.Conversion(offer1,image,name,user.uid,this.listTotal,this.listTotal.length,this.expired );
      })
  }
  //---------------------------------------
  //-----------------------------------------------
  FilterByCategories(category) {
      this.listTotal = [];
      this.listCategories = [];
      this.years = 1;
      this.radiusas = 0;
      this.dist = 0;
      this.useris.map(user => {
          if (user.category === category) {
              this.listCategories.push(user);
          }
      });
      this.listTotal = this.listCategories;
      return this.listCategories, this.years;
  }
  FilterByRadius(radius) {
      this.listTotal = [];
      this.radiusas = radius * 1000;
      this.listRadius = [];
      let pins: GeoCoord = {
          latitude: this.latitude,
          longitude: this.longitude
      };
      this.listCategories.map(user => {
          if (user.latitude != null) {
              let users: GeoCoord = {
                  latitude: user.latitude,
                  longitude: user.longitude
              };
              let kilometers = this._haversineService.getDistanceInKilometers(pins, user);
              if (radius >= kilometers) {
                  this.listRadius.push(user);
              }
          }
      });
      this.listTotal = this.listRadius;
  }
  FilterByGender(event) {
      this.listGender = [];
      this.listTotal = [];
      this.years = 1;
      this.listRadius.map(name => {
          if (name.gender == event) {
              this.listGender.push(name);
          }
      })
      this.listTotal = this.listGender;
  }
  FilterByAgeFrom(age) {
      this.listTotal,this.listAgeFrom = [];
      let empty = [];
      this.listGender.length == 0 ? empty = this.listRadius : empty = this.listGender;
      empty.map(ages => {
          if (ages.age >= age) {
              this.listAgeFrom.push(ages);
          }
      })
      this.listTotal = this.listAgeFrom;
  }
  AgesTo(age) {
      //console.log(age);
  }
  //Maps --------------
  public latitude: number;
  public longitude: number;
  public zoom: number;
  private geoCoder;
  radiusas;
  dist;

  markerDragEnd(event) {
      this.latitude = event.coords.lat;
      this.longitude = event.coords.lng;
      this.coordinates = [];
      return this.coordinates.push({ latitud: this.latitude, longitud: this.longitude })
  }
  private setCurrentPosition() {
      if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition((position) => {
              this.latitude = position.coords.latitude;
              this.longitude = position.coords.longitude;
              this.zoom = 13;
          });
      }
  }

  ngOnInit() {
      this.setCurrentPosition();
      //load Places Autocomplete
      this.mapsAPILoader.load().then(() => {
          // Fetch GeoCoder for reverse geocoding
          this.geoCoder = new google.maps.Geocoder;
      });
      this.db.list('/users_info/')
      .valueChanges().subscribe(items => {
              this.useris = items;
          })
      this.zoom = 12;
      this.latitude = 54.900000;
      this.longitude = 23.900000;

  }
}
