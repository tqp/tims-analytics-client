import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodeCreateDialogComponent } from './episode-create-dialog.component';

describe('EpisodeCreateDialogComponent', () => {
  let component: EpisodeCreateDialogComponent;
  let fixture: ComponentFixture<EpisodeCreateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpisodeCreateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpisodeCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
