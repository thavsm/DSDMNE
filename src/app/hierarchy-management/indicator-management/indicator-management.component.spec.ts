import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorManagementComponent } from './indicator-management.component';

describe('IndicatorManagementComponent', () => {
  let component: IndicatorManagementComponent;
  let fixture: ComponentFixture<IndicatorManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndicatorManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicatorManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
