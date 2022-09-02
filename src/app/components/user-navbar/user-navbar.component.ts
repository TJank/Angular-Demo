import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login-service/login.service';
import { SessionService } from 'src/app/services/session-service/session.service';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})
export class UserNavbarComponent implements OnInit {

  constructor(
    private loginService:LoginService,
    private router:Router,
    private sessionService:SessionService
    ) { }

  ngOnInit(): void {
    if (!this.loginService.isLoggedIn()) {
      this.router.navigateByUrl("/login");
    }
    
    if(!this.loginService.validateRole("USER")) {
      this.loginService.destroySessionVariables();
      console.log('validate role failed in user-navbar')
      this.router.navigateByUrl("/");
    } else {
      this.user_map = this.loginService.retrieveSessionVariables();
      this.role = this.user_map.get(this.loginService.SESSION_ROLE)
      this.username = this.user_map.get(this.loginService.SESSION_USERNAME)
      this.firstname = this.user_map.get(this.loginService.SESSION_FIRSTNAME)
    }
  }

  user_map:Map<string, string>
  username:string
  firstname:string
  role:string

  logout() {
    console.log("logout from navbar called")
    this.loginService.destroySessionVariables();
    if(!this.loginService.isLoggedIn()) {
      this.router.navigateByUrl("/login");
    }  
  }
}
