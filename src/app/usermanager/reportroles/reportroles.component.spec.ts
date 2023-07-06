import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportrolesComponent } from './reportroles.component';

describe('ReportrolesComponent', () => {
  let component: ReportrolesComponent;
  let fixture: ComponentFixture<ReportrolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportrolesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportrolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
