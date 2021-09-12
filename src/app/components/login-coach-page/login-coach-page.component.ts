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

  success = false;
  errorNum:number;
  errors:string[];

  coachLogin() {
    this.errors = [];
    this.errorNum = 0;

    if(this.email == null) {
      
      this.errorNum++;
      this.errors.push("Please specify your email.")
    }
    else if (!(this.email.trim().length > 0)) {
      this.errorNum++;
      this.errors.push("Please specify your email.");
    }

    // password check
    if(this.password == null) {
      this.errorNum++;
      this.errors.push("Please enter Password.");
    }

    // call login service
    if(this.errorNum == 0) {
      var temp_coach = new Coach(0, this.email, '','','','','','','','','',this.password,'')
      if(this.loginService.loginCoach(temp_coach)) {
        console.log('returned true!')

        this.router.navigate(['/coach/home']);
      } else {
        console.log('returned false... login failure')
      }
      // this.authService.loginCoach({email: this.email, password: this.password})
      // .subscribe(
      //   data => {
      //     if(data) {               
      //       this.router.navigate(['/coach/home']);
      //     }
      //   }
      // );
    }
  }


}
