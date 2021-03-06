import { Injectable } from '@angular/core';
import { Admin } from 'src/app/classes/admin/admin';
import { Coach } from 'src/app/classes/coach/coach';
import { User } from 'src/app/classes/user/user';
import { DatabaseService } from '../data-services/temp-data/database.service';
import { SessionService } from '../session-service/session.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public readonly SESSION_ROLE = 'ROLE';
  public readonly SESSION_USERNAME = 'USERNAME';
  public readonly SESSION_FIRSTNAME = 'FIRST_NAME';
  public readonly SESSION_EMAIL = 'EMAIL'

  private readonly ROLE_COACH = "COACH";
  private readonly ROLE_USER = "USER";
  private readonly ROLE_ADMIN = "ADMIN"

  constructor(private dbService:DatabaseService,
    private sessionService:SessionService) { }

  ngOnInit() {
  }

  loginUser(user:User) {
    var temp_user;
    if(user.email.length > 0) {
      // find user by email
      temp_user = this.dbService.findUserByEmail(user)
      if(temp_user != null) {
        console.log('found user...' + temp_user.username)
        if(temp_user.password === user.password) {
          // login successful
          this.sessionService.current_user = temp_user;
          this.createSessionVariables(this.ROLE_USER, temp_user.username, temp_user.firstname, "");
          console.log('success login!')
          return true
        } else {
          console.log('passwords dont match')
          return false
        }
      }
    } else if (user.username.length > 0) {
      temp_user = this.dbService.findUser(user)
      if(temp_user != null) {
        console.log('found user...' + temp_user.username)
        if(temp_user.password === user.password) {
          // login successful
          this.createSessionVariables(this.ROLE_USER, temp_user.username, temp_user.firstname, "")
          console.log('success login!')
          return true
        } else {
          console.log('passwords dont match')
          return false
        }
      }
    }
  }

  loginAdmin(admin:Admin) {
    var temp_admin = this.dbService.findAdmin(admin);
    if(temp_admin != null) {
      if(temp_admin.password === admin.password) {
        // login successful
        this.createSessionVariables(this.ROLE_ADMIN, temp_admin.username, temp_admin.firstname, temp_admin.email);
        console.log('success login!')
        return true
      } else {
        console.log('passwords dont match')
        return false
      }
    }
  }

  loginCoach(coach:Coach) {
    var temp_coach = this.dbService.findCoach(coach);
      if(temp_coach != null) {
        if(temp_coach.password === coach.password) {
          // login successful
          this.createSessionVariables(this.ROLE_COACH, "", temp_coach.firstname, temp_coach.email);
          console.log('success login!')
          return true
        } else {
          console.log('passwords dont match')
          return false
        }
      }
    

  }

  createSessionVariables(role:string, username:string, firstName:string, email:string) {
    this.destroySessionVariables()
    localStorage.setItem(this.SESSION_ROLE, role);
    localStorage.setItem(this.SESSION_FIRSTNAME, firstName);
    console.log("first name = " + localStorage.getItem(this.SESSION_FIRSTNAME))
    if(role !== "COACH") {
      localStorage.setItem(this.SESSION_USERNAME, username)
    } else {
      localStorage.setItem(this.SESSION_EMAIL, email)
    }
  }

  destroySessionVariables() {
    localStorage.removeItem(this.SESSION_ROLE);
    localStorage.removeItem(this.SESSION_FIRSTNAME);
    if(localStorage.getItem(this.SESSION_USERNAME) !== null) {
      localStorage.removeItem(this.SESSION_USERNAME);
    }
    if(localStorage.getItem(this.SESSION_EMAIL) !== null) {
      localStorage.removeItem(this.SESSION_EMAIL);
    }
  }

  isLoggedIn() {
    if(localStorage.getItem(this.SESSION_ROLE) !== null && localStorage.getItem(this.SESSION_FIRSTNAME) !== null) {
      return true
    } else {
      return false
    }
  }

  validateRole(role:string) {
    return localStorage.getItem(this.SESSION_ROLE) === role
  }

  retrieveSessionVariables() {
    var role = localStorage.getItem(this.SESSION_ROLE);
    var firstname = localStorage.getItem(this.SESSION_FIRSTNAME);
    var username = localStorage.getItem(this.SESSION_USERNAME);
    var email = localStorage.getItem(this.SESSION_EMAIL)
    return new Map([
      [this.SESSION_ROLE, role],
      [this.SESSION_USERNAME, username],
      [this.SESSION_FIRSTNAME, firstname],
      [this.SESSION_EMAIL, email]
    ])

  }

}
