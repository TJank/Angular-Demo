import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user/user';
import { DatabaseService } from 'src/app/services/data-services/temp-data/database.service';
import { LoginService } from 'src/app/services/login-service/login.service';
import { RegisterService } from 'src/app/services/register-service/register.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(
    private router: Router,
    private dbService: DatabaseService,
    private registerService:RegisterService,
    private loginService:LoginService
  ){}

  ngOnInit() {
  }
  
  name:string;
  password:string;
  submitted = false;

  success = false;
  errorNum:number;
  errors:string[];

  loginTransition() {
    document.getElementById("signup").style.display = "none";
    document.getElementById("login").style.display = "block";
  }

  signupTransition() {
    document.getElementById("signup").style.display = "block";
    document.getElementById("login").style.display = "none";
  }

  login() {
    this.errors = [];
    this.errorNum = 0;

    if(this.name == null) {
      // this.logger.log("email is null...")
      this.errorNum++;
      this.errors.push("Please specify your email.")
    }
    else if (!(this.name.trim().length > 0)) {
      // this.logger.log("email length is > 0...")
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
      var temp_user;
      if(this.name.includes('@')) {
        temp_user = new User(0, '', this.name, '', '', '', '', this.password)
      } else {
        temp_user = new User(0, this.name, '', '', '', '', '', this.password)
      }
      if(this.loginService.loginUser(temp_user)) {
        console.log('returned true!')
        this.router.navigate(['/user/home']);
      } else {
        console.log('returned false... login failure')
      }

    }
  }

  // user register values...
  returnedUser:string;
  email:string;
  username:string;
  firstname:string;
  lastname:string;
  dateofbirth:string;
  phonenumber:string;
  registerPassword:string;
  verifyPassword:string;
  
  showModal = false;

  close() {
    document.getElementById("close").style.display = "block";
  }

  register() {
    // still need validation for all fields...


    var new_user = new User(1, this.username, this.email, this.firstname, this.lastname, this.dateofbirth, this.phonenumber, this.password)
    var existing_user = this.dbService.findUser(new_user)
    if (existing_user == null) {
      // user name does not exist
      this.registerService.registerUser(new_user);
      this.router.navigate(['/login']);
      console.log(this.dbService.demo_users)
    } else {
      console.log('username already exists')
      console.log(this.dbService.demo_users)
    }

      this.returnedUser = "";
      this.email = "";
      this.username = "";
      this.firstname = "";
      this.lastname = "";
      this.dateofbirth = "";
      this.phonenumber = "";
      this.registerPassword = "";
      this.verifyPassword = "";
  }

}
