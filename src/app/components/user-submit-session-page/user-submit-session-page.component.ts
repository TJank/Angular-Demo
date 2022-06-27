import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Coach } from 'src/app/classes/coach/coach';
import { Session } from 'src/app/classes/session/session';
import { User } from 'src/app/classes/user/user';
import { CoachService } from 'src/app/services/data-services/coach-data/coach.service';
import { DatabaseService } from 'src/app/services/data-services/temp-data/database.service';
import { UserService } from 'src/app/services/data-services/user-data/user.service';
import { LoginService } from 'src/app/services/login-service/login.service';
import { SessionService } from 'src/app/services/session-service/session.service';

@Component({
  selector: 'app-user-submit-session-page',
  templateUrl: './user-submit-session-page.component.html',
  styleUrls: ['./user-submit-session-page.component.css']
})
export class UserSubmitSessionPageComponent implements OnInit {

  constructor(
    private loginService:LoginService,
    private router:Router,
    private sessionService:SessionService,
    private userService:UserService,
    private dbService:DatabaseService,
    private coachService:CoachService
  ) { }

  ngOnInit(): void {
    if (!this.loginService.isLoggedIn()) {
      this.router.navigateByUrl("/login");
    }
    
    if(!this.loginService.validateRole("USER")) {
      this.loginService.destroySessionVariables();
      console.log('validate role failed in user-create-session')
      this.router.navigateByUrl("/");
    } else {
      this.user_map = this.loginService.retrieveSessionVariables();
      this.role = this.user_map.get(this.loginService.SESSION_ROLE)
      this.username = this.user_map.get(this.loginService.SESSION_USERNAME)
      this.firstname = this.user_map.get(this.loginService.SESSION_FIRSTNAME)
      this.sessionService.setCurrentUser(this.username)
    }
    this.getAllCoachTypes();
  }

  user_map:Map<string, string>;
  username:string;
  firstname:string;
  role:string;
  coachTypes:String[] = [];
  two_weeks:String[] = [];

  scheduled_sessions:Session[] = [];
  coaches:Coach[] = [];
  current_coach:Coach;
  times:String[] = [];
  unavailableTimes:Number[] = [];
  unavailableDays:Number[] = [];

  // session data
  sessionDay:string;
  sessionType:string;
  coachName:string;
  sessionTime:string;
  message:string;




  createNewSession() {
    var actualTime = 0;
    // 5:00 PM
    var index = this.sessionTime.length - 2;
    var amOrPM = this.sessionTime.substring(index);
    
    index = this.sessionTime.indexOf(":");
    var standardTime = this.sessionTime.substring(0, index);

    if(amOrPM === "PM") {
      actualTime = Number(standardTime) + 12;
    } else {
      actualTime = Number(standardTime);
    }
    
    var index = this.sessionDay.indexOf(",");
    var dayOfWeek = this.sessionDay.substring(0, index);
    var numDayOfWeek = this.sessionDay.substring(index+1);
    dayOfWeek = dayOfWeek.trim();
    numDayOfWeek = numDayOfWeek.trim();
    var current_user = this.dbService.findUser(new User(0, this.username, "", "","","","",""))
    var new_session = new Session(current_user.username, 
      current_user.firstname, 
      current_user.firstname, 
      current_user.phonenumber, 
      this.sessionType, 
      this.current_coach.email,
      this.current_coach.firstname,
      this.message,
      numDayOfWeek,
      actualTime,
      "pending")

      this.dbService.addDemoSession(new_session)
      
      var temp_session = this.dbService.findSession(new_session)
      if(temp_session.session_key === new_session.session_key) {
        console.log("session created successfully!")
        this.router.navigateByUrl("/user/home")
      }
  }

