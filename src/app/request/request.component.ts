import { Component, OnInit } from '@angular/core';
import { RequestService } from './request.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  requests = [];
  userKey;
  discountKeys = [];
  userInfo = {};
  constructor(private requestService: RequestService) {
    this.requests = [];
    this.requestService.getRequest().valueChanges().subscribe( pin => {
      pin.map( req => {
        let deadLine = new Date();
        this.requests.push(req);
      })
    })
    this.requests.map( gg => {
      console.log(gg," -----");
    })
   }

  information(request) {
    this.userInfo = {};
    this.discountKeys = [];
    this.userKey = request.userKey;
    let key = request.$key;
    this.requestService.discountKey(key).valueChanges().subscribe(keys => {
      keys.map(keyz => {
        this.requestService.discountInfo(keyz)
        .valueChanges().subscribe(info => {
            this.discountKeys.push(info);
          })

      })
      this.requestService.userInfo(this.userKey).valueChanges().subscribe(user => {
        this.userInfo = user;
      })
    });
  }

  done(sum){
    console.log(sum);
  }

  ngOnInit() {
  }

}
