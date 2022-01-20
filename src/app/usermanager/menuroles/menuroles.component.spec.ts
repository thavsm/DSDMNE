import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenurolesComponent } from './menuroles.component';

describe('MenurolesComponent', () => {
  let component: MenurolesComponent;
  let fixture: ComponentFixture<MenurolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenurolesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenurolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
