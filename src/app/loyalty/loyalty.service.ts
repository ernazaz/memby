import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class LoyaltyService {
  constructor(private db: AngularFireDatabase) {
  }
  getDiscountLevels(id){
    return this.db.list('/companies_membership/'+id);
  }
  saveLevel(id,level,totalInformation){
    if (totalInformation.offer == undefined){
      return this.db.object('companies_membership/'+id+'/').update({[level]: totalInformation.points});
    } else {
       this.db.object('companies_membership/'+id+'/').update({[level]: totalInformation.points});
      this.db.list('/companies_membership_offers/'+id+'/'+level+'/').push({
        type: totalInformation.offer,
        description: totalInformation.description,
        gender: totalInformation.gender,
        age_from: totalInformation.ageFrom,
        age_to: totalInformation.ageTo,
        shortcut: totalInformation.discountSize,
      });
    } 
  }
  saveOffer(id,level,totalInformation){
    this.db.list('/companies_membership_offers/'+id+'/'+level+'/').push({
      category: totalInformation.offer,
      description: totalInformation.description,
      gender: totalInformation.gender,
      age_from: totalInformation.ageFrom,
      age_to: totalInformation.ageTo,
      shortcut: totalInformation.discountSize,
    });
  }
getLoyaltyOffer(id,level){
  return this.db.list('/companies_membership/'+id+'/'+level+'/offer/');
}
updatePoints(id,level,visits){
  this.db.object('/companies_membership/'+id+'/'+level+'/').update({visits: visits});
}
updateOffer(id,level,totalInformation,key) {
  this.db.object('/companies_membership/'+id+'/'+level+'/offer/'+key).update({
    category: totalInformation.offer,
    description: totalInformation.description,
    gender: totalInformation.gender,
    age_from: totalInformation.ageFrom,
    age_to: totalInformation.ageTo,
    shortcut: totalInformation.discountSize,
  });
}

savePrizes(id,prize){
  this.db.list('/companies_membership_prizes/'+id+'/').push({
    points: prize.neededPoints,
    short_description: prize.shortDescription,
    description: prize.description
  });
}
getPrizes(id){
  return this.db.list('/companies_membership_prizes/'+id+'/');
}
updatePrize(id,key,prize){
  return this.db.object('/companies_membership_prizes/'+id+'/'+key+'/').update({
    points: prize.neededPoints,
    short_description: prize.shortDescription,
    description: prize.description
  });
}




}
