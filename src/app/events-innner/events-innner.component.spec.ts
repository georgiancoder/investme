import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsInnnerComponent } from './events-innner.component';

describe('EventsInnnerComponent', () => {
  let component: EventsInnnerComponent;
  let fixture: ComponentFixture<EventsInnnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsInnnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsInnnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
