import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrepreneurshipPageComponent } from './entrepreneurship-page.component';

describe('EntrepreneurshipPageComponent', () => {
  let component: EntrepreneurshipPageComponent;
  let fixture: ComponentFixture<EntrepreneurshipPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntrepreneurshipPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrepreneurshipPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
