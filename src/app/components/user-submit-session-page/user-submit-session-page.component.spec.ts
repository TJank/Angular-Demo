import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSubmitSessionPageComponent } from './user-submit-session-page.component';

describe('UserSubmitSessionPageComponent', () => {
  let component: UserSubmitSessionPageComponent;
  let fixture: ComponentFixture<UserSubmitSessionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSubmitSessionPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSubmitSessionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});