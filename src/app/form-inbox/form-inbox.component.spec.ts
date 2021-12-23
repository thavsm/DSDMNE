import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInboxComponent } from './form-inbox.component';

describe('FormInboxComponent', () => {
  let component: FormInboxComponent;
  let fixture: ComponentFixture<FormInboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormInboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
