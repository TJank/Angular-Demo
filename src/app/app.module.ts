import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { LoginCoachPageComponent } from './components/login-coach-page/login-coach-page.component';
import { LoginAdminPageComponent } from './components/login-admin-page/login-admin-page.component';
import { LandingNavbarComponent } from './components/landing-navbar/landing-navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { UserHomePageComponent } from './components/user-home-page/user-home-page.component';
import { UserNavbarComponent } from './components/user-navbar/user-navbar.component';
import { CoachNavbarComponent } from './components/coach-navbar/coach-navbar.component';
import { CoachHomePageComponent } from './components/coach-home-page/coach-home-page.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { CoachEditProfilePageComponent } from './components/coach-edit-profile-page/coach-edit-profile-page.component';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
import { AdminCreateCoachPageComponent } from './components/admin-create-coach-page/admin-create-coach-page.component';
import { AdminHomePageComponent } from './components/admin-home-page/admin-home-page.component';
import { CoachViewSessionPageComponent } from './components/coach-view-session-page/coach-view-session-page.component';
import { UserEditProfilePageComponent } from './components/user-edit-profile-page/user-edit-profile-page.component';
import { UserSubmitSessionPageComponent } from './components/user-submit-session-page/user-submit-session-page.component';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { BsDatepickerModule } from 'node_modules/ngx-bootstrap/datepicker';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LoginPageComponent,
    LoginCoachPageComponent,
    LoginAdminPageComponent,
    LandingNavbarComponent,
    FooterComponent,
    UserHomePageComponent,
    UserNavbarComponent,
    CoachNavbarComponent,
    CoachHomePageComponent,
    PagenotfoundComponent,
    CoachEditProfilePageComponent,
    AdminNavbarComponent,
    AdminCreateCoachPageComponent,
    AdminHomePageComponent,
    CoachViewSessionPageComponent,
    UserEditProfilePageComponent,
    UserSubmitSessionPageComponent,
    AboutPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
