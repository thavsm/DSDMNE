import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalDataImportComponent } from './internal-data-import.component';

describe('InternalDataImportComponent', () => {
  let component: InternalDataImportComponent;
  let fixture: ComponentFixture<InternalDataImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternalDataImportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalDataImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
