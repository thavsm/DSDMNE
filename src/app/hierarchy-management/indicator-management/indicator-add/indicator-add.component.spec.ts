import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorAddComponent } from './indicator-add.component';

describe('IndicatorAddComponent', () => {
  let component: IndicatorAddComponent;
  let fixture: ComponentFixture<IndicatorAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndicatorAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicatorAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
