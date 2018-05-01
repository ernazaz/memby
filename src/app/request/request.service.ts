import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class RequestService {

  constructor(private db: AngularFireDatabase) { }

  getRequest(){
    return this.db.list('/discount_requests/company_id/');
  }
  userInfo(id){
    return this.db.object('users_info/'+id);
  }
  discountKey(id){
    return this.db.list('/discount_requests/company_id/'+id+"/discounts/");
  }
  discountInfo(id){
    return this.db.object('small_discounts/'+id);
  }

}
