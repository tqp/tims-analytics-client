import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelActivityDetailEditComponent } from './fuel-activity-detail-edit.component';

describe('FuelActivityDetailEditComponent', () => {
  let component: FuelActivityDetailEditComponent;
  let fixture: ComponentFixture<FuelActivityDetailEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuelActivityDetailEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelActivityDetailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
