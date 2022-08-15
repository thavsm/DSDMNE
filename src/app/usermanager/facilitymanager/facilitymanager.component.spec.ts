import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilitymanagerComponent } from './facilitymanager.component';

describe('FacilitymanagerComponent', () => {
  let component: FacilitymanagerComponent;
  let fixture: ComponentFixture<FacilitymanagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacilitymanagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilitymanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
