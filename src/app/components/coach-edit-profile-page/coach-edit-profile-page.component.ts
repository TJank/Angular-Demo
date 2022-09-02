import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Coach } from 'src/app/classes/coach/coach';
import { CoachService } from 'src/app/services/data-services/coach-data/coach.service';
import { DatabaseService } from 'src/app/services/data-services/temp-data/database.service';
import { LoginService } from 'src/app/services/login-service/login.service';

@Component({
  selector: 'app-coach-edit-profile-page',
  templateUrl: './coach-edit-profile-page.component.html',
  styleUrls: ['./coach-edit-profile-page.component.css']
})
export class CoachEditProfilePageComponent implements OnInit {

  constructor(
    private dbService:DatabaseService,
    private coachService:CoachService,
    private renderer:Renderer2,
    private loginService:LoginService,
    private router:Router
  ) {}

  ngOnInit(): void {

    if (!this.loginService.isLoggedIn()) {
      this.router.navigateByUrl("/login");
    } else {
      if(!this.loginService.validateRole("COACH")) {
        this.loginService.destroySessionVariables();
        console.log('validate role failed in coach-nav')
        this.router.navigateByUrl("/");
      } else {
        this.coach_map = this.loginService.retrieveSessionVariables();
        this.role = this.coach_map.get(this.loginService.SESSION_ROLE)
        this.username = this.coach_map.get(this.loginService.SESSION_USERNAME)
        this.firstname = this.coach_map.get(this.loginService.SESSION_FIRSTNAME)
        this.email = this.coach_map.get(this.loginService.SESSION_EMAIL)
        var temp_coach = new Coach(0, this.email, this.firstname, "", [], [], [], [], [], [], [], "", "")
      }
      // get all coach data & disable / hide form
      this.returnedCoach = this.dbService.findCoach(temp_coach)
      this.firstname = this.returnedCoach.firstname;
      this.lastname = this.returnedCoach.lastname;
      this.ctype = this.returnedCoach.coachtype;
      this.coachType = this.ctype
      this.updateStrCoachAvail();
      this.isLoaded = true
    }
  }
  coach_map:Map<string, string>
  username:string;
  firstname:string;
  email:string;
  role:string;
  ctype:string;

  isLoaded:boolean;
  returnedCoach:Coach;
  updatedCoach:Coach;
  lastname:string;
  coachType:string;
  type:string

  coachTypes:String[];
  disabled = true;
  hidden = true;

  newSunAvail:number[] = [];
  newMonAvail:number[] = [];
  newTueAvail:number[] = [];
  newWedAvail:number[] = [];
  newThuAvail:number[] = [];
  newFriAvail:number[] = [];
  newSatAvail:number[] = [];

  top:number[][] = [
                    [5,6,7,8,9,10],
                    [11,12,13,14,15,16],
                    [17,18,19,20,21,22]
                  ];

  standard:string[][] = [
                          ["5:00 AM","6:00 AM","7:00 AM","8:00 AM","9:00 AM","10:00 AM"], 
                          ["11:00 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM"],
                          ["5:00 PM","6:00 PM","7:00 PM","8:00 PM","9:00 PM","10:00 PM"]
                        ];
  
  editForm() {
    if(this.disabled) {
      this.getAllCoachTypes()
      this.disabled = false;
      this.hidden = false;
    } else {
      this.disabled = true;
      this.hidden = true;
    }
  }

  saveCoachDetails() {
    //saves form data for coach
    // update coach details
    var temp_coach = new Coach(0, "", this.firstname, this.lastname, [], [], [], [], [], [], [], "", this.coachType)
    this.coachService.updateCoachDetails(this.returnedCoach, temp_coach)
    
    // re-load coach with new details and re-generate the page. 
    this.returnedCoach = this.dbService.findCoach(this.returnedCoach)
    this.firstname = this.returnedCoach.firstname;
    this.lastname = this.returnedCoach.lastname;
    this.ctype = this.returnedCoach.coachtype;
    this.editForm()
  }

