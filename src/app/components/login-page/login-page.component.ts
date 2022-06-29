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

  user_name_err:boolean = false;
  pass_err:boolean = false;
  not_found_err:boolean = false;

  loginTransition() {
    document.getElementById("signup").style.display = "none";
    document.getElementById("login").style.display = "block";
  }

  signupTransition() {
    document.getElementById("signup").style.display = "block";
    document.getElementById("login").style.display = "none";
  }

  login() {
    this.user_name_err = false;
    this.pass_err = false;
    this.not_found_err = false;

    if(this.name == null) {
      console.log("username not entered...");
      this.user_name_err = true;
    }
    else if (!(this.name.trim().length > 0)) {
      console.log("username not entered...");
      this.user_name_err = true;
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
    if(!this.pass_err && !this.user_name_err) {
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
        this.not_found_err = true;
        this.name = "";
        this.password = "";
        console.log('user not found');
      }
    } else {
      this.not_found_err = true;
      this.name = "";
      this.password = "";
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

  // user register errors:
  email_err:boolean = false;
  not_unique_err:boolean = false;
  usr_name_err:boolean = false;
  first_n_err:boolean = false;
  last_n_err:boolean = false;
  phone_format_err:boolean = false;
  phone_err:boolean = false;
  reg_pass_err:boolean = false;
  verify_pass_err:boolean = false;
  
  showModal = false;

  close() {
    document.getElementById("close").style.display = "block";
  }

  register() {
    this.email_err = false;
    this.not_unique_err = false;
    this.usr_name_err = false;
    this.first_n_err = false;
    this.last_n_err = false;
    this.phone_format_err = false;
    this.phone_err = false;
    this.reg_pass_err = false;
    this.verify_pass_err = false;

    // email validation
    if(this.email === undefined) {
      this.email_err = true
    } else {
      this.email = this.email.trim();
      if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email))) {
        this.email_err = true
      }
    }

    // username validation
    if(this.username === undefined) {
      this.usr_name_err = true;
    } else {
      this.username = this.username.trim();
      if (!(this.checkUniqueUsername(this.username))) {
        this.not_unique_err = true;
        this.usr_name_err = false;
      } 
    }

    // first name validation
    if(this.firstname === undefined) {
      this.first_n_err = true;
    } else {
      this.firstname = this.firstname.trim();
    }
    // last name validation
    if(this.lastname === undefined) {
      this.last_n_err = true;
    } else {
      this.lastname = this.lastname.trim();
    }

    // phone number validation
    if(this.phonenumber === undefined) {
      this.phone_err = true;
      this.phone_format_err = false
    } else {
      if (!(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.\,]?[0-9]{3}[-\s\.\,]?[0-9]{4,6}$/.test(this.phonenumber))) {
        this.phone_format_err = true
        this.phone_err = false
      }
    }

    // password validation
    if(this.registerPassword === undefined) {
      this.reg_pass_err = true
    } else {
      this.registerPassword = this.registerPassword.trim();
    }

    if(this.verifyPassword === undefined) {
      this.verify_pass_err = true
    } else {
      this.verifyPassword = this.verifyPassword.trim();
    }

    if(this.registerPassword != undefined
      && this.verifyPassword != undefined) {
        if(this.registerPassword !== this.verifyPassword) {
          this.verify_pass_err = true
        }
    }

    if(!this.email_err && !this.user_name_err && !this.not_unique_err && !this.first_n_err && !this.last_n_err
        && !this.phone_err && !this.phone_format_err && !this.reg_pass_err && !this.verify_pass_err) {
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
        this.loginTransition()
      }
    }
  }

  checkUniqueUsername(username:string) {
    return this.dbService.checkUniqueUsername(username);
  }
}
