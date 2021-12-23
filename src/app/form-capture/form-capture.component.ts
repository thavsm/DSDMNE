import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FormbuilderService } from '../shared/formbuilder.service';
import {NgxSpinner, NgxSpinnerService} from 'ngx-spinner';
import { AddFormComponent } from './add-form/add-form.component';
import { HttpClient } from '@angular/common/http';
declare var $: any;

export interface FormData {
  name: string;
  description: string;
}

@Component({
  selector: 'app-form-capture',
  templateUrl: './form-capture.component.html',
  styleUrls: ['./form-capture.component.css']
})
export class FormCaptureComponent implements OnInit {

  constructor(public dialog: MatDialog, private route: Router, private service: FormbuilderService,private spinner:NgxSpinnerService) { }
  
  public formData:any=[{"formID":0,"formName":""}];

  public formList:any = [];

  ngOnInit(): void {
    this.refreshFormsList();
  }

  addForm(){
    if((this.formData.formID!==0) && (this.formData.formID!==undefined) && (this.formData.formName!=="")  && (this.formData.formName!==undefined))
    {
      let myObj = {
        formID: this.formData.formID,
        formName:this.formData.formName
      };
      localStorage.setItem('formIDCapture', JSON.stringify(myObj));
      const dialogRef = this.dialog.open(AddFormComponent, {
        width: '75%',
        height: '75%',
        disableClose:true
      });
      this.formData.formName="";
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }
    else{
      this.showNotification('top','center','Please select add a form name and choose a form template','Form Creation failed.','danger');
    }
  }

  refreshFormsList() {
    this.spinner.show();
    this.service.getDynamicFormList().subscribe(data => {
      this.formList = data;
      this.spinner.hide();
    });
  }

  showNotification(from: any, align: any, message: any, title: any, type: string) {
    $.notify({
        icon: 'notifications',
        title: title,
        message: message
    }, {
        type: type,
        timer: 3000,
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
