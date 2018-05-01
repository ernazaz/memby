import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase'

@Injectable()
export class UserService {

  constructor(private db: AngularFireDatabase) { }

}
