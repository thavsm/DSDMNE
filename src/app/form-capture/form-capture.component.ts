import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FormbuilderService } from '../shared/formbuilder.service';
import {NgxSpinner, NgxSpinnerService} from 'ngx-spinner';
import { AddFormComponent } from './add-form/add-form.component';
import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { UserService } from '../shared/user.service';
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

  constructor(public dialog: MatDialog, private route: Router, private service: FormbuilderService,private spinner:NgxSpinnerService,private userService:UserService) { }
  
  public formData:any=[{"formID":0,"formName":""}];

  public formList:any = [];

  userDetail:any;

  ngOnInit(): void {
    this.refreshFormsList();
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetail = res;
      },
      err => {
        console.log(err);
      },
    );
  }

  addForm(){
    if((this.formData.formID!==0) && (this.formData.formID!==undefined))
    {
      this.spinner.show();
      let formCaptureData={
          formCaptureID: 0,
          formName:'',
          formID: this.formData.formID,
          step: "string",
          sentBy: this.userDetail.formData.fullName,
          dateSent: "string",
          timeSent: "string",
          displayableOne: "",
          displayableTwo: "",
          geography: this.userDetail.formData.location,
          stage: "string",
          formTemplateName: "string"
      }    
      this.service.addCapturedForms(formCaptureData).subscribe(res=>{
        let myObj = {
          formID: this.formData.formID,
          formName:JSON.parse(res).formName,
          formCaptureID:JSON.parse(res).formCaptureID,
          state:'add'
        };
        this.spinner.hide();
        this.showNotification('top','center','Form created successfully','Success','success');
        localStorage.setItem('formCaptureDetails', JSON.stringify(myObj));
        localStorage.setItem('tabIndex', '0');
        const dialogRef = this.dialog.open(AddFormComponent, {
          width: '85%',
          height: '85%',
          disableClose:true
        });
        this.formData.formName="";
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
      });
    }
    else{
      this.showNotification('top','center','Please select add a form name and choose a form template','Form Creation failed.','danger');
    }
  }

  refreshFormsList() {
    this.spinner.show();
    this.service.getPublishedListOfForms().subscribe(data => {
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