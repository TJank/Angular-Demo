import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditProfilePageComponent } from './user-edit-profile-page.component';

describe('UserEditProfilePageComponent', () => {
  let component: UserEditProfilePageComponent;
  let fixture: ComponentFixture<UserEditProfilePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserEditProfilePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
