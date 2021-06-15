import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelActivityListComponent } from './fuel-activity-list.component';

describe('FuelActivityListComponent', () => {
  let component: FuelActivityListComponent;
  let fixture: ComponentFixture<FuelActivityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuelActivityListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelActivityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
