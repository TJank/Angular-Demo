import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateCoachPageComponent } from './admin-create-coach-page.component';

describe('AdminCreateCoachPageComponent', () => {
  let component: AdminCreateCoachPageComponent;
  let fixture: ComponentFixture<AdminCreateCoachPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCreateCoachPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCreateCoachPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
