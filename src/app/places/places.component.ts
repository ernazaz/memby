import { Component, OnInit } from '@angular/core';
import {  ElementRef, NgModule, NgZone, ViewChild, ApplicationRef } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, FormGroup,NgControl,Validators,NgModel } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';
import {} from '@types/googlemaps';
import { PlacesService } from './places.service';
import * as firebase from 'firebase'
import { AuthService } from '../auth.service';
import { Upload } from './upload';
import * as _ from "lodash";
import { AngularFireDatabase } from 'angularfire2/database';

declare var google: any;

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {

  locInput='';  
  public latitude: number;
  public longitude: number;
  private searchControl:FormControl;
  public zoom: number;
  public currentAddress: string;
  private geoCoder;
  private latlng;
  pins$;
  uid;


  @ViewChild("search")
  private searchElementRef: ElementRef;
  places$;
  myPins = [];
  allPlaces=[];
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private placesService: PlacesService,
    private auth: AuthService,
    private db: AngularFireDatabase
 )
  {
   
   this.auth.user$.subscribe(user => {
     if (user){
      this.uid = user.uid;
      this.placesService.getPlace().valueChanges().subscribe(user => {
       this.allPlaces=[];
       user.map( place => {
         //if(place.companyId == this.uid){
         //  this.allPlaces.push(place);
        // }
       })
      })
     }
     return null;
 
   })

  }
  add: boolean = false;
  edit: boolean = false;
  // For click button to add new Pin
  create(){
    this.information = {};
    this.weekday = {};
    this.edit = false;
    this.add = true;
    
      this.setCurrentPosition();
      
   //set google maps defaults
   this.zoom = 12;
   this.latitude = 54.900000;
   this.longitude = 23.900000;
   //create search FormControl
   this.searchControl = new FormControl();
   //load Places Autocomplete
   this.mapsAPILoader.load().then(() => {
     // Fetch GeoCoder for reverse geocoding
     this.geoCoder = new google.maps.Geocoder;
     let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
       types: ["geocode"]
     });
     autocomplete.addListener("place_changed", () => {
       this.ngZone.run(() => {
         //get the place result
         let place: google.maps.places.PlaceResult = autocomplete.getPlace();
         this.latlng = new google.maps.LatLng( this.latitude, this.longitude);
         //verify result
         if (place.geometry === undefined || place.geometry === null) {
           return;
         }
         //set latitude, longitude and zoom
         this.latitude = place.geometry.location.lat();
         this.longitude = place.geometry.location.lng();
         this.zoom = 12;
       });
     });
   });
 
  }

  ngOnInit() {
    
  }
  changes:boolean = false;
  change(){
    console.log(this.changes," --s");
    this.changes = !this.changes;
  }
  markerDragEnd(event) {
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
  }
  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 13;
        this.mapsAPILoader.load().then(() => {
          // Fetch GeoCoder for reverse geocoding
          this.geoCoder = new google.maps.Geocoder;
          let geocoder = new google.maps.Geocoder();
          let latlng = new google.maps.LatLng(this.latitude, this.longitude);
          let request = { latLng: latlng };
        })
      });
    }
  }
//-------- All operations
 //----- Work Time
monday: boolean; tuesday: boolean; wednesday: boolean; thursday: boolean; friday: boolean; saturday: boolean; sunday:boolean;
mondayWork: Boolean = true; tuesdayWork: Boolean = true; wednesdayWork: Boolean = true; thursdayWork: Boolean = true; fridayWork: Boolean = true; saturdayWork: Boolean = true; sundayWork: Boolean = true;
mondayTo; mondayFrom; tuesdayFrom; tuesdayTo; wednesdayFrom; wednesdayTo; thursdayFrom; thursdayTo; fridayFrom; fridayTo; saturdayTo; saturdayFrom; sundayFrom; sundayTo;

