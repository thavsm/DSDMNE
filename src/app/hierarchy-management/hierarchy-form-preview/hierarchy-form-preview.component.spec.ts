import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HierarchyFormPreviewComponent } from './hierarchy-form-preview.component';

describe('HierarchyFormPreviewComponent', () => {
  let component: HierarchyFormPreviewComponent;
  let fixture: ComponentFixture<HierarchyFormPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HierarchyFormPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HierarchyFormPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
