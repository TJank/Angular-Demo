import { Injectable } from '@angular/core';
import { User } from 'src/app/classes/user/user';
import { DatabaseService } from '../data-services/temp-data/database.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private dbService:DatabaseService) { }

  ngOnInit() {
  }

  loginUser(user:User) {
    var temp_user;
    if(user.email.length > 0) {
      // find user by email
    } else if (user.username.length > 0) {
      temp_user = this.dbService.findUser(user)
      if(temp_user != null) {
        console.log('found user...' + temp_user.username)
        if(temp_user.password === user.password) {
          // login successful
          console.log('success login!')
          return true
        } else {
          console.log('passwords dont match')
          return false
        }
      }
    }

  }

}
