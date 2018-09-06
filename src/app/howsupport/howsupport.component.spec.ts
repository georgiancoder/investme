import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HowsupportComponent } from './howsupport.component';

describe('HowsupportComponent', () => {
  let component: HowsupportComponent;
  let fixture: ComponentFixture<HowsupportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowsupportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowsupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
