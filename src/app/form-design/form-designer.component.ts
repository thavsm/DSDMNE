import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-form-designer',
  templateUrl: './form-designer.component.html',
  styleUrls: ['./form-designer.component.css']
})
export class FormDesignerComponent implements OnInit {

  fieldTypes = [
    {
      "type": "attachment",
      "icon": "attach_file",
      "label": "Attachment",
      "Question": "Question Name",
      "className": "form-control",
      "subtype": "file"
    },
    {
      "type": "calculation",
      "icon": "calculate",
      "label": "Calculation",
      "Question": "Question Name",
    },
    {
      "type": "checkbox",
      "required": true,
      "label": "Checkbox",
      "Question": "Question Name",
      "icon": "check_box",
      "description": "Checkbox",
      "inline": true,
      "values": [
        {
          "label": "Option 1",
          "value": "option-1"
        },
        {
          "label": "Option 2",
          "value": "option-2"
        }
      ]
    },
    {
      "type": "date",
      "icon": "date_range",
      "label": "Date",
      "Question": "Question Name",
      "placeholder": "Date",
      "className": "form-control"
    },
    {
      "type": "email",
      "icon": "email",
      "required": true,
      "label": "Email",
      "Question": "Question Name",
      "description": "Enter your email",
      "placeholder": "Enter your email",
      "className": "form-control",
      "subtype": "text",
      "regex": "^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+)\.([a-zA-Z]{2,5})$",
      "errorText": "Please enter a valid email",
      "handle": true
    },
    {
      "type": "embeddedform",
      "icon": "description",
      "label": "Embedded Form",
      "Question": "Question Name",
      "placeholder": "embeddedform",
      "className": "form-control",
      "values": [
        {
          "label": "Form 1",
          "value": "option-1"
        },
        {
          "label": "Form 2",
          "value": "option-2"
        }
      ]
    },

    {
      "type": "macro",
      "icon": "functions",
      "label": "Macro",
      "Question": "Question Name",
      "placeholder": "Type your text to display here only"
    },
    {
      "type": "number",
      "label": "Number",
      "Question": "Question Name",
      "icon": "numbers",
      "description": "Age",
      "placeholder": "Enter your age",
      "className": "form-control",
      "value": "20",
      "min": 12,
      "max": 90
    },
    {
      "type": "radio",
      "icon": "radio_button_checked",
      "label": "Radio",
      "Question": "Question Name",
      "description": "Radio boxes",
      "values": [
        {
          "label": "Option 1",
          "value": "option-1"
        },
        {
          "label": "Option 2",
          "value": "option-2"
        }
      ]
    },
    {
      "type": "repeatgroup",
      "icon": "repeat_on",
      "label": "Repeat Group",
      "Question": "Question Name",
      "placeholder": "repeatgroup",
      "className": "form-control"
    },
    {
      "type": "section",
      "icon": "article",
      "label": "Section",
      "Question": "Question Name",
      "placeholder": "section",
      "className": "form-control"
    },
    {
      "type": "select",
      "icon": "unfold_more",
      "label": "Select",
      "Question": "Question Name",
      "description": "Select",
      "placeholder": "Select",
      "className": "form-control",
      "values": [
        {
          "label": "Option 1",
          "value": "option-1"
        },
        {
          "label": "Option 2",
          "value": "option-2"
        },
        {
          "label": "Option 3",
          "value": "option-3"
        }
      ]
    },
    {
      "type": "text",
      "icon": "text_fields",
      "label": "Text",
      "Question": "Question Name",
      "description": "Enter your name",
      "placeholder": "Enter your name",
      "className": "form-control",
      "subtype": "text",
      "regex": "",
      "handle": true
    },
  ];

  pages = [
    'Page ',
    'Page ',
    'Page '
  ];
  
  formDesign: any = [];

  constructor() { }

  ngOnInit(): void {
    
  }

  toggleValue(item: any) {
    item.selected = !item.selected;
  }

  removeField(i: any) {
    if (i > -1) {
      this.formDesign.splice(i, 1);
    }
  }

  viewPage(i: any) {
    this.formDesign=[];
  }

  addPage() {
    this.pages.push('Page ')
  }

  removePage(i: any) {
    if (i > -1) {
      this.pages.splice(i, 1);
    }
  }

  // droppages(event: CdkDragDrop<string[]>) {
  //   moveItemInArray(this.pages, event.previousIndex, event.currentIndex);
  // }

  drop(event: any) {
    //re-orders list
    if (event.previousContainer === event.container && event.container.data !== this.fieldTypes) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      //moves field to form list
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
