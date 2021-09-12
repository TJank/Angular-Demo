import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachHomePageComponent } from './coach-home-page.component';

describe('CoachHomePageComponent', () => {
  let component: CoachHomePageComponent;
  let fixture: ComponentFixture<CoachHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachHomePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
