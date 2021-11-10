import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user/user';
import { DatabaseService } from 'src/app/services/data-services/temp-data/database.service';
import { UserService } from 'src/app/services/data-services/user-data/user.service';
import { LoginService } from 'src/app/services/login-service/login.service';
import { SessionService } from 'src/app/services/session-service/session.service';

@Component({
  selector: 'app-user-edit-profile-page',
  templateUrl: './user-edit-profile-page.component.html',
  styleUrls: ['./user-edit-profile-page.component.css']
})
export class UserEditProfilePageComponent implements OnInit {

  constructor(
    private loginService:LoginService,
    private router:Router,
    private sessionService:SessionService,
    private userService:UserService,
    private dbService:DatabaseService
  ) { }

  ngOnInit(): void {
    if (!this.loginService.isLoggedIn()) {
      this.router.navigateByUrl("/login");
    }
    
    if(!this.loginService.validateRole("USER")) {
      this.loginService.destroySessionVariables();
      console.log('validate role failed in user-home')
      this.router.navigateByUrl("/");
    } else {
      this.user_map = this.loginService.retrieveSessionVariables();
      this.role = this.user_map.get(this.loginService.SESSION_ROLE)
      this.username = this.user_map.get(this.loginService.SESSION_USERNAME)
      this.firstname = this.user_map.get(this.loginService.SESSION_FIRSTNAME)
      this.sessionService.setCurrentUser(this.username)

      this.email = this.sessionService.current_user.email;
      this.phonenumber = this.sessionService.current_user.phonenumber;
      this.lastname = this.sessionService.current_user.lastname;
    }
  }

  user_map:Map<string, string>;
  username:string;
  firstname:string;
  lastname:string;
  role:string;
  email:string;
  phonenumber:string;

  returnedUser:User;


  saveUserDetails() {
    console.log("update user details!");
    var temp_user = new User(0, this.sessionService.current_user.username, this.email, "", "", "", this.phonenumber, "") 

    this.userService.updateUserDetails(this.sessionService.current_user, temp_user);

    // re-load user with new details and re-generate the page...
    this.returnedUser = this.dbService.findUser(this.sessionService.current_user);
    this.sessionService.setCurrentUser(this.returnedUser.username);

    this.email = this.sessionService.current_user.email;
    this.phonenumber = this.sessionService.current_user.phonenumber;
    this.lastname = this.sessionService.current_user.lastname;
    if(this.sessionService.current_user.email === temp_user.email && this.sessionService.current_user.phonenumber === temp_user.phonenumber) {
      window.alert("Save Successful!")
    }
  }
}
