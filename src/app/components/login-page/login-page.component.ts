import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user/user';
import { DatabaseService } from 'src/app/services/data-services/temp-data/database.service';
import { LoginService } from 'src/app/services/login-service/login.service';
import { RegisterService } from 'src/app/services/register-service/register.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  datePickerConfig: Partial<BsDatepickerConfig>;

  constructor(
    private router: Router,
    private dbService: DatabaseService,
    private registerService:RegisterService,
    private loginService:LoginService
  ){
    var temp = new Date();
    temp.setFullYear(temp.getFullYear() - 100)
    this.datePickerConfig = Object.assign({},
      { 
        containerClass: 'theme-dark-blue', 
        showWeekNumbers: false,
        minDate: temp,
        maxDate: new Date()
      });
  }

  ngOnInit() {
  }
  
  name:string;
  password:string;
  submitted = false;

  success = false;
  errorNum:number = 0;
  errors:string[] = [];

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
        console.log('success!')
        this.router.navigate(['/user/home']);
      } else {
        console.log('login failure...')
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
    // dateofbirth:string;
    // registerPassword:string;
    // verifyPassword:string;

    // email validation
    if(this.email === undefined) {
      this.errorNum++;
      this.errors.push("Must Enter Email Address");
    } else {
      if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email))) {
        this.errorNum++;
        this.errors.push("Invalid Email Address");
      }
    }

    // username validation
    if(this.username === undefined) {
      this.errorNum++;
      this.errors.push("Must Enter Username");
    } else {
      if (!(this.checkUniqueUsername(this.username))) {
        this.errorNum++;
        this.errors.push("Username Not Available");
      } 
    }

    // first name validation
    if(this.firstname === undefined) {
      this.errorNum++;
      this.errors.push("Must Enter First Name");
    }
    // last name validation
    if(this.lastname === undefined) {
      this.errorNum++;
      this.errors.push("Must Enter Last Name");
    }

    // phone number validation
    if(this.phonenumber === undefined) {
      this.errorNum++;
      this.errors.push("Must Enter Phone Number");
    } else {
      if (!(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.\,]?[0-9]{3}[-\s\.\,]?[0-9]{4,6}$/.test(this.phonenumber))) {
        this.errorNum++;
        this.errors.push("Invalid Phone Number");
        window.alert("invalid phone number")
      }
    }


    // password validation
    if(this.registerPassword === undefined) {
      this.errorNum++;
      this.errors.push("Must Enter Password");
    }

    if(this.verifyPassword === undefined) {
      this.errorNum++;
      this.errors.push("Must Enter Verification Password");
    }

    if(this.registerPassword != undefined
      && this.verifyPassword != undefined) {
        if(this.registerPassword !== this.verifyPassword) {
          this.errorNum++;
          this.errors.push("Passwords Don't Match");
        }
    }

    // DOB Validation...
    // var temp_date = new Date();
    // var to = temp_date.getTime()
    // var from = temp_date // gives 1486492200000
    // from.setFullYear(temp_date.getFullYear() - 100);

    // console.log("dob = " + this.dateofbirth)
    // if(this.dateofbirth >= from && today <= to) {
    //   // your code goes here
    // }


    console.log(this.errors)
    if(this.errorNum === 0 && this.errors.length <=0 ) {
      window.alert("Everything works!")
      var new_user = new User(1, this.username, this.email, this.firstname, this.lastname, this.dateofbirth, this.phonenumber, this.registerPassword)
      var existing_user = this.dbService.findUser(new_user)
      if (existing_user == null) {
        // user name does not exist
        this.registerService.registerUser(new_user);
      } else {
        console.log('username already exists')
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

      var tmp_user = this.dbService.findUser(new_user);
      if(tmp_user.email === new_user.email) {
        document.getElementById("signup").style.display = "none";
        document.getElementById("login").style.display = "block";
      }
    }
  }

  checkUniqueUsername(username:string) {
    return this.dbService.checkUniqueUsername(username);
  }
}
