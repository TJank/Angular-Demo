import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login-service/login.service';

@Component({
  selector: 'app-coach-navbar',
  templateUrl: './coach-navbar.component.html',
  styleUrls: ['./coach-navbar.component.css']
})
export class CoachNavbarComponent implements OnInit {

  constructor(
    private loginService:LoginService,
    private router:Router
  ) { }

  ngOnInit(): void {
    if (!this.loginService.isLoggedIn()) {
      this.router.navigateByUrl("/login");
    }

    if(!this.loginService.validateRole("COACH")) {
      this.loginService.destroySessionVariables();
      console.log('validate role failed in coach-nav')
      this.router.navigateByUrl("/");
    } else {
      this.coach_map = this.loginService.retrieveSessionVariables();
      this.role = this.coach_map.get(this.loginService.SESSION_ROLE)
      this.username = this.coach_map.get(this.loginService.SESSION_USERNAME)
      this.firstname = this.coach_map.get(this.loginService.SESSION_FIRSTNAME)
    }
    // console.log("user map values are " + this.role +", " + this.username +", " + this.firstname)
  }

  logout() {
    console.log("logout from navbar called")
    this.loginService.destroySessionVariables();
    if (!this.loginService.isLoggedIn()) {
      this.router.navigateByUrl("/login");
    }
  }

  coach_map:Map<string, string>
  username:string
  firstname:string
  role:string

}
