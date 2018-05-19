import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RgoliComponent } from './rgoli.component';

describe('RgoliComponent', () => {
  let component: RgoliComponent;
  let fixture: ComponentFixture<RgoliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RgoliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RgoliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
