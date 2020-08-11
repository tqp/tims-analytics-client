import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiTimerComponent } from './multi-timer.component';

describe('MultiTimerComponent', () => {
  let component: MultiTimerComponent;
  let fixture: ComponentFixture<MultiTimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiTimerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
