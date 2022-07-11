import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FormbuilderService } from '../shared/formbuilder.service';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { AddFormComponent } from './add-form/add-form.component';
import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { UserService } from '../shared/user.service';
import { HierarchyManagementService } from '../hierarchy-management.service';
import { TreediagramService } from '../treediagram.service';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
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

  constructor(public treeService: TreediagramService, public dialog: MatDialog, private route: Router, private service: FormbuilderService, private spinner: NgxSpinnerService, private userService: UserService) { }

  public formData: any = [{ "formID": 0, "formName": "" }];

  public formList: any = [];

  userDetail: any;

  data: any = [];

  userLocation:any;
  userLocationLevel:any;
  PeriodStatus:any;

  ngOnInit(): void {
    this.spinner.show();
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetail = res;
        this.refreshFormsList();
        this.refreshLocationList();
      },
      err => {
        console.log(err);
        this.refreshFormsList();
      }
    );
  }

  addForm(dataItem:any) {
    console.log(dataItem)
    if(dataItem.captureID==0){
      this.spinner.show();
      let formCaptureData = {
        formCaptureID: 0,
        formName: '',
        formID: 6,
        step: "string",
        sentBy: this.userDetail.formData.userID,
        dateSent: "string",
        timeSent: "string",
        displayableOne: "",
        displayableTwo: "",
        geography: dataItem.nodeID,
        stage: "string",
        formTemplateName: "string"
      }
      this.service.addCapturedForms(formCaptureData).subscribe(res => {
        let myObj = {
          formID: 6,
          formName: JSON.parse(res).formName,
          formCaptureID: JSON.parse(res).formCaptureID,
          state: 'add',
          roleID:dataItem.roleID,
          view:'readwrite'
        };
        this.spinner.hide();
        // this.showNotification('top', 'center', 'Form created successfully', '', 'success');
        localStorage.setItem('formCaptureDetails', JSON.stringify(myObj));
        localStorage.setItem('tabIndex', '0');
        const dialogRef = this.dialog.open(AddFormComponent, {
          width: '85%',
          height: '85%',
          disableClose: true
        });
        this.formData.formName = "";
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          this.refreshLocationList();
        });
      });
    }
    else{
      let formCaptureObj = {
        formID: 6,
        formName: 'ProvincialIndicators',
        formCaptureID: dataItem.captureID,
        state: 'edit',
        roleID:dataItem.roleID,
        view:'readwrite'
      };
      localStorage.setItem('formCaptureDetails', JSON.stringify(formCaptureObj));
      localStorage.setItem('tabIndex', '0');
      const dialogRef = this.dialog.open(AddFormComponent, {
        width: '85%',
        height: '85%',
        disableClose: true
      });
      dialogRef.afterClosed().subscribe(result => {
        this.refreshFormsList();
        this.formList.filterPredicate = function (data, filter: string): boolean {
          return data.formName.toLowerCase().includes(filter);
        };
      });
    }
  }

  refreshFormsList() {
    this.spinner.show();
    this.service.getPublishedListOfForms().subscribe(data => {
      let allPublishedForms = data;
      //this.formList = data;
      let formsLinkedToUser = [];
      let userRoleID = this.userDetail.formData.role;
      allPublishedForms.forEach(form => {
        this.userService.getFormsRole(userRoleID).subscribe(formRole => {
          formRole.forEach(role => {
            if (role.id === form.formID && role.capture == true) {
              formsLinkedToUser.push(form);
            }
          });
        });
      });
      this.formList = formsLinkedToUser;
      this.spinner.hide();
    });
  }

  refreshLocationList() {
      this.service.GetUserLocationHierachy(this.userDetail.formData.userID).subscribe(location => {
        this.spinner.show();
        this.userLocation=location;
        this.service.getFormCaptureCountPerLocation(location,this.userDetail.formData.role).subscribe(result => {
          this.data =  result;
          this.userLocationLevel=this.data[0].levelID;
          this.PeriodStatus=this.data[0].periodStatus;
          this.spinner.hide();
        });
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