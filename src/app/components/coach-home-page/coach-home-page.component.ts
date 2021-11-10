import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Coach } from 'src/app/classes/coach/coach';
import { Session } from 'src/app/classes/session/session';
import { CoachService } from 'src/app/services/data-services/coach-data/coach.service';
import { DatabaseService } from 'src/app/services/data-services/temp-data/database.service';
import { LoginService } from 'src/app/services/login-service/login.service';
import { SessionService } from 'src/app/services/session-service/session.service';

@Component({
  selector: 'app-coach-home-page',
  templateUrl: './coach-home-page.component.html',
  styleUrls: ['./coach-home-page.component.css']
})
export class CoachHomePageComponent implements OnInit {

  constructor(
    private loginService:LoginService,
    private router:Router,
    private dbService:DatabaseService,
    private coachService:CoachService,
    private sessionService:SessionService
  ) { }

  ngOnInit(): void {
    if (!this.loginService.isLoggedIn()) {
      this.router.navigateByUrl("/login");
    }
    if(!this.loginService.validateRole("COACH")) {
      this.loginService.destroySessionVariables();
      console.log('validate role failed in coach home')
      this.router.navigateByUrl("/");
    } else {
      this.coach_map = this.loginService.retrieveSessionVariables();
      this.email = this.coach_map.get(this.loginService.SESSION_EMAIL)
      this.firstname = this.coach_map.get(this.loginService.SESSION_FIRSTNAME)

      var temp_coach = new Coach(0, this.email, this.firstname, null, null, null, null, null, null, null, null, null, null)
      this.current_coach = this.dbService.findCoach(temp_coach)
    }

    if(this.current_coach !== null) {
      this.pendingSessions = this.coachService.getPendingSessions(this.current_coach);
      this.acceptedSessions = this.coachService.getAcceptedSessions(this.current_coach);
      this.completedSessions = this.coachService.getCompletedSessions(this.current_coach);
    }
  }

  coach_map:Map<string, string>
  email:string
  firstname:string
  current_coach:Coach = null;

  pendingSessions:Session[] = [];
  acceptedSessions:Session[] = [];
  completedSessions:Session[] = [];

  loadSession(session:Session) {
    console.log("loadSession() successfully clicked!")
    console.log(session.session_type + " " + session.session_status)
    this.sessionService.currnet_session = session
    this.router.navigateByUrl("/coach/view-session")
  }



}
