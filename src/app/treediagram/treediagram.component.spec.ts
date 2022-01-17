import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreediagramComponent } from './treediagram.component';

describe('TreediagramComponent', () => {
  let component: TreediagramComponent;
  let fixture: ComponentFixture<TreediagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreediagramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreediagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
