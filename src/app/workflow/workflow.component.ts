import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DiagramComponent } from './diagram/diagram.component';

@Component({
  selector: 'app-workflow-cmp',
  templateUrl: './workflow.component.html',
  styleUrls: [
    "./workflow.component.css"
  ],
  encapsulation: ViewEncapsulation.None
})
export class WorkflowComponent implements OnInit {
  title = 'bpmn-js-angular';
  diagramUrl = 'https://cdn.staticaly.com/gh/bpmn-io/bpmn-js-examples/dfceecba/starter/diagram.bpmn';
  importError?: Error;

  constructor() { }

  ngOnInit(): void {
  }

  handleImported(event) {

    const {
      type,
      error,
      warnings
    } = event;

    if (type === 'success') {
      console.log(`Rendered diagram (%s warnings)`, warnings.length);
    }

    if (type === 'error') {
      console.error('Failed to render diagram', error);
    }

    this.importError = error;

  }

  closeModal() {
    //let d = new DiagramComponent(null);
    //d.closeModal();
  }

  finalButtonClick() {

  }

}
