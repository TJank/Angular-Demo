import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutNavbarComponent } from './about-navbar.component';

describe('AboutNavbarComponent', () => {
  let component: AboutNavbarComponent;
  let fixture: ComponentFixture<AboutNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
