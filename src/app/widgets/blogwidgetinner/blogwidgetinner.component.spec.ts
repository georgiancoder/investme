import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogwidgetinnerComponent } from './blogwidgetinner.component';

describe('BlogwidgetinnerComponent', () => {
  let component: BlogwidgetinnerComponent;
  let fixture: ComponentFixture<BlogwidgetinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogwidgetinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogwidgetinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
