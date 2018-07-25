import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestProjectPopupComponent } from './invest-project-popup.component';

describe('InvestProjectPopupComponent', () => {
  let component: InvestProjectPopupComponent;
  let fixture: ComponentFixture<InvestProjectPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestProjectPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestProjectPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
