import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThumbsSliderComponent } from './thumbs-slider.component';

describe('ThumbsSliderComponent', () => {
  let component: ThumbsSliderComponent;
  let fixture: ComponentFixture<ThumbsSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThumbsSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThumbsSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
