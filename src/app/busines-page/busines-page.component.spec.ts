import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinesPageComponent } from './busines-page.component';

describe('BusinesPageComponent', () => {
  let component: BusinesPageComponent;
  let fixture: ComponentFixture<BusinesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
