import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutDevsPageComponent } from './about-devs-page.component';

describe('AboutDevsPageComponent', () => {
  let component: AboutDevsPageComponent;
  let fixture: ComponentFixture<AboutDevsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutDevsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutDevsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
