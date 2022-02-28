import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalDataImportComponent } from './external-data-import.component';

describe('ExternalDataImportComponent', () => {
  let component: ExternalDataImportComponent;
  let fixture: ComponentFixture<ExternalDataImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExternalDataImportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalDataImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
