import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormExportComponent } from './form-export.component';

describe('FormExportComponent', () => {
  let component: FormExportComponent;
  let fixture: ComponentFixture<FormExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormExportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
