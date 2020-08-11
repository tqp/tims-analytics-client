import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicDatabaseConnectionComponent } from './basic-database-connection.component';

describe('BasicDatabaseConnectionComponent', () => {
  let component: BasicDatabaseConnectionComponent;
  let fixture: ComponentFixture<BasicDatabaseConnectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicDatabaseConnectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicDatabaseConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
