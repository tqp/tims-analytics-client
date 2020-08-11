import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudMasterServerPaginationComponent } from './crud-master-server-pagination.component';

describe('CrudMasterServerPaginationComponent', () => {
  let component: CrudMasterServerPaginationComponent;
  let fixture: ComponentFixture<CrudMasterServerPaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudMasterServerPaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudMasterServerPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
