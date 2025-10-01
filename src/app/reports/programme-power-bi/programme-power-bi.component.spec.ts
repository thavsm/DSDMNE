import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammePowerBiComponent } from './programme-power-bi.component';

describe('ProgrammePowerBiComponent', () => {
  let component: ProgrammePowerBiComponent;
  let fixture: ComponentFixture<ProgrammePowerBiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgrammePowerBiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgrammePowerBiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
