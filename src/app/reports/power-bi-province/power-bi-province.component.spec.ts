import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerBiProvinceComponent } from './power-bi-province.component';

describe('PowerBiProvinceComponent', () => {
  let component: PowerBiProvinceComponent;
  let fixture: ComponentFixture<PowerBiProvinceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PowerBiProvinceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerBiProvinceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
