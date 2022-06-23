import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SqlreportsComponent } from './sqlreports.component';

describe('SqlreportsComponent', () => {
  let component: SqlreportsComponent;
  let fixture: ComponentFixture<SqlreportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SqlreportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SqlreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
