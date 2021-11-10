import { Injectable } from '@angular/core';
import { Coach } from 'src/app/classes/coach/coach';
import { Session } from 'src/app/classes/session/session';
import { DatabaseService } from '../temp-data/database.service';

@Injectable({
  providedIn: 'root'
})
export class CoachService {

  constructor(
    private dbService:DatabaseService
  ) { }

  getCoachesByType(coachType:string) {
    var coaches:Coach[] = []
    coaches = this.dbService.findCoachesByType(coachType);

    if(!(coaches.length > 0)) {
       coaches = null;
    }
    return coaches;
  }

  getPendingSessions(coach:Coach) {
    var rtn_sessions: Session[] = [];
    this.dbService.demo_sessions.forEach(session => {
      if(session.session_status === "pending") {
        if(session.coach_email === coach.email) {
          rtn_sessions.push(session)
        }
      }
    });
    
    return rtn_sessions;
  }

  getAcceptedSessions(coach:Coach) {
    var rtn_sessions: Session[] = [];
    this.dbService.demo_sessions.forEach(session => {
      if(session.session_status === "accepted") {
        if(session.coach_email === coach.email) {
          rtn_sessions.push(session)
        }
      }
    });

    return rtn_sessions;
  }

  getCompletedSessions(coach:Coach) {
    var rtn_sessions: Session[] = [];
    this.dbService.demo_sessions.forEach(session => {
      if(session.session_status === "completed") {
        if(session.coach_email === coach.email) {
          rtn_sessions.push(session)
        }
      }
    });

    return rtn_sessions;
  }

  updateSession(session:Session) {
    this.dbService.updateSession(session);
  }

  updateCoachDetails(coach:Coach, new_coach:Coach) {

    coach.firstname = new_coach.firstname;
    coach.lastname = new_coach.lastname;
    coach.coachtype = new_coach.coachtype;

    this.dbService.updateCoach(coach)

  }

  updateCoachAvailability(coach:Coach, sun:Number[], mon:Number[], tues:Number[], wed:Number[], thur:Number[], fri:Number[], sat:Number[]) {
    coach.sundayavailability = sun;
    coach.mondayavailability = mon;
    coach.tuesdayavailability = tues;
    coach.wednesdayavailability = wed;
    coach.thursdayavailability = thur;
    coach.fridayavailability = fri;
    coach.saturdayavailability = sat;

    this.dbService.updateCoach(coach)
  }

  createCoach(coach:Coach) {
    var old_coach = this.dbService.findCoach(coach);
    
    if(old_coach === null) {
      this.dbService.addDemoCoach(coach)
      return true;
    }
  }

}
