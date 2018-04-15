import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteprojectsComponent } from './favoriteprojects.component';

describe('FavoriteprojectsComponent', () => {
  let component: FavoriteprojectsComponent;
  let fixture: ComponentFixture<FavoriteprojectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoriteprojectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteprojectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
