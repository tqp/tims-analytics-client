import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoHeatmapComponent } from './geo-heatmap.component';

describe('GeoHeatmapComponent', () => {
  let component: GeoHeatmapComponent;
  let fixture: ComponentFixture<GeoHeatmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeoHeatmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoHeatmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
