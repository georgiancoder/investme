import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HowaddComponent } from './howadd.component';

describe('HowaddComponent', () => {
  let component: HowaddComponent;
  let fixture: ComponentFixture<HowaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
