import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSupportersComponent } from './project-supporters.component';

describe('ProjectSupportersComponent', () => {
  let component: ProjectSupportersComponent;
  let fixture: ComponentFixture<ProjectSupportersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectSupportersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSupportersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
