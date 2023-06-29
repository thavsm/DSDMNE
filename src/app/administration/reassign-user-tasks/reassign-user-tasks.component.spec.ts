import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReassignUserTasksComponent } from './reassign-user-tasks.component';

describe('ReassignUserTasksComponent', () => {
  let component: ReassignUserTasksComponent;
  let fixture: ComponentFixture<ReassignUserTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReassignUserTasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReassignUserTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
