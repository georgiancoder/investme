import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialEntrepreneurshipPageComponent } from './social-entrepreneurship-page.component';

describe('SocialEntrepreneurshipPageComponent', () => {
  let component: SocialEntrepreneurshipPageComponent;
  let fixture: ComponentFixture<SocialEntrepreneurshipPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialEntrepreneurshipPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialEntrepreneurshipPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
