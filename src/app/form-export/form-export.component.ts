import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormbuilderService } from '../shared/formbuilder.service';
import { TreediagramService } from '../treediagram.service';
import * as XLSX from 'xlsx';
import * as Excel from 'exceljs';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { UserService } from 'src/app/shared/user.service';

declare var $: any;

@Component({
  selector: 'app-form-export',
  templateUrl: './form-export.component.html',
  styleUrls: ['./form-export.component.css']
})
export class FormExportComponent implements OnInit {

  constructor(public userService: UserService,private service: FormbuilderService, private spinner: NgxSpinnerService, private _formBuilder: FormBuilder, private treeService: TreediagramService) { }

  format = {
    add: 'Add Field', remove: 'Remove Field', all: 'Select All', none: 'Deselect All',
    direction: 'left-to-right', draggable: true, locale: 'undefined'
  };
  userData: any;
  provID: any;
  formCategoryList: any[];
  formList: any[];
  listOfQuestions: any[];
  categoryID: number;
  formID: any;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  assigned = [];
  key: string;
  station: string;
  source = [];
  excelHeaders: string[] = [];
  formPages: any;
  

  @ViewChild('stepper') private myStepper: MatStepper;

  ngOnInit(): void {
    this.refreshFormsCategoryList();
    this.firstFormGroup = this._formBuilder.group({
      category: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      form: ['', Validators.required],
    });
  }

  refreshFormsCategoryList() {
    this.spinner.show();
    this.service.getformCategoryList().subscribe(data => {
      this.formCategoryList = data;
      this.spinner.hide();
    });
  }

  filterForms() {
    let ID = this.categoryID;
    this.spinner.show();
    this.userService.getUserProfile().subscribe(data => {
      this.userData = data['formData'];
      this.provID = this.userData["provinceID"];
      this.service.getDynamicFormListProvince(this.provID ).subscribe(data => {
        this.formList = data.filter(function (e) {
          return e.formCategoryID == ID;
        });
        if (this.formList.length == 0) {
          this.showNotification('top', 'center', 'There are no forms linked to this category!', '', 'warning');
          this.myStepper.previous();
        }
        this.spinner.hide();
      });
    });
  }
  filterFormQuestions() {
    let ID = this.formID;
    this.spinner.show();
    this.source=[];
    this.service.getFormPages(ID).subscribe(data => {
     this.formPages = data;
      this.service.getFormFieldsPerPage(ID, this.formPages[0].pageGUID).subscribe(data => {
       this.listOfQuestions = data;
        console.log("data"+data);
        console.log("lquestions" + this.listOfQuestions);
        data.forEach(lq => {
          if (lq.fieldType.fieldTypeID == 32) {
            this.source.push(lq);
          }
          else if (lq.fieldType.fieldTypeID == 9) {
            if (this.checkIfParentIsASection(lq)) {
              this.source.push(lq);
            }
          }
        });
        if (this.source.length == 0) {
          this.showNotification('top', 'center', 'There are no fields to export in this form!', '', 'warning');
          this.myStepper.previous();
        }
        this.spinner.hide();
      });
    });
  }

  assign() {
    const header = ["IndicatorName", "Disaggregation", "Value"];
    this.spinner.show();
    //this.source=[];
    const data: any = [];
      this.assigned.forEach((element, i) => {
      let cell = [element.questionName, '', ''];
      data.push(cell);
      let kids = this.getChildrenFields(element);
      if (kids.length !== 0) {
        kids.forEach(c => {
          // if (c.includes('Total')) {
          //   data[i][1] = c;
          // }
          // else {
            let dis = ['', c, ''];
            data.push(dis);
          // }
        });
      };
      data.push(['', '', '']);
    });

    let wb = new Workbook();
    let ws = wb.addWorksheet('Indicator Data');

    let headerRow = ws.addRow(header);

    headerRow.eachCell(cell => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'C0C0C0' },
        bgColor: { argb: '000000' }
      }
      cell.border = { top: { style: 'thin' }, bottom: { style: 'thin' }, left: { style: 'thin' }, right: { style: 'thin' } };
      cell.font={bold:true}
    });

    data.forEach(d => {
      let row = ws.addRow(d);
      let qty1 = row.getCell(1);
      let qty2 = row.getCell(2);
      let qty3 = row.getCell(3);
      qty1.border = {
        top: { style: 'thin', color: { argb: '000000' } }, bottom: { style: 'thin', color: { argb: '000000' } }, left: { style: 'thin', color: { argb: '000000' } }, right: { style: 'thin', color: { argb: '000000' } }
      };
      qty1.alignment = { vertical: 'left', horizontal: 'left', wrapText: true };

      qty2.border = {
        top: { style: 'thin', color: { argb: '000000' } }, bottom: { style: 'thin', color: { argb: '000000' } }, left: { style: 'thin', color: { argb: '000000' } }, right: { style: 'thin', color: { argb: '000000' } }
      };
      qty2.alignment = { vertical: 'left', horizontal: 'left', wrapText: true };

      qty3.border = {
        top: { style: 'thin', color: { argb: '000000' } }, bottom: { style: 'thin', color: { argb: '000000' } }, left: { style: 'thin', color: { argb: '000000' } }, right: { style: 'thin', color: { argb: '000000' } }
      };
      qty3.alignment = { vertical: 'left', horizontal: 'left', wrapText: true };
    });

    ws.columns = [
      { width: 40 }, { width: 35 }, { width: 10 }
    ];

    ws.eachRow(function (row, rowNumber) {
      if (row.getCell(1).value.length > 0 && rowNumber!==1) {
        row.getCell(1).fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'dcdcdc' },
          bgColor: { argb: '000000' }
        };
        row.getCell(2).fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'dcdcdc' },
          bgColor: { argb: '000000' }
        };
        row.getCell(3).fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'dcdcdc' },
          bgColor: { argb: '000000' }
        };
      }
    });


    wb.xlsx.writeBuffer().then(data => {
      let blob = new Blob([data],
        {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });
      fs.saveAs(blob, 'Service point Indicators');
    });
    
    this.spinner.hide();
    this.assigned = [];
    this.myStepper.previous();
    this.myStepper.previous();
  }

  checkIfParentIsASection(field: any): Boolean {
    let isParent: Boolean = false;
    this.listOfQuestions.forEach(f => {
      if (f.groupGUID === field.parentFieldName && f.fieldType.fieldTypeID === 6) {
        isParent = true;
      }
    });
    return isParent;
  }

  getChildrenFields(field: any): any[] {
    let arr = [];
    this.listOfQuestions.forEach(f => {
      if (field.groupGUID === f.parentFieldName && f.fieldType.fieldTypeID === 9) {
        arr.push(f.questionName);
      }
    });
    return arr;
  }

  showNotification(from: any, align: any, message: any, title: any, type: string) {
    $.notify({
      icon: 'notifications',
      title: title,
      message: message
    }, {
      type: type,
    delay: 1500,
timer: 1500,
      placement: {
        from: from,
        align: align
      },

      template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
        '<button mat-raised-button type="button" aria-hidden="true" class="close" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
        '<i class="material-icons" data-notify="icon">notifications</i> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
  }
}
