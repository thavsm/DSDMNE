import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldroleComponent } from './fieldrole.component';

describe('FieldroleComponent', () => {
  let component: FieldroleComponent;
  let fixture: ComponentFixture<FieldroleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldroleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldroleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
