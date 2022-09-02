import { Injectable } from '@angular/core';
import { Coach } from 'src/app/classes/coach/coach';
import { Session } from 'src/app/classes/session/session';
import { User } from 'src/app/classes/user/user';
import { DatabaseService } from '../data-services/temp-data/database.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(
    private dbService:DatabaseService
  ) { }

  public currnet_session:Session = null;

  public current_user:User = null;
  setCurrentUser(username:string) {
    this.current_user = this.dbService.findUser(new User(0, username, '', '', '', '', '', ''))
  }

  getCurrentSessionsByCoach(coach:Coach) : Session[] {
    return this.dbService.findCurrentSessionsByCoach(coach);
  }

  getUserSessions() {
    var rtn_sessions: Session[] = [];
    this.dbService.demo_sessions.forEach(session => {
      if(session.session_key.includes(this.current_user.username)) {
        if(session.session_status !== "cancelled") {
          rtn_sessions.push(session)
        }
      }
    });

    return rtn_sessions;
  }

  getUserPendingSessions(user:User) {
    var rtn_sessions: Session[] = [];
    this.dbService.demo_sessions.forEach(session => {
      if(session.session_status === "pending") {
        if(session.user === user.username) {
          rtn_sessions.push(session)
        }
      }
    });
    
    return rtn_sessions;
  }

  getUserAcceptedSessions(user:User) {
    var rtn_sessions: Session[] = [];
    this.dbService.demo_sessions.forEach(session => {
      if(session.session_status === "accepted") {
        if(session.user === user.username) {
          rtn_sessions.push(session)
        }
      }
    });

    return rtn_sessions;
  }

  getUserCompletedOrCancelledSessions(user:User) {
    var rtn_sessions: Session[] = [];
    this.dbService.demo_sessions.forEach(session => {
      if(session.session_status === "completed" || session.session_status === "cancelled") {
        if(session.user === user.username) {
          rtn_sessions.push(session)
        }
      }
    });

    return rtn_sessions;
  }

}
