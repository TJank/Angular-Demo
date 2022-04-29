import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Coach } from 'src/app/classes/coach/coach';
import { LoginService } from 'src/app/services/login-service/login.service';

@Component({
  selector: 'app-login-coach-page',
  templateUrl: './login-coach-page.component.html',
  styleUrls: ['./login-coach-page.component.css']
})
export class LoginCoachPageComponent implements OnInit {

  constructor(
    private loginService:LoginService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  email:string;
  password:string;

  email_err:boolean = false;
  pass_err:boolean = false;
  not_found_err:boolean = false;

  coachLogin() {
    this.email_err = false;
    this.pass_err = false;
    this.not_found_err = false;

    if(this.email == null) {
      console.log("username not entered...");
      this.email_err = true;
    }
    else if (!(this.email.trim().length > 0)) {
      console.log("username not entered...");
      this.email_err = true;
    }

    // password check
    if(this.password == null) {
      console.log("password not entered...");
      this.pass_err = true;
    } else if (!(this.password.trim().length > 0)) {
      console.log("password is blank...");
      this.pass_err = true;
    }

    // call login service
    if(!this.pass_err && !this.email_err) {
      var temp_coach = new Coach(0, this.email, "", "", [], [], [], [], [], [], [], this.password,"")
      if(this.loginService.loginCoach(temp_coach)) {
        console.log('returned true!')

        this.router.navigate(['/coach/home']);
      } else {
        this.not_found_err = true;
        this.email = "";
        this.password = "";
        console.log('coach not found');
      }
    } else {
      if(this.pass_err) {
        this.password = "";
      }
      if(this.email_err)
      this.email = "";
      this.password = "";
    } 
  }


}
