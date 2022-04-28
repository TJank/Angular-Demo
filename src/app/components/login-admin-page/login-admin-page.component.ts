import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'src/app/classes/admin/admin';
import { DatabaseService } from 'src/app/services/data-services/temp-data/database.service';
import { LoginService } from 'src/app/services/login-service/login.service';

@Component({
  selector: 'app-login-admin-page',
  templateUrl: './login-admin-page.component.html',
  styleUrls: ['./login-admin-page.component.css']
})
export class LoginAdminPageComponent implements OnInit {

  constructor(
    private loginService:LoginService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  username:string;
  password:string;

  usr_name_err:boolean = false;
  pass_err:boolean = false;
  not_found_err:boolean = false;

  adminLogin() {
    this.usr_name_err = false;
    this.pass_err = false;
    this.not_found_err = false;

    if(this.username == null) {
      console.log("username not entered...");
      this.usr_name_err = true;
    }
    else if (!(this.username.trim().length > 0)) {
      console.log("username is blank...");
      this.usr_name_err = true;
    }

    // password check
    if(this.password == null) {
      console.log("password not entered...");
      this.pass_err = true;
    }
    else if (!(this.password.trim().length > 0)) {
      console.log("password is blank...");
      this.pass_err = true;
    }

    // call login service
    if(!this.pass_err && !this.usr_name_err) {
      var temp_admin = new Admin(0, this.username, "", "", "", this.password)
      if(this.loginService.loginAdmin(temp_admin)) {
        this.router.navigate(['/admin/home']);
      } else {
        this.not_found_err = true;
        this.username = "";
        this.password = "";
        console.log('user not found');
      }
    } else {
      if(this.pass_err) {
        this.password = "";
      }
      if(this.usr_name_err)
      this.username = "";
      this.password = "";
    }

  }

}
