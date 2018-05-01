import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';
import { Location } from '@angular/common';
import { LoyaltyService } from './loyalty.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-loyalty',
  templateUrl: './loyalty.component.html',
  styleUrls: ['./loyalty.component.css']
})

export class LoyaltyComponent implements OnInit {
  openForm: boolean = false;
  editForm: boolean = false;
  openOfferForm: boolean = false;
  editOfferForm: boolean = false;
  loyaltyLevels$;
  loyaltyOffers$;
  level;
  key;
  loyaltLevel;
  offerLength;
  levelInformation = {};
  totalInformation = {};
  discountTypes  = [
    { id: 1, name: 'Procentine nuolaida'},
    { id: 2, name: 'Skaitine nuolaida'},
    { id: 3, name: 'Renginys'},
    { id: 4, name: 'Speciali nuolaida'},
    { id: 5, name: 'Kita'},
   ];
  constructor(private loyaltyService: LoyaltyService,
    private auth: AuthService)
     {
    this.auth.user$.subscribe(user => {
      if (user) {
        this.loyaltyService.getDiscountLevels(user.uid).subscribe( offer => {
          this.level = offer.length +1;
        })
        this.loyaltyLevels$ = this.loyaltyService.getDiscountLevels(user.uid);
      }
    })
  }
  addLevel() {
    this.levelInformation ={};
    this.totalInformation = {};
    this.openOfferForm = false;
    this.editOfferForm = false;
    this.editForm = false;
    this.openForm = !this.openForm;
  }
  saveLevel(levelInfo){
    if (levelInfo.ageFrom == ''){
      levelInfo.ageFrom = 1;
      if (levelInfo.ageTo == ''){
        levelInfo.ageTo = 99;
      }
    } else  if (levelInfo.ageTo == ''){
      levelInfo.ageTo = 99;
    }
    this.auth.user$.subscribe(user => {
      this.loyaltyService.saveLevel(user.uid,this.level,levelInfo)
    });
  }
  saveOffer(offer){
    if (offer.ageFrom == undefined){
      offer.ageFrom = 1;
      if (offer.ageTo == undefined){
        offer.ageTo = 99;
      }
    } else  if (offer.ageTo == undefined){
      offer.ageTo = 99;
    }
    this.auth.user$.subscribe(user => {
      this.loyaltyService.saveOffer(user.uid,this.loyaltLevel,offer)
    });
  }
  
  levelInfo(level){
    this.levelInformation = {};
    this.totalInformation = {};
   
    console.log("viends du ");
    this.openOfferForm = false;
    this.editOfferForm = false;
    this.openForm = false;
    this.editForm = true;
    this.levelInformation = level;
    this.loyaltLevel= level.level;
    this.auth.user$.subscribe(user => {
      if (user) {
        this.loyaltyOffers$ = this.loyaltyService.getLoyaltyOffer(user.uid,this.loyaltLevel);
        this.loyaltyService.getLoyaltyOffer(user.uid,this.loyaltLevel).subscribe(
          length=> { this.offerLength = length.length });
      }
    })

  }
  offerForm(){
    this.totalInformation = {};
    this.editOfferForm = false;
    this.openOfferForm = !this.openOfferForm;
  }
  offerInformation(offer){
    this.openOfferForm = false;
    this.editOfferForm = !this.editOfferForm;
    this.totalInformation = offer;
    this.key = offer.$key;
  }
  updateVisits(visits){
    console.log(visits.visits," skaicius");
    this.auth.user$.subscribe(user => {
      if (user) {
      this.loyaltyService.updateVisits(user.uid,this.loyaltLevel,visits.visits);
      }});
  }
  updateOffer(offer){

    this.auth.user$.subscribe(user => {
      this.loyaltyService.updateOffer(user.uid,this.loyaltLevel,offer, this.key)
    });
  }
  ngOnInit() {
  }

}
