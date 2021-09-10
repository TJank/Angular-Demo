import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';

const routes: Routes = [
  {
    path: "",
    component: LandingPageComponent
  },
  {
    path: "login",
    component: LoginPageComponent
  },
  // {
  //   path: "admin",
  //   component: AdminLoginViewComponent
  // },
  // {
  //   path: "coach",
  //   component: CoachLoginViewComponent
  // },
  // {
  //   path: "register",
  //   component: UserRegisterViewComponent
  // },
  // {
  //   path: "coach/home",
  //   component: CoachLandingViewComponent
  // },
  // {
  //   path: "coach/edit-profile",
  //   component: CoachEditProfileViewComponent
  // },
  // {
  //   path: "user/home",
  //   component: UserLandingViewComponent
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