mondays(){
  this.tuesday = false; this.wednesday= false;this.thursday= false;this.friday= false;this.saturday= false;this.sunday = false;
  this.monday = !this.monday;
}
tuesdays(){
  this.monday = false; this.wednesday= false;this.thursday= false;this.friday= false;this.saturday= false;this.sunday = false;
  this.tuesday = !this.tuesday;
}
wednesdays(){
  this.tuesday = false; this.monday= false;this.thursday= false;this.friday= false;this.saturday= false;this.sunday = false;
  this.wednesday = !this.wednesday;
}
thursdays(){
  this.tuesday = false; this.wednesday= false;this.monday= false;this.friday= false;this.saturday= false;this.sunday = false;
  this.thursday = !this.thursday;
}
fridays(){
  this.tuesday = false; this.wednesday= false;this.thursday= false;this.monday= false;this.saturday= false;this.sunday = false;
  this.friday = !this.friday;
}
saturdays(){
  this.tuesday = false; this.wednesday= false;this.thursday= false;this.friday= false;this.monday= false;this.sunday = false;
  this.saturday = !this.saturday;
}
sundays(){
  this.tuesday = false; this.wednesday= false;this.thursday= false;this.friday= false;this.saturday= false;this.monday = false;
  this.sunday = !this.sunday;
}
freeM(){
  this.mondayWork = false;
  this.mondayFrom = "Nedirba";
}
freeTue(){
  this.tuesdayWork = false;
  this.tuesdayFrom = "Nedirba";
}
freeWed(){
  this.wednesdayWork = false;
  this.wednesdayFrom = "Nedirba";
}
freeThur(){
  this.thursdayWork = false;
  this.thursdayFrom = "Nedirba";
}
freeFri(){
  this.fridayWork = false;
  this.fridayFrom = "Nedirba";
}
freeSat(){
  this.saturdayWork = false;
  this.saturdayFrom = "Nedirba";
}
freeSun(){
  this.sundayWork = false;
  this.sundayFrom = "Nedirba";
}
workM(){
  this.mondayWork = true;
}
workTue(){
  this.tuesdayWork = true;
}
workWed(){
  this.wednesdayWork = true;
}
workThur(){
  this.thursdayWork = true;
}
workFri(){
  this.fridayWork = true;
}
workSat(){
  this.saturdayWork = true;
}
workSun(){
  this.sundayWork = true;
}
Mondayz(mond){
console.log(mond, "sssss");
}
//--------------------------------------------------------
//---------- Photos --------------------
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
selects = [
  {id: 0, name:"Coffe" },
  {id: 1, name:"Gifts" },
  {id: 2, name:"Food" },
  {id: 3, name:"Travel" },
  {id: 4, name:"Entertainment" },
  {id: 5, name:"Beauty" },
  {id: 6, name:"Clothes" },
]

