import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityaddComponent } from './facilityadd.component';

describe('FacilityaddComponent', () => {
  let component: FacilityaddComponent;
  let fixture: ComponentFixture<FacilityaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacilityaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilityaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
