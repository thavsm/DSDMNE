import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilitydataComponent } from './facilitydata.component';

describe('FacilitydataComponent', () => {
  let component: FacilitydataComponent;
  let fixture: ComponentFixture<FacilitydataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacilitydataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilitydataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
