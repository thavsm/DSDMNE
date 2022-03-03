import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditExternalDataComponent } from './add-edit-external-data.component';

describe('AddEditExternalDataComponent', () => {
  let component: AddEditExternalDataComponent;
  let fixture: ComponentFixture<AddEditExternalDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditExternalDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditExternalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
