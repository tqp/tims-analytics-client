import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerDetailEditComponent } from './player-detail-edit.component';

describe('PlayerDetailEditComponent', () => {
  let component: PlayerDetailEditComponent;
  let fixture: ComponentFixture<PlayerDetailEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerDetailEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerDetailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
