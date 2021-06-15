import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudMasterServerScrollComponent } from './crud-master-server-scroll.component';

describe('CrudMasterServerScrollComponent', () => {
  let component: CrudMasterServerScrollComponent;
  let fixture: ComponentFixture<CrudMasterServerScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudMasterServerScrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudMasterServerScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
