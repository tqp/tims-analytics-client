import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodeDetailEditComponent } from './episode-detail-edit.component';

describe('EpisodeDetailEditComponent', () => {
  let component: EpisodeDetailEditComponent;
  let fixture: ComponentFixture<EpisodeDetailEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpisodeDetailEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpisodeDetailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
