import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudDetailEditPageComponent } from './crud-detail-edit-page.component';

describe('CrudDetailEditPageComponent', () => {
  let component: CrudDetailEditPageComponent;
  let fixture: ComponentFixture<CrudDetailEditPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudDetailEditPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudDetailEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
