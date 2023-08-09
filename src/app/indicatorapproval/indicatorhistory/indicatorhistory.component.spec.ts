import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorhistoryComponent } from './indicatorhistory.component';

describe('IndicatorhistoryComponent', () => {
  let component: IndicatorhistoryComponent;
  let fixture: ComponentFixture<IndicatorhistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndicatorhistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicatorhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
