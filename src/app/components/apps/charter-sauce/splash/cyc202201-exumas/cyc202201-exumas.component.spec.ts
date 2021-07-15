import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cyc202201ExumasComponent } from './cyc202201-exumas.component';

describe('Cyc202201ExumasComponent', () => {
  let component: Cyc202201ExumasComponent;
  let fixture: ComponentFixture<Cyc202201ExumasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cyc202201ExumasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cyc202201ExumasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
