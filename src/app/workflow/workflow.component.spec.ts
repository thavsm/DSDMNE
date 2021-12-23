import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DiagramComponent } from './diagram/diagram.component';
/*import { DiagramComponent } from 'src/app/diagram/diagram.component';*/
import { DebugNode } from '@angular/core';
import { WorkflowComponent } from './workflow.component';

describe('WorkflowComponent', () => {

  let fixture: ComponentFixture<WorkflowComponent>;
  let component: DebugNode['componentInstance'];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        WorkflowComponent,
        DiagramComponent
      ],
      imports: [HttpClientTestingModule]
    }).compileComponents();
    fixture = TestBed.createComponent(WorkflowComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('renders a diagram component', () => {
    expect(fixture.nativeElement.querySelector('app-diagram')).toBeTruthy();
  });


  it('sets an error message', () => {
    const error = new Error('ERROR');

    component.handleImported({
      type: 'error',
      error
    });

    expect(component.importError).toEqual(error);
  });

});
