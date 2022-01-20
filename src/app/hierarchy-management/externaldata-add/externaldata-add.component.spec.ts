import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternaldataAddComponent } from './externaldata-add.component';

describe('ExternaldataAddComponent', () => {
  let component: ExternaldataAddComponent;
  let fixture: ComponentFixture<ExternaldataAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExternaldataAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternaldataAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