save(form){
  let total = [];
  let file = this.selectedFiles.item(0)
  this.currentUpload = new Upload(file);
//--- Push to array all information
  let workTime=[];
   total.push({
      name: form.name,
      latitude: this.latitude,
      longitude: this.longitude,
      category: form.category,
      description: form.description,
      mondayFrom: this.mondayFrom === "Nedirba" ?   this.mondayFrom : this.mondayFrom,
      mondayTo: this.mondayFrom === "Nedirba" ?   "" : this.mondayTo,
      tuesdayFrom: this.tuesdayFrom === "Nedirba" ?   this.tuesdayFrom : this.tuesdayFrom,
      tuesdayTo: this.tuesdayFrom === "Nedirba" ?   "" : this.tuesdayTo,
      wednesdayFrom: this.wednesdayFrom === "Nedirba" ?   this.wednesdayFrom : this.wednesdayFrom,
      wednesdayTo: this.wednesdayFrom === "Nedirba" ?   "" : this.wednesdayTo,
      thursdayFrom: this.thursdayFrom === "Nedirba" ?   this.thursdayFrom : this.thursdayFrom,
      thursdayTo: this.thursdayFrom === "Nedirba" ?   "" : this.thursdayTo,
      fridayFrom: this.fridayFrom === "Nedirba" ?   this.fridayFrom : this.fridayFrom,
      fridayTo: this.fridayFrom === "Nedirba" ?   "" : this.fridayTo,
      saturdayFrom: this.saturdayFrom === "Nedirba" ?   this.saturdayFrom : this.saturdayFrom,
      saturdayTo: this.saturdayFrom === "Nedirba" ?   "" : this.saturdayTo,
      sundayFrom: this.sundayFrom === "Nedirba" ?   this.sundayFrom : this.sundayFrom,
      sundayTo: this.sundayFrom === "Nedirba" ?   "" : this.sundayTo,
    }) 
 
  this.auth.user$.subscribe(user => {
   // this.placesService.save(total,this.currentUpload,user.uid);
  })
  console.log(total,"----");
}
// Time array-------
times =[
  {id: '00:00', name: '00:00'},
  {id: '00:30', name: '00:30'},
  {id: '01:00', name: '01:00'},
  {id: '01:30', name: '01:30'},
  {id: '02:00', name: '02:00'},
  {id: '02:30', name: '02:30'},
  {id: '03:00', name: '03:00'},
  {id: '03:30', name: '03:30'},
  {id: '04:00', name: '04:00'},
  {id: '04:30', name: '04:30'},
  {id: '05:00', name: '05:00'},
  {id: '05:30', name: '05:30'},
  {id: '06:00', name: '06:00'},
  {id: '06:30', name: '06:30'},
  {id: '07:00', name: '07:00'},
  {id: '07:30', name: '07:30'},
  {id: '08:00', name: '08:00'},
  {id: '08:30', name: '08:30'},
  {id: '09:00', name: '09:00'},
  {id: '09:30', name: '09:30'},
  {id: '10:00', name: '10:00'},
  {id: '10:30', name: '10:30'},
  {id: '11:00', name: '11:00'},
  {id: '11:30', name: '11:30'},
  {id: '12:00', name: '12:00'},
  {id: '12:30', name: '12:30'},
  {id: '13:00', name: '13:00'},
  {id: '13:30', name: '13:30'},
  {id: '14:00', name: '14:00'},
  {id: '14:30', name: '14:30'},
  {id: '15:00', name: '15:00'},
  {id: '15:30', name: '15:30'},
  {id: '16:00', name: '16:00'},
  {id: '16:30', name: '16:30'},
  {id: '17:00', name: '17:00'},
  {id: '17:30', name: '17:30'},
  {id: '18:00', name: '18:00'},
  {id: '18:30', name: '18:30'},
  {id: '19:00', name: '19:00'},
  {id: '19:30', name: '19:30'},
  {id: '20:00', name: '20:00'},
  {id: '20:30', name: '20:30'},
  {id: '21:00', name: '21:00'},
  {id: '21:30', name: '21:30'},
  {id: '22:00', name: '22:00'},
  {id: '22:30', name: '22:30'},
  {id: '23:00', name: '23:00'},
  {id: '23:30', name: '23:30'},
  {id: '24:00', name: '24:00'},
];
//---------------
information = {};
weekday = {};
address;
places(place){
  this.weekday = {};
  this.add = false;
  this.edit = true;

  place.workTime.map(week => {
    this.weekday = week;
  })
  this.information = place ;
  
  //set google maps defaults
  this.zoom = 12;
  this.latitude = place.latitude;
  this.longitude = place.longitude;
  //create search FormControl
  this.searchControl = new FormControl();
  
  this.mapsAPILoader.load().then(() => {
    // Fetch GeoCoder for reverse geocoding
    this.geoCoder = new google.maps.Geocoder;
    let latlng = new google.maps.LatLng(place.latitude, place.longitude);
    let request = { latLng: latlng };

    this.geoCoder.geocode({'location': {lat: place.latitude, lng: place.longitude }}, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.address = results[0].formatted_address;
          this.searchElementRef.nativeElement.value = results[0].formatted_address;
        } 
      } 
    }); 
  })



} 

}
