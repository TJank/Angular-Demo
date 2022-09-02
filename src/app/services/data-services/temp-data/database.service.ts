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

  demo_sessions:Session[] = [];

  demo_admins:Admin[] = [
    new Admin(1, "admin", "admin@gmail.com", "Admin", "Test", "demoadmin")
  ];

  generateSessionData() {
    var curr = new Date;
    var first = curr.getDate() - curr.getDay();
    var today_of_week = curr.getDay();

    // set days of week
    var sunday = new Date(curr.setDate(first));

    var monday = new Date()
    monday.setDate(sunday.getDate() + 1);

    var tuesday = new Date()
    tuesday.setDate(monday.getDate() + 1);
    
    var wednesday = new Date()
    wednesday.setDate(tuesday.getDate() + 1);

    var thursday = new Date()
    thursday.setDate(wednesday.getDate() + 1);

    var friday = new Date()
    friday.setDate(thursday.getDate() + 1);

    var saturday = new Date()
    saturday.setDate(friday.getDate() + 1);

    var date_dates = [sunday, monday, tuesday, wednesday, thursday, friday, saturday]

    // format date data
    var sun_str = this.getFormattedDate(sunday)
    var mon_str = this.getFormattedDate(monday)
    var tue_str = this.getFormattedDate(tuesday)
    var wed_str = this.getFormattedDate(wednesday)
    var thur_str = this.getFormattedDate(thursday)
    var fri_str = this.getFormattedDate(friday)
    var sat_str = this.getFormattedDate(saturday)

    var str_dates = [sun_str, mon_str, tue_str, wed_str, thur_str, fri_str, sat_str]


    // create sessions & push to array
    var user = this.demo_users[1]
    var coach = this.demo_coaches[2]

    for(var x=0; x<5; x++) {
      // random generators
      
      var ran_date = this.getRandomInt(7)
      var oneOr2 = this.getRandomInt(2)
      var day_of_week_times_array:number[] = []
      switch(true)  {
        case (ran_date == 0):
          // sunday avail
          day_of_week_times_array = coach.sundayavailability
          break;
        
        case (ran_date == 1):
          // sunday avail
          day_of_week_times_array = coach.mondayavailability
          break;
  
        case (ran_date == 2):
          // sunday avail
          day_of_week_times_array = coach.tuesdayavailability
          break;
  
        case (ran_date == 3):
          // sunday avail
          day_of_week_times_array = coach.wednesdayavailability
          break;
  
        case (ran_date == 4):
          // sunday avail
          day_of_week_times_array = coach.thursdayavailability
          break;
  
        case (ran_date == 5):
          // sunday avail
          day_of_week_times_array = coach.fridayavailability
          break;
  
        case (ran_date == 6):
          // sunday avail
          day_of_week_times_array = coach.saturdayavailability
          break;
      }

      var session_ran_time = this.getRandomInt(day_of_week_times_array.length)
      var session_time = day_of_week_times_array[session_ran_time]
      var session_status = ""
      var session_date = str_dates[ran_date]


      if(ran_date < today_of_week) {
        // behind current day... cancelled or completed
        if(oneOr2 == 0) {
          session_status = "cancelled"
        } else {
          session_status = "completed"
        }
      }
      else if(ran_date == today_of_week) {
        // same day only accepted
        session_status = "accepted"
      }
      else {
        // in future... accpeted or pending
        if(oneOr2 == 0) {
          session_status = "accepted"
        } else {
          session_status = "pending"
        }
      }


      var temp_session = new Session(user.username, user.firstname, user.lastname, user.phonenumber, coach.coachtype, coach.email, coach.firstname, "", session_date, session_time, session_status)
      console.log(temp_session)
      this.demo_sessions.push(temp_session)
    }
  }

  getCoachAvailability(date_num:number) {
    var coach = this.demo_coaches[2]
    var day_of_week_times_array = this.demo_coaches[2].saturdayavailability
    
  }

  getRandomInt(max:number) {
    return Math. floor(Math. random() * max);
  }

  getFormattedDate(date:Date) {
    var year = date.getFullYear();
  
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
  
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    
    return month + '/' + day + '/' + year;
  }

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
