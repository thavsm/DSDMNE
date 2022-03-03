import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInternalDataImportComponent } from './view-internal-data-import.component';

describe('ViewInternalDataImportComponent', () => {
  let component: ViewInternalDataImportComponent;
  let fixture: ComponentFixture<ViewInternalDataImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewInternalDataImportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInternalDataImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
