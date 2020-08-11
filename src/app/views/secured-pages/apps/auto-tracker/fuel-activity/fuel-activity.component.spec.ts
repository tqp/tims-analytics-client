import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelActivityComponent } from './fuel-activity.component';

describe('FuelActivityComponent', () => {
  let component: FuelActivityComponent;
  let fixture: ComponentFixture<FuelActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuelActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
