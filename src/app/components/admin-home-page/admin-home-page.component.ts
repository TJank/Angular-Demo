import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Coach } from 'src/app/classes/coach/coach';
import { User } from 'src/app/classes/user/user';
import { DatabaseService } from 'src/app/services/data-services/temp-data/database.service';
import { LoginService } from 'src/app/services/login-service/login.service';

@Component({
  selector: 'app-admin-home-page',
  templateUrl: './admin-home-page.component.html',
  styleUrls: ['./admin-home-page.component.css']
})
export class AdminHomePageComponent implements OnInit {

  constructor(
    private loginService:LoginService,
    private router:Router,
    private dbService:DatabaseService
  ) { }

  ngOnInit(): void {

    if (!this.loginService.isLoggedIn()) {
      this.router.navigateByUrl("/");
    }

    if(!this.loginService.validateRole("ADMIN")) {
      this.loginService.destroySessionVariables();
      console.log('validate role failed in coach-nav')
      this.router.navigateByUrl("/");
    } else {
      this.adminMap = this.loginService.retrieveSessionVariables();
      this.role = this.adminMap.get(this.loginService.SESSION_ROLE)
      this.username = this.adminMap.get(this.loginService.SESSION_USERNAME)
      this.firstname = this.adminMap.get(this.loginService.SESSION_FIRSTNAME)

      this.users = this.dbService.demo_users;
      this.coaches = this.dbService.demo_coaches;
    }

  }

  adminMap:Map<string, string>
  username:string
  firstname:string
  role:string

  users:User[] = [];
  coaches:Coach[] = [];



}
