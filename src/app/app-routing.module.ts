import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoachHomePageComponent } from './components/coach-home-page/coach-home-page.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginCoachPageComponent } from './components/login-coach-page/login-coach-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { UserHomePageComponent } from './components/user-home-page/user-home-page.component';

const routes: Routes = [
  {
    path: "",
    component: LandingPageComponent
  },
  {
    path: "login",
    component: LoginPageComponent
  },
  {
    path: "user/home",
    component: UserHomePageComponent
  },
  {
    path: "coach",
    component: LoginCoachPageComponent
  },
  {
    path: "coach/home",
    component: CoachHomePageComponent
  },
  // {
  //   path: "admin",
  //   component: AdminLoginViewComponent
  // },

  // {
  //   path: "register",
  //   component: UserRegisterViewComponent
  // },
  // {
  
  // {
  //   path: "coach/edit-profile",
  //   component: CoachEditProfileViewComponent
  // },
  
  // {
  //   path: "user/create-session",
  //   component: UserCreateSessionComponent
  // },
  // {
  //   path: "admin/create-coach",
  //   component: AdminCreateCoachViewComponent
  // },
  // {
  //   path: "admin/admin-landing",
  //   component: AdminLandingViewComponent
  // }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
