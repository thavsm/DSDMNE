import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcReportComponent } from './calc-report.component';

describe('CalcReportComponent', () => {
  let component: CalcReportComponent;
  let fixture: ComponentFixture<CalcReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalcReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

