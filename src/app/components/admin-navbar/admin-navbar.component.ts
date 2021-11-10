import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login-service/login.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {

  constructor(
    private loginService:LoginService,
    private router:Router
  ) { }

  ngOnInit(): void {
    if (!this.loginService.isLoggedIn()) {
      this.router.navigateByUrl("/");
    }

    if(!this.loginService.validateRole("ADMIN")) {
      this.loginService.destroySessionVariables();
      console.log('validate role failed in coach-nav')
      this.router.navigateByUrl("/");
    }
  }

  logout() {
    console.log("logout from navbar called")
    this.loginService.destroySessionVariables();
    if (!this.loginService.isLoggedIn()) {
      this.router.navigateByUrl("/login");
    }
  }

}
