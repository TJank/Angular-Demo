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

  success = false;
  errorNum:number;
  errors:string[];

  adminLogin() {
    this.errors = [];
    this.errorNum = 0;

    if(this.username == null) {
      
      this.errorNum++;
      this.errors.push("Please specify your username.")
    }
    else if (!(this.username.trim().length > 0)) {
      this.errorNum++;
      this.errors.push("Please specify your username.");
    }

    // password check
    if(this.password == null) {
      this.errorNum++;
      this.errors.push("Please enter Password.");
    }

    // call login service
    if(this.errorNum == 0) {
      var temp_admin = new Admin(0, this.username, "", "", "", this.password)
      if(this.loginService.loginAdmin(temp_admin)) {
        console.log('returned true!')

        this.router.navigate(['/admin/home']);
      } else {
        console.log('returned false... login failure')
      }
    }
  }

}
