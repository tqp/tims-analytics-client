import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelActivityDetailComponent } from './fuel-activity-detail.component';

describe('FuelActivityDetailComponent', () => {
  let component: FuelActivityDetailComponent;
  let fixture: ComponentFixture<FuelActivityDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuelActivityDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelActivityDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
