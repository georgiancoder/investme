import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaInnerComponent } from './media-inner.component';

describe('MediaInnerComponent', () => {
  let component: MediaInnerComponent;
  let fixture: ComponentFixture<MediaInnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaInnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
