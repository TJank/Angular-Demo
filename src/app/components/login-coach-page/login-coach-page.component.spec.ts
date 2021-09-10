import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginCoachPageComponent } from './login-coach-page.component';

describe('LoginCoachPageComponent', () => {
  let component: LoginCoachPageComponent;
  let fixture: ComponentFixture<LoginCoachPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginCoachPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginCoachPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
