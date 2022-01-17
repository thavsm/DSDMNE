import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeAddComponent } from './tree-add.component';

describe('TreeAddComponent', () => {
  let component: TreeAddComponent;
  let fixture: ComponentFixture<TreeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreeAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
