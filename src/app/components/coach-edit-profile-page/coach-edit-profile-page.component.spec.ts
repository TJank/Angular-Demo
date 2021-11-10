import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachEditProfilePageComponent } from './coach-edit-profile-page.component';

describe('CoachEditProfilePageComponent', () => {
  let component: CoachEditProfilePageComponent;
  let fixture: ComponentFixture<CoachEditProfilePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachEditProfilePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachEditProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