  getSessionTimes() {
    this.times = [];
    this.unavailableTimes = [];
    var index = this.sessionDay.indexOf(",");
    var dayOfWeek = this.sessionDay.substring(0, index);
    var numDayOfWeek = this.sessionDay.substring(index+1);
    dayOfWeek = dayOfWeek.trim();
    numDayOfWeek = numDayOfWeek.trim();
    
    // load sessions by the coach
    var temp_sessions:Session[] = this.getCurrentSessionsByCoach();
    temp_sessions.forEach(session => {
      if(numDayOfWeek === session.date) {
        this.unavailableTimes.push(session.time)
      }
    });

    if (dayOfWeek === "Sunday") {
      this.generateAvailTimes(this.current_coach.sundayavailability)
    }
    else if (dayOfWeek === "Monday") {
      this.generateAvailTimes(this.current_coach.mondayavailability)
    }
    else if (dayOfWeek === "Tuesday") {
      this.generateAvailTimes(this.current_coach.tuesdayavailability)
    }
        
    else if (dayOfWeek === "Wednesday") {
      this.generateAvailTimes(this.current_coach.wednesdayavailability)
    }

    else if (dayOfWeek === "Thursday") {
      this.generateAvailTimes(this.current_coach.thursdayavailability)
    }

    else if (dayOfWeek === "Friday") {
      this.generateAvailTimes(this.current_coach.fridayavailability)
    }

    else if (dayOfWeek === "Saturday") {
      this.generateAvailTimes(this.current_coach.saturdayavailability)
    }   
  }

  generateAvailTimes(coachAvailability:Number[]) {
    if(this.unavailableTimes.length == coachAvailability.length) {
      this.times.push("No Availability Today...")
    } else {  
      coachAvailability.forEach(militaryTime => {
        var timeValue = "";
        if(!(this.unavailableTimes.includes(militaryTime))) {
          if (militaryTime > 0 && militaryTime <= 12) {
            timeValue= "" + militaryTime + ":00 AM";
          } else if (militaryTime > 12) {
            timeValue= "" + (militaryTime.valueOf() - 12)  + ":00 PM";
          } else if (militaryTime == 0) {
            timeValue= "12";
          }
        }
        this.times.push(timeValue);
      });
    }
  }

  // get coaches by coach type...
  getCoachesByType() {
    this.current_coach = null;
    this.sessionDay = "";
    this.sessionTime = "";
    this.unavailableDays = [];
    this.unavailableTimes = [];

    this.coaches = this.coachService.getCoachesByType(this.sessionType);

    if(this.coaches !== null && this.coaches.length > 0) {
      console.log("coaches found successfully!");
    } else {
      this.coaches = [];
      console.log("ERROR in finding coaches of type " + this.sessionType)
    }
  }

  // get sessions by coach type... filter out completed & cancelled
  getCurrentSessionsByCoach() {
    var temp_coach = null;
    this.coaches.forEach(coach => {
      if(coach.firstname === this.coachName) {
        temp_coach = coach;
      }
    });
    return this.sessionService.getCurrentSessionsByCoach(temp_coach);
  }

  getCurrentWeek() {
    this.sessionDay = "";
    this.sessionTime = "";
    this.unavailableDays = [];
    this.unavailableTimes = [];
    var temp_coach = null;
    this.coaches.forEach(coach => {
      if(coach.firstname === this.coachName) {
        temp_coach = coach;
      }
    });

    this.current_coach = this.dbService.findCoach(temp_coach)

    if(!(this.current_coach.sundayavailability.length > 0)) {
      this.unavailableDays.push(0)
    }
    if(!(this.current_coach.mondayavailability.length > 0)) {
      this.unavailableDays.push(1)
    }
    if(!(this.current_coach.tuesdayavailability.length > 0)) {
      this.unavailableDays.push(2)
    }
    if(!(this.current_coach.wednesdayavailability.length > 0)) {
      this.unavailableDays.push(3)
    }
    if(!(this.current_coach.thursdayavailability.length > 0)) {
      this.unavailableDays.push(4)
    }
    if(!(this.current_coach.fridayavailability.length > 0)) {
      this.unavailableDays.push(5)
    }
    if(!(this.current_coach.saturdayavailability.length > 0)) {
      this.unavailableDays.push(6)
    }

    console.log("coach changed successfully..")
    var currentDate = moment();
  
    var weekStart = currentDate.clone().startOf('week');
   
    var days = [];
  
    // for two weeks put 13 for 1 week.. 6
    for (var i = 0; i <= 6; i++) {
      //format("MMMM Do,dddd"))
      // format("dddd, MMMM Do")
      // check if i (or day 0 = Sun, 1 = Mon ect.) is in list of unavailable days for the coach
      if(!(this.unavailableDays.includes(i))) {
        days.push(moment(weekStart).add(i, 'days').format("dddd, MM/DD/YYYY"));
      } 
    }
    this.two_weeks = days;
  }

  getAllCoachTypes() {
    this.coachTypes = this.dbService.getCoachTypes()
  }
}