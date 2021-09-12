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

  ngOnInit() {
  }

  demo_users:User[] = [new User(1, 'fullHouse', 'bobsaget@gmail.com', 'Bob','Saget', '05/17/1956', '(123)456-7890', 'bobsaget'), 
  new User(1, 'demo', 'demo@gmail.com', 'Demo','User', '01/01/2000', '(123)456-7890', 'demouser')];
  demo_sessions:Session[] = [];
  demo_admins:Admin[] = [];
  demo_coaches:Coach[] = [
    new Coach(1, 'martineztraining@gmail.com', 'Pepe', 'Martinez', '', '', '', '', '', '', '', 'training', 'Boxing'),
    new Coach(1, 'amandapanda@gmail.com', 'Amanda', 'Noel', '', '', '', '', '', '', '', 'flow', 'Yoga'),
    new Coach(1, 'democoach', 'Demo', 'Democoach', '', '', '', '', '', '', '', 'democoach', 'Lifting')
  ];

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

  findAdmin(admin:Admin): Admin {
    this.demo_admins.forEach(demo_admin => {
      if(admin.username == demo_admin.username) {
        return demo_admin
      }
    });
    return null;
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

}
