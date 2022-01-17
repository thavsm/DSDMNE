import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelNodeEditComponent } from './level-node-edit.component';

describe('LevelNodeEditComponent', () => {
  let component: LevelNodeEditComponent;
  let fixture: ComponentFixture<LevelNodeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelNodeEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelNodeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
