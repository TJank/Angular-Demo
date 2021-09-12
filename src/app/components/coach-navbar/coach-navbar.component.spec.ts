import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachNavbarComponent } from './coach-navbar.component';

describe('CoachNavbarComponent', () => {
  let component: CoachNavbarComponent;
  let fixture: ComponentFixture<CoachNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
