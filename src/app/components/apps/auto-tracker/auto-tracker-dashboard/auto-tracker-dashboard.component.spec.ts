import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoTrackerDashboardComponent } from './auto-tracker-dashboard.component';

describe('AutoTrackerDashboardComponent', () => {
  let component: AutoTrackerDashboardComponent;
  let fixture: ComponentFixture<AutoTrackerDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoTrackerDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoTrackerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
