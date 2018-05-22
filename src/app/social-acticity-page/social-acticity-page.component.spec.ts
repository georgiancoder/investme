import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialActicityPageComponent } from './social-acticity-page.component';

describe('SocialActicityPageComponent', () => {
  let component: SocialActicityPageComponent;
  let fixture: ComponentFixture<SocialActicityPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialActicityPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialActicityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
