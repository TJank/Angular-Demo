import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { AdminCreateCoachPageComponent } from './components/admin-create-coach-page/admin-create-coach-page.component';
import { AdminHomePageComponent } from './components/admin-home-page/admin-home-page.component';
import { CoachEditProfilePageComponent } from './components/coach-edit-profile-page/coach-edit-profile-page.component';
import { CoachHomePageComponent } from './components/coach-home-page/coach-home-page.component';
import { CoachViewSessionPageComponent } from './components/coach-view-session-page/coach-view-session-page.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginAdminPageComponent } from './components/login-admin-page/login-admin-page.component';
import { LoginCoachPageComponent } from './components/login-coach-page/login-coach-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { UserEditProfilePageComponent } from './components/user-edit-profile-page/user-edit-profile-page.component';
import { UserHomePageComponent } from './components/user-home-page/user-home-page.component';
import { UserSubmitSessionPageComponent } from './components/user-submit-session-page/user-submit-session-page.component';

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
    path: "user/edit-profile",
    component: UserEditProfilePageComponent
  },
  {
    path: "user/create-session",
    component: UserSubmitSessionPageComponent
  },
  {
    path: "coach",
    component: LoginCoachPageComponent
  },
  {
    path: "coach/home",
    component: CoachHomePageComponent
  },
  {
    path: "coach/view-session",
    component: CoachViewSessionPageComponent
  },
  {
    path: "coach/edit-profile",
    component: CoachEditProfilePageComponent
  },
  {
    path: "admin",
    component: LoginAdminPageComponent
  },
  {
    path: "admin/home",
    component: AdminHomePageComponent
  },
  {  path: "admin/create-coach",
    component: AdminCreateCoachPageComponent
  },
  {  path: "about",
    component: AboutPageComponent
  },
  


  //Wild Card Route for 404 request
  { path: '**', pathMatch: 'full', 
  component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
