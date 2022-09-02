import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from 'src/app/classes/session/session';
import { CoachService } from 'src/app/services/data-services/coach-data/coach.service';
import { DatabaseService } from 'src/app/services/data-services/temp-data/database.service';
import { SessionService } from 'src/app/services/session-service/session.service';

@Component({
  selector: 'app-coach-view-session-page',
  templateUrl: './coach-view-session-page.component.html',
  styleUrls: ['./coach-view-session-page.component.css']
})
export class CoachViewSessionPageComponent implements OnInit {

  constructor(
    private sessionService:SessionService,
    private coachService:CoachService,
    private router:Router,
    private dbService:DatabaseService
  ) { }

  ngOnInit(): void {
    this.session = this.sessionService.currnet_session;
    if(this.session.session_status === "accepted") {
      this.hidden_sellect = false;
    }
    this.new_status = this.session.session_status;
  }


  session:Session = null;
  hidden_sellect = true;
  new_status:string;

  save() {
    this.session.session_status = this.new_status;
    this.coachService.updateSession(this.session);
    this.router.navigateByUrl("/coach/home")
    
  }

}
