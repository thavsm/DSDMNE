import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReassignUserTasksAdComponent } from './reassign-user-tasks-ad.component';

describe('ReassignUserTasksAdComponent', () => {
  let component: ReassignUserTasksAdComponent;
  let fixture: ComponentFixture<ReassignUserTasksAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReassignUserTasksAdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReassignUserTasksAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
