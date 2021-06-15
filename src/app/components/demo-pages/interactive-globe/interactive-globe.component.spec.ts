import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractiveGlobeComponent } from './interactive-globe.component';

describe('InteractiveGlobeComponent', () => {
  let component: InteractiveGlobeComponent;
  let fixture: ComponentFixture<InteractiveGlobeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InteractiveGlobeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InteractiveGlobeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
