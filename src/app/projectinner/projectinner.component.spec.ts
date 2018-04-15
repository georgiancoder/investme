import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectinnerComponent } from './projectinner.component';

describe('ProjectinnerComponent', () => {
  let component: ProjectinnerComponent;
  let fixture: ComponentFixture<ProjectinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
