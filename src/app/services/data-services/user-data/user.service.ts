import { Injectable } from '@angular/core';
import { User } from 'src/app/classes/user/user';
import { DatabaseService } from '../temp-data/database.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private dbService:DatabaseService
  ) { }

  updateUserDetails(user:User, new_user:User) {

    user.phonenumber = new_user.phonenumber;
    user.email = new_user.email;

    this.dbService.updateUser(user)
  }
}
