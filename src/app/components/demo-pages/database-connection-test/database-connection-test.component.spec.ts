import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseConnectionTestComponent } from './database-connection-test.component';

describe('DatabaseConnectionTestComponent', () => {
  let component: DatabaseConnectionTestComponent;
  let fixture: ComponentFixture<DatabaseConnectionTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatabaseConnectionTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseConnectionTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
