import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsviewerComponent } from './reportsviewer.component';

describe('ReportsviewerComponent', () => {
  let component: ReportsviewerComponent;
  let fixture: ComponentFixture<ReportsviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportsviewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
