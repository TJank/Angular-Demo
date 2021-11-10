import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachViewSessionPageComponent } from './coach-view-session-page.component';

describe('CoachViewSessionPageComponent', () => {
  let component: CoachViewSessionPageComponent;
  let fixture: ComponentFixture<CoachViewSessionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachViewSessionPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachViewSessionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
