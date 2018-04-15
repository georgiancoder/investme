import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSliderComponent } from './project-slider.component';

describe('ProjectSliderComponent', () => {
  let component: ProjectSliderComponent;
  let fixture: ComponentFixture<ProjectSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
