import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudMasterInfiniteScrollComponent } from './crud-master-infinite-scroll.component';

describe('CrudMasterInfiniteScrollComponent', () => {
  let component: CrudMasterInfiniteScrollComponent;
  let fixture: ComponentFixture<CrudMasterInfiniteScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudMasterInfiniteScrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudMasterInfiniteScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
