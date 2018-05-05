import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

@Injectable()
export class AdminAuthGuard  {

  // Reik implementuot implements CanActivate
  constructor(private auth: AuthService) { }

 /*canActivate(): Observable<boolean> {
  return this.auth.appUsers$
  .map(appUser => appUser.isCompany)
}*/
  
}
