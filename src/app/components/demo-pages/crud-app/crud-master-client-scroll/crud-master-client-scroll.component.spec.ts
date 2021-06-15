import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudMasterClientScrollComponent } from './crud-master-client-scroll.component';

describe('CrudMasterClientScrollComponent', () => {
  let component: CrudMasterClientScrollComponent;
  let fixture: ComponentFixture<CrudMasterClientScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudMasterClientScrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudMasterClientScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