  updateStrCoachAvail() {
    this.newSunAvail = this.returnedCoach.sundayavailability;
    this.newMonAvail = this.returnedCoach.mondayavailability;
    this.newTueAvail = this.returnedCoach.tuesdayavailability;
    this.newWedAvail = this.returnedCoach.wednesdayavailability;
    this.newThuAvail = this.returnedCoach.thursdayavailability;
    this.newFriAvail = this.returnedCoach.fridayavailability;
    this.newSatAvail = this.returnedCoach.saturdayavailability;
  }

  haystack(day:string, time:number) : boolean {

    if(day === 'sun') {
      if(this.newSunAvail.includes(time)) {
        return true;
      } else {
        return false;
      }
    }

    if(day === 'mon') {
      if(this.newMonAvail.includes(time)) {
        return true;
      } else {
        return false;
      }
    }

    if(day === 'tue') {
      if(this.newTueAvail.includes(time)) {
        return true;
      } else {
        return false;
      }
    }

    if(day === 'wed') {
      if(this.newWedAvail.includes(time)) {
        return true;
      } else {
        return false;
      }
    }

    if(day === 'thu') {
      if(this.newThuAvail.includes(time)) {
        return true;
      } else {
        return false;
      }
    }

    if(day === 'fri') {
      if(this.newFriAvail.includes(time)) {
        return true;
      } else {
        return false;
      }
    }

    if(day === 'sat') {
      if(this.newSatAvail.includes(time)) {
        return true;
      } else {
        return false;
      }
    }
  }

  saveAvailability() {
    console.log("insdie saveAvailability()")
    this.updatedCoach = null
    this.newSunAvail = [];
    this.newMonAvail = [];
    this.newTueAvail = [];
    this.newWedAvail = [];
    this.newThuAvail = [];
    this.newFriAvail = [];
    this.newSatAvail = [];

    let elements = (<HTMLCollectionOf<Element>>document.getElementsByClassName("active"));
    for(let i=0; i<elements.length; i++) {
      var elID = elements[i].id;
      if(elID.includes("sun")) {
        var time = elID.substr(elID.indexOf("_") + 1);
        this.newSunAvail.push(parseInt(time));
      }

      if(elID.includes("mon")) {
        var time = elID.substr(elID.indexOf("_") + 1);
        this.newMonAvail.push(parseInt(time));
      }

      if(elID.includes("tue")) {
        var time = elID.substr(elID.indexOf("_") + 1);
        this.newTueAvail.push(parseInt(time));
      }

      if(elID.includes("wed")) {
        var time = elID.substr(elID.indexOf("_") + 1);
        this.newWedAvail.push(parseInt(time));
      }

      if(elID.includes("thu")) {
        var time = elID.substr(elID.indexOf("_") + 1);
        this.newThuAvail.push(parseInt(time));
      }

      if(elID.includes("fri")) {
        var time = elID.substr(elID.indexOf("_") + 1);
        this.newFriAvail.push(parseInt(time));
      }

      if(elID.includes("sat")) {
        var time = elID.substr(elID.indexOf("_") + 1);
        this.newSatAvail.push(parseInt(time));
      }

    }

    this.coachService.updateCoachAvailability(this.returnedCoach, this.newSunAvail, this.newMonAvail, this.newTueAvail, this.newWedAvail, this.newThuAvail, this.newFriAvail, this.newSatAvail)
    this.updatedCoach = this.dbService.findCoach(this.returnedCoach);
    if(this.updatedCoach.firstname != undefined) {
      console.log("coach saved and found again!")
      this.returnedCoach = this.updatedCoach;
      this.updateStrCoachAvail();
    }
  }

  getAllCoachTypes() {
    this.coachTypes = this.dbService.getCoachTypes()
  }

  switchAvail(event: any) {
    const hasClass = event.target.classList.contains("active");
    if(hasClass) {
      this.renderer.removeClass(event.target, "active");
    } else {
      this.renderer.addClass(event.target, "active");
    }
  }
}
