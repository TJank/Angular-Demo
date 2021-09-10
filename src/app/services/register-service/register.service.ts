import { Injectable } from '@angular/core';
import { User } from 'src/app/classes/user/user';
import { DatabaseService } from '../data-services/temp-data/database.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private dbService:DatabaseService) { }

  registerUser(user:User) {
    this.dbService.addDemoUser(user)
  }

}
