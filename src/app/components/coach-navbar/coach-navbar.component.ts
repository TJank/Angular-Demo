import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login-service/login.service';

@Component({
  selector: 'app-coach-navbar',
  templateUrl: './coach-navbar.component.html',
  styleUrls: ['./coach-navbar.component.css']
})
export class CoachNavbarComponent implements OnInit {

  constructor(
    private loginService:LoginService,
    private router:Router
  ) { }

  ngOnInit(): void {
    
  }

  logout() {
    console.log("logout from navbar called")
    this.loginService.destroySessionVariables();
    if (!this.loginService.isLoggedIn()) {
      this.router.navigateByUrl("/login");
    }
  }

}
