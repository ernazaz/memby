import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';
import { Location } from '@angular/common';
import { LoyaltyService } from './loyalty.service';
import { AuthService } from '../auth.service';
import { Observable } from '@firebase/util';
import { AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-loyalty',
  templateUrl: './loyalty.component.html',
  styleUrls: ['./loyalty.component.css']
})

export class LoyaltyComponent implements OnInit {
  openForm: boolean = false;
  editForm: boolean = false;
  prizesForm:boolean = false;
  openOfferForm: boolean = false;
  editOfferForm: boolean = false;
  loyaltyLevels$;
  prizes = {};
  loyaltyOffers$;
  level;
  key;
  leveliai = [];
  loyaltLevel;
  offerLength;
  levelInformation = {};
  totalInformation = {};
  addButton: boolean = true;
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
     
        this.loyaltyService.getPrizes(user.uid).valueChanges().subscribe( prize => {
          console.log(prize," ---- ziuras---",user.uid);
          this.prizes = prize;
        })
        console.log(this.loyaltyService.getPrizes(user.uid),"-----");
        this.loyaltyService.getDiscountLevels(user.uid).valueChanges().subscribe( offer => {
          this.level = offer.length +1;
        })
        this.leveliai = [];
         this.loyaltyService.getDiscountLevels(user.uid).valueChanges().subscribe( level => {
            level.map( one => {
              this.leveliai.push(one);
            } )
         })
      }
    })
  }
  addLevel() {
    this.prizesForm = false;
    this.levelInformation ={};
    this.totalInformation = {};
    this.loyaltLevel = null;
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
      console.log("saveLevelis -->  ",user.uid,this.level,levelInfo);
    // this.loyaltyService.saveLevel(user.uid,this.level,levelInfo)
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
      console.log("saveOfferis---->",user.uid,this.loyaltLevel,offer);
   //  this.loyaltyService.saveOffer(user.uid,this.loyaltLevel,offer)
    });
  }
  
  levelInfo(level){
    this.levelInformation = {};
    this.totalInformation = {};
    this.prizesForm = false;
    this.openOfferForm = false;
    this.editOfferForm = false;
    this.openForm = false;
    this.editForm = true;
    this.levelInformation = level;
    this.loyaltLevel= level.$key;
    console.log(this.loyaltLevel,"------- loyaltLeve");
    this.auth.user$.map(user => {
      if (user) {
        this.loyaltyOffers$ = this.loyaltyService.getLoyaltyOffer(user.uid,this.loyaltLevel);
        this.loyaltyService.getLoyaltyOffer(user.uid,this.loyaltLevel).valueChanges().subscribe(
          length=> { this.offerLength = length.length });
      }
    })

  }
  offerForm(){
    this.prizesForm = false;
    this.totalInformation = {};
    this.addButton = !this.addButton;
    this.editOfferForm = false;
    this.openOfferForm = !this.openOfferForm;
    
  }
  offerInformation(offer){
    this.prizesForm = false;
    this.openOfferForm = false;
    this.editOfferForm = !this.editOfferForm;
    this.totalInformation = offer;
    this.key = offer.$key;
  }
  updatePoints(visits){
    console.log(visits.visits," skaicius");
    this.auth.user$.subscribe(user => {
      if (user) {
      this.loyaltyService.updatePoints(user.uid,this.loyaltLevel,visits.visits);
      }});
  }
  updateOffer(offer){

    this.auth.user$.subscribe(user => {
      this.loyaltyService.updateOffer(user.uid,this.loyaltLevel,offer, this.key)
    });
  }

  //---------------------Prizes
  showPrizesForm:boolean;
  editPrize:boolean;
  showPrizesForms(){
  this.showPrizesForm = !this.showPrizesForm;
  this.editPrize = false;
  }
  addPrizesForm(){
    this.infoPrizes = {};
    this.editPrize = false;
    this.editForm =false;
    this.openForm =false;
    this.editOfferForm = false;
    this.openOfferForm = false;
    this.prizesForm = !this.prizesForm;
  }
  savePrizes(prize){
 
    this.auth.user$.subscribe(user => {
      this.loyaltyService.savePrizes(user.uid,prize)
    });
  }
  infoPrizes = {};
  private prizeKey;
  prizeInfo(prize){
    console.log(prize.$key,"------");
    this.prizeKey = prize.$key;
    this.infoPrizes = {};
    this.showPrizesForm = false;
    this.editPrize = true;
    this.infoPrizes = prize;
  }
  updatePrize(prize){
    this.auth.user$.subscribe(user => {
      this.loyaltyService.updatePrize(user.uid,this.prizeKey,prize)
    });
  }
  ngOnInit() {
  }

}
