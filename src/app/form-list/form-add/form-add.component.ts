import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormbuilderService } from 'src/app/shared/formbuilder.service';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { merge } from 'jquery';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { UserService } from 'src/app/shared/user.service';
declare var $: any;

@Component({
  selector: 'app-form-add',
  templateUrl: './form-add.component.html',
  styleUrls: ['./form-add.component.css']
})
export class FormAddComponent implements OnInit {

  submitted = false;
  formAdd: any;
  formcategories: any = [];
  formlist: any[];

  constructor(
    public dialogRef: MatDialogRef<FormAddComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private service: FormbuilderService, public formBuilder: FormBuilder, private spinner: NgxSpinnerService,private userService: UserService) {
    this.formAdd = data[0];
    this.formlist = data[1];
  }

  formID: number = 0;
  formTypeID: string = "";
  formCategoryID: string = "";
  formName: string = "";
  formDescription: string = "";
  dateCreated: string = "";
  createdByUserID: string = "";
  isLocked: string = "";
  lockedByUserID: string = "";
  isDeleted: string = "";
  dateLocked: string = "";
  dateLastModified: string = "";
  lastModifiedByUserID: string = "";
  userDetail: any;
  DateArchived: string = "";
  ArchivedByUserID: string = "";

  ngOnInit(): void {
    this.formID = this.formAdd.formID;
    this.formTypeID = this.formAdd.formTypeID;
    this.formCategoryID = this.formAdd.formCategoryID;
    this.formName = this.formAdd.formName;
    this.formDescription = this.formAdd.formDescription;
    this.dateCreated = this.formAdd.dateCreated;
    this.createdByUserID = this.formAdd.createdByUserID;
    this.isLocked = this.formAdd.isLocked;
    this.lockedByUserID = this.formAdd.lockedByUserID;
    this.isDeleted = this.formAdd.isDeleted;
    this.dateLocked = this.formAdd.dateLocked;
    this.dateLastModified = this.formAdd.dateLastModified;
    this.lastModifiedByUserID = this.formAdd.lastModifiedByUserID;
    this.DateArchived=this.formAdd.DateArchived;
    this.ArchivedByUserID=this.formAdd.ArchivedByUserID;
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetail = res;
        this.getformCategories();
      },
      err => {
        console.log(err);
        this.getformCategories();
      },
    );
  }

  // group = new FormGroup({
  //   select: new FormControl(null, Validators.required)
  // });

  addForm() {
    if (this.formAdd.displayName != "" && this.formAdd.formCategoryID !== 0) {
      if (this.checkForDuplicate(this.formAdd.displayName)) {
        this.showNotification('top', 'center', 'This form name already exists, please enter a unique name!', '', 'danger');
      }
      else {
        //adding form
        this.submitted = true;
        var val = {
          "formID": 0,
          "formTypeID": 2,
          "formCategoryID": this.formAdd.formCategoryID,
          "formName": this.formAdd.displayName.replace(/[^a-zA-Z0-9]/g, ''),
          "displayName": this.formAdd.displayName,
          "formDescription": this.formAdd.formDescription,
          "dateCreated": "2021-11-30T11:28:23.351Z",
          "createdByUserID": this.userDetail.formData.userID,
          "isLocked": false,
          "lockedByUserID": 0,
          "isDeleted": false,
          "dateLocked": "2021-11-30T11:28:23.351Z",
          "dateLastModified": "2021-11-30T11:28:23.351Z",
          "lastModifiedByUserID": 0
        };
        this.spinner.show();
        this.service.addDynamicForm(val).subscribe(res => {
          this.dialogRef.close();
          let pageVal = {
            pageGUID: "",
            name: "Page 1",
            isActive: true,
            formID: JSON.parse(JSON.stringify(res)).formID
          }
          let pageField = [{
            "fieldID": 0,
            "fieldTypeID": 25,
            "pageGUID": "pageGUID",
            "fieldName": "ua_PageTitle",
            "questionName": "Page Title",
            "isDisplayable": false,
            "toolTip": "",
            "parentFieldName": "",
            "childFieldName": "",
            "listValue": "",
            "calculation": "",
            "groupGUID": "string",
            "isLocked": false,
            "lockedByUserID": 0,
            "meetAllCustomValidationConditions": true,
            "dateCreated": "2021-12-01T12:32:22.006Z",
            "createdByUserID": 0,
            "dateLastModified": "2021-12-01T12:32:22.006Z",
            "lastModifiedByUserID": 0,
            "isActive": true,
            "dataExportName": "string",
            "xmlElementName": "string",
            "hasPhoto": false,
            "hasAttachment": false,
            "hasComment": false,
            "fieldType": {
              "fieldTypeID": 25,
              "displayName": "Page Title",
              "description": "menu_book",
              "value": "PageTitle"
            },
            "formPage": {
              "pageGUID": "string",
              "name": "string",
              "formID": 0,
              "isActive": true
            },
            "group": {
              "groupGUID": "string",
              "name": "string",
              "isRequired": true,
              "pageGUID": "",
              "parentGroupID": 0,
              "type": "",
              "dataTableGroup": "string"
            },
            "fieldCustomValidations": [
              {
                "fieldCustomValidationID": 0,
                "displayText": "",
                "condition": "",
                "value": "",
                "errorMessage": ""
              }
            ],
            "fieldStyles": [
              {
                "fieldStyleID": 0,
                "width": 760,
                "height": 70,
                "cssClass": GlobalConstants.pageTitleStyle
              }
            ],
            "fieldValidations": [
              {
                "fieldValidationID": 0,
                "dataLength": 0,
                "isEditable": true,
                "isRequired": false,
                "isHidden": false,
              }
            ],
            "isPublished":-1
          }]
          this.service.addFormPage(pageVal).subscribe(result => {
            this.service.addFieldPerPage(pageField, JSON.parse(JSON.stringify(res)).formID, JSON.parse(JSON.stringify(result)).pageGUID).subscribe(val => {
              this.spinner.hide();
              this.showNotification('top', 'center', 'Form Design Added Successfully!', '', 'success');
            });
          })
        });

        this.formAdd.formID = 0;
        this.formAdd.formTypeI = 0;
        this.formAdd.formCategoryID = 0;
        this.formAdd.formName = "";
        this.formAdd.displayName = "";
        this.formAdd.formDescription = "";
        this.formAdd.dateCreated = "";
        this.formAdd.createdByUserID = 0;
        this.formAdd.isLocked = "";
        this.formAdd.lockedByUserID = 0;
        this.formAdd.isDeleted = "";
        this.formAdd.dateLocked = "";
        this.formAdd.dateLastModified = "";
        this.formAdd.lastModifiedByUserID = 0;
      }
    }
    else {
      this.showNotification('top', 'center', 'Please fill in name and select a category field!', '', 'danger');
    }
  }

  updateForm() {
    if (this.formAdd.displayName != "" && this.formAdd.formCategoryID !== 0) {
      if (this.checkForDuplicate(this.formAdd.displayName)) {
        this.showNotification('top', 'center', 'This form name already exists, please enter a unique name!', '', 'danger');
      }
      else {
      //updating form
      this.submitted = true;
      // stop here if form is invalid
      var val = {
        formID: this.formAdd.formID,
        formTypeID: this.formAdd.formTypeID,
        formCategoryID: this.formAdd.formCategoryID,
        formName: this.formAdd.displayName.replace(/[^a-zA-Z0-9]/g, ''),
        displayName: this.formAdd.displayName,
        formDescription: this.formAdd.formDescription,
        dateCreated: this.formAdd.dateCreated,
        createdByUserID: this.formAdd.createdByUserID,
        isLocked: this.formAdd.isLocked,
        lockedByUserID: this.formAdd.lockedByUserID,
        isDeleted: this.formAdd.isDeleted,
        dateLocked: this.formAdd.dateLocked,
        dateLastModified: this.formAdd.dateLastModified,
        lastModifiedByUserID: this.userDetail.formData.userID
      };
      this.spinner.show();
      this.service.updateDynamicFormDetails(this.formAdd.formID, val).subscribe(res => {
        this.dialogRef.close();
        this.spinner.hide();
        this.showNotification('top', 'center', 'Form Design Updated Successfully!', '', 'success');
      });
    }
    }
    else {
      this.showNotification('top', 'center', 'Please add a form name and select a category field!', '', 'danger');
    }
  }

  getformCategories() {
    this.spinner.show();
    this.service.getformCategoryList().subscribe(data => {
      this.formcategories = data;
      this.spinner.hide();
    });
  }

  checkForDuplicate(name: any): boolean {
    let count=0;
    this.formlist.forEach(element => {
      if (element.formName === name.replace(/[^a-zA-Z0-9]/g, '')) {
        count++;
      }
    });
    return (count>=1?true:false);
  }

  closePopup() {
    this.dialogRef.close();
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


