import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Coach } from 'src/app/classes/coach/coach';
import { CoachService } from 'src/app/services/data-services/coach-data/coach.service';
import { DatabaseService } from 'src/app/services/data-services/temp-data/database.service';

@Component({
  selector: 'app-admin-create-coach-page',
  templateUrl: './admin-create-coach-page.component.html',
  styleUrls: ['./admin-create-coach-page.component.css']
})
export class AdminCreateCoachPageComponent implements OnInit {

  constructor(
    private dbService:DatabaseService,
    private coachService:CoachService,
    private router:Router
  ) { }

  ngOnInit(): void {

    this.getAllCoachTypes()
  }

  returnedCoach:Coach;
  email:string;
  firstname:string;
  lastname:string;
  coachType:string;
  password:string;
  verifyPassword:string;

  coachTypes:String[] = [];


  createNewCoach() {

    var coach = new Coach(0, this.email, this.firstname, this.lastname, [],[],[],[],[],[],[], this.password, this.coachType)

    if(this.coachService.createCoach(coach)) {
      console.log("coach created successfully")
      console.log(this.dbService.demo_coaches)
      this.router.navigateByUrl("/admin/home")
    } else {
      console.log("coach email already in use.")
    }
  }

  getAllCoachTypes() {
    this.coachTypes = this.dbService.getCoachTypes()
  }

}
