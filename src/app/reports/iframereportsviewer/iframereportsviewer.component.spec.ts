import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IframereportsviewerComponent } from './iframereportsviewer.component';

describe('IframereportsviewerComponent', () => {
  let component: IframereportsviewerComponent;
  let fixture: ComponentFixture<IframereportsviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IframereportsviewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IframereportsviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
