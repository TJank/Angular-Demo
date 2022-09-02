import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Session } from 'src/app/classes/session/session';
import { DatabaseService } from 'src/app/services/data-services/temp-data/database.service';
import { LoginService } from 'src/app/services/login-service/login.service';
import { SessionService } from 'src/app/services/session-service/session.service';

@Component({
  selector: 'app-user-home-page',
  templateUrl: './user-home-page.component.html',
  styleUrls: ['./user-home-page.component.css']
})
export class UserHomePageComponent implements OnInit {

  constructor(
    private loginService:LoginService,
    private router:Router,
    private sessionService:SessionService,
    private dbService:DatabaseService
  ) { }

  ngOnInit(): void {
    this.dbService.generateSessionData()
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
    }

    this.getCurrentWeek();
    this.getUserSessions();
  }

  user_map:Map<string, string>
  username:string
  firstname:string
  role:string

  one_week:String[] = [];

  user_sessions:Session[] = [];

  pendingSessions:Session[] = [];
  acceptedSessions:Session[] = [];
  completedOrCancelledSessions:Session[] = [];
  
  

  getUserSessions() {
    this.user_sessions = this.sessionService.getUserSessions();
    console.log("user sessionns = ", this.user_sessions)

    this.pendingSessions = this.sessionService.getUserPendingSessions(this.sessionService.current_user);
    this.acceptedSessions = this.sessionService.getUserAcceptedSessions(this.sessionService.current_user);
    this.completedOrCancelledSessions = this.sessionService.getUserCompletedOrCancelledSessions(this.sessionService.current_user)
  }

  getCurrentWeek() {
    var currentDate = moment();
  
    var weekStart = currentDate.clone().startOf('week');
    var weekEnd = currentDate.clone().endOf('week');
  
    var days = [];
  
    for (var i = 0; i <= 6; i++) {
      //format("MMMM Do,dddd"))
      days.push(moment(weekStart).add(i, 'days').format("dddd, MMMM Do"));
    }
    this.one_week = days;
    // week 2
  }
}
