import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleListDeletedComponent } from './role-list-deleted.component';

describe('RoleListDeletedComponent', () => {
  let component: RoleListDeletedComponent;
  let fixture: ComponentFixture<RoleListDeletedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleListDeletedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleListDeletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
