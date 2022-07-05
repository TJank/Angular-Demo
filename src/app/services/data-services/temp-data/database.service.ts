import { Injectable } from '@angular/core';
import { Session } from 'src/app/classes/session/session';
import { Admin } from 'src/app/classes/admin/admin';
import { Coach } from 'src/app/classes/coach/coach';
import { User } from 'src/app/classes/user/user';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor() {}

  ngOnInit() {}

  demo_coachTypes:string[] = ["Yoga", "Boxing", "Lifting", "Nutrition"]
  demo_users:User[] = [
    new User(1, 'fullHouse', 'bobsaget@gmail.com', 'Bob','Saget', '05/17/1956', '(123)456-7890', 'bobsaget'), 
    new User(2, 'demo', 'demo@gmail.com', 'Demo','User', '01/01/2000', '(123)456-7890', 'demouser')
  ];
  
  demo_coaches:Coach[] = [
    new Coach(1, 'martineztraining@gmail.com', 'Pepe', 'Martinez', [], [16,17,18,19,20], [16,17,18,19,20], [16,17,18,19,20], [16,17,18,19,20], [16,17,18,19,20], [], 'training', 'Boxing'),
    new Coach(2, 'amandapanda@gmail.com', 'Amanda', 'Noel', [5,6,7], [5,6,7,18,19,20], [5,6,7,18,19,20], [5,6,7,18,19,20], [5,6,7,18,19,20], [5,6,7,18,19,20], [], 'flow', 'Yoga'),
    new Coach(3, 'democoach', 'Demo', 'Democoach', [12,13,14,15,16,17,18,19,20], [5,6,7,8,9,10], [5,6,7,8,9,10], [5,6,7,8,9,10], [5,6,7,8,9,10], [5,6,7,8,9,10], [], 'democoach', 'Lifting'),
    new Coach(4, 'zeuschampion@gmail.com', 'Zeus', 'Martinez', [], [16,17,18,19,20], [16,17,18,19,20], [16,17,18,19,20], [16,17,18,19,20], [16,17,18,19,20], [], 'zeus', 'Boxing')
  ];

  demo_sessions:Session[] = [
    new Session("fullHouse", "Bob", "Sage", "(123)226-5555", "Boxing", "martineztraining@gmail.com", "Pepe", "", "11/04/2021", 16,"pending"),
    new Session("demo", "Demo", "User", "(123)456-7890", "Boxing", "martineztraining@gmail.com", "Pepe", "can we focus on footwork?", "11/04/2021", 17,"pending"),
    new Session("demo", "Demo", "User", "(123)456-7890", "Boxing", "martineztraining@gmail.com", "Pepe", "", "11/05/2021", 16,"pending"),
    // new Session("demo", "Demo", "User", "(123)456-7890", "Boxing", "martineztraining@gmail.com", "Pepe", "can we train back?", "11/05/2021", 17,"accepted"),
    // new Session("demo", "Demo", "User", "(123)456-7890", "Boxing", "martineztraining@gmail.com", "Pepe", "can we train back?", "11/05/2021", 18,"accepted"),
    // new Session("demo", "Demo", "User", "(123)456-7890", "Boxing", "martineztraining@gmail.com", "Pepe", "can we train back?", "11/05/2021", 19,"accepted"),
    new Session("demo", "Demo", "User", "(123)456-7890", "Boxing", "martineztraining@gmail.com", "Pepe", "can we train back?", "11/05/2021", 20,"accepted"),
    new Session("demo", "Demo", "User", "(123)456-7890","Boxing", "democoach", "Demo", "", "10/04/2021", 16,"completed")
  
  ];

  demo_admins:Admin[] = [
    new Admin(1, "admin", "admin@gmail.com", "Admin", "Test", "demoadmin")
  ];

  getCoachTypes() {
    return this.demo_coachTypes;
  }

  addDemoUser(user:User){
    this.demo_users.push(user)
  }

  addDemoSession(session:Session) {
    this.demo_sessions.push(session)
  }

  addDemoAdmin(admin:Admin) {
    this.demo_admins.push(admin)
  }

  addDemoCoach(coach:Coach) {
    this.demo_coaches.push(coach)
  }

  updateSession(session:Session) {
    var old_session = this.findSession(session)
    if (old_session != null) {
      this.demo_sessions = this.demo_sessions.filter(function( obj ) {
        return obj.session_key !== old_session.session_key;
      });
    } else {
      console.log('incorrect session')
    }
    this.demo_sessions.push(session)
  }

  updateUser(user:User) {
    var old_user = this.findUser(user)
    if (old_user != null) {
      this.demo_users = this.demo_users.filter(function( obj ) {
        return obj.username !== old_user.username;
      });
    } else {
      console.log('user does not exist')
    }
    this.demo_users.push(user)
  }

  updateCoach(coach:Coach) {
    var old_coach = this.findCoach(coach)
    if (old_coach != null) {
      this.demo_coaches = this.demo_coaches.filter(function( obj ) {
        return obj.email !== old_coach.email;
      });
    } else {
      console.log('user does not exist')
    }
    this.demo_coaches.push(coach)
  }

  findSession(session:Session): Session {
    var rtn_session = null
    this.demo_sessions.forEach(temp_session => {
      if(temp_session.session_key === session.session_key) {
        rtn_session = temp_session;
      }
    });
    return rtn_session
  }

  findCurrentSessionsByCoach(coach:Coach): Session[] {
    var rtn_sessions:Session[] = [];
    this.demo_sessions.forEach(temp_session => {
      if(temp_session.coach_email === coach.email) {
        if(temp_session.session_status !== "completed" && temp_session.session_status !== "cancelled") {
          rtn_sessions.push(temp_session);
        }
      }
    });
    return rtn_sessions;
  }

  findAdmin(admin:Admin): Admin {
    var rtn_admin = null
    this.demo_admins.forEach(demo_admin => {
      if(admin.username == demo_admin.username) {
        rtn_admin = demo_admin
      }
    });
    return rtn_admin;
  }

  findCoach(coach:Coach): Coach {
    var rtn_coach = null
    this.demo_coaches.forEach(demo_coach => {
      if(coach.email === demo_coach.email) {
        rtn_coach = demo_coach
      }
    });
    return rtn_coach;
  }

  findCoachesByType(coachType:string): Coach[] {
    var rtn_coaches:Coach[] = [];
    this.demo_coaches.forEach(demo_coach => {
      if(coachType === demo_coach.coachtype) {
        rtn_coaches.push(demo_coach)
      }
    });
    return rtn_coaches;
  }

  findUser(user:User): User {
    var rtn_user = null
    this.demo_users.forEach(demo_user => {
      if(user.username === demo_user.username) {
        rtn_user = demo_user;
      }
    });
    return rtn_user
  }

  findUserByEmail(user:User): User {
    var rtn_user = null
    this.demo_users.forEach(demo_user => {
      if(user.email === demo_user.email) {
        rtn_user = demo_user;
      }
    });
    return rtn_user
  }

  checkUniqueUsername(username:string) {
    var flag = true;
    this.demo_users.forEach(temp_user => {
      if(username === temp_user.username) {
        flag = false
      }
    });
    return flag;
  }
}
