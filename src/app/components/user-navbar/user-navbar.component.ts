import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login-service/login.service';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})
export class UserNavbarComponent implements OnInit {

  constructor(private loginService:LoginService,
    private router:Router) { }

  ngOnInit(): void {
  }

  logout() {
    console.log("logout from navbar called")
    this.loginService.destroySessionVariables();
    if(!this.loginService.isLoggedIn()) {
      this.router.navigateByUrl("/login");
    }

   
  }

}
