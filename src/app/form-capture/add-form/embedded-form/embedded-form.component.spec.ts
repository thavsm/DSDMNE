import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbeddedFormComponent } from './embedded-form.component';

describe('EmbeddedFormComponent', () => {
  let component: EmbeddedFormComponent;
  let fixture: ComponentFixture<EmbeddedFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmbeddedFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbeddedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
