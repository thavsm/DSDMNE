import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorEditComponent } from './indicator-edit.component';

describe('IndicatorEditComponent', () => {
  let component: IndicatorEditComponent;
  let fixture: ComponentFixture<IndicatorEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndicatorEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicatorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
