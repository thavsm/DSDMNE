import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem } from '@angular/cdk/drag-drop';
import { FormbuilderService } from '../shared/formbuilder.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { merge } from 'jquery';
import { FormPreviewComponent } from '../form-preview/form-preview.component';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { GlobalConstants } from '../shared/global-constants';
import { FormControl } from '@angular/forms';
declare var $: any;

@Component({
    selector: 'app-form-designer',
    templateUrl: './form-designer.component.html',
    styleUrls: ['./form-designer.component.css']
})

export class FormDesignerComponent implements OnInit {
    embeddedformSelected:any;
    // EmbeddedForm: boolean;
    // EmbeddedFormId:any; 
    data:any;
    formAdd:any;
    userDetail:any;
    userData:any;
    formcategories: any = [];
    formdescription: any = [];
    LocationType:any;
    ProvinceID:any;
    LocationID: any;
    //EmbeddedForm:boolean = true;
    
    constructor(public dialog: MatDialog, private route: Router, private service: FormbuilderService, private spinner: NgxSpinnerService, private userService: UserService) {
        this.formData = JSON.parse(localStorage.getItem('formDesignInfo') || '{}');
        this.checkStatus();
    }

    ngOnInit(): void {
        this.checkStatus();
        // this.getformDescription();
        this.spinner.show();
        this.refreshPageList();
        this.types = this.fieldTypes;
        console.log("types: "+this.types);
        this.spinner.hide();
        if (this.formData.isLocked === true) {
            this.userService.setMenuShow(false);
        }

          this.userService.getUserProfile().subscribe(
            res => {
              this.userDetail = res;
              this.userData = res['formData']
              this.LocationType = this.userData['locationType'];
              this.ProvinceID = this.userData['provinceID'];
              this.LocationID = this.userData['location'];
          console.log("locationtYPE: "+this.LocationType);
          console.log("ProvinceID: "+this.ProvinceID);
          console.log("LocationID: "+this.LocationID);
              this.getformDescription();
              //this.refreshFormsList();
            },
            err => {
              console.log(err);
             this.getformDescription();
            },
          
          ); 

          
    /*      if(this.formData.embeddedForm == '1' )
          {
            this.EmbeddedForm = true
          }
          else{
            this.EmbeddedForm = false;
          } */
    }
  
    dateFormats: any = [
        {
            "value": "Date DD",
            "displayName": "DD-MM-YYYY"
        },
        {
            "value": "Date MM",
            "displayName": "DD-MM-YY"
        },
        {
            "value": "Date YY",
            "displayName": "YY-MM-DD"
        },
        {
            "value": "Date YYYY",
            "displayName": "YYYY-MM-DD"
        }
    ]

    timeFormats: any = [
        {
            "value": "HH:MM",
            "displayName": "24 HR Time"
        },
        {
            "value": "hh:mm",
            "displayName": "12 HR Time"
        }
    ]

    field: Array<any> = null;

    types: any[];

    sectionList: any = [];

    groupSectionList: any[];

    fieldList: any[] = [];
  

 
    fieldTypes = [
        {
            "fieldID": 0,
            "fieldTypeID": 22,
            "pageGUID": "pageGUID",
            "fieldName": "",
            "questionName": "",
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
            "dataExportName": "",
            "xmlElementName": "",
            "hasPhoto": false,
            "hasAttachment": false,
            "hasComment": false,
            "isPublished": -1,
            "fieldType": {
                "fieldTypeID": 22,
                "displayName": "Alpha Numeric",
                "description": "rtt",
                "value": "Alphanumeric"
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
                    "height": 24,
                    "cssClass": "linear-gradient(147deg, #f9fcff 0%, #dee4ea 74%)"
                }
            ],
            "fieldValidations": [
                {
                    "fieldValidationID": 0,
                    "dataLength": 50,
                    "isEditable": true,
                    "isRequired": false,
                    "isHidden": false,
                    "EmbeddedForm": "0",
                    "EmbeddedFormId": 0
                }
            ]
        },
        {
            "fieldID": 0,
            "fieldTypeID": 15,
            "pageGUID": "pageGUID",
            "fieldName": "",
            "questionName": "",
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
            "dataExportName": "",
            "xmlElementName": "",
            "hasPhoto": false,
            "hasAttachment": false,
            "hasComment": false,
            "isPublished": -1,
            "fieldType": {
                "fieldTypeID": 15,
                "displayName": "Calculated Value",
                "description": "calculate",
                "value": "calculation"
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
                "pageGUID": "string",
                "parentGroupID": 0,
                "type": "string",
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
                    "height": 24,
                    "cssClass": "linear-gradient(147deg, #f9fcff 0%, #dee4ea 74%)"
                }
            ],
            "fieldValidations": [
                {
                    "fieldValidationID": 0,
                    "dataLength": 50,
                    "isEditable": true,
                    "isRequired": false,
                    "isHidden": false,
                    "EmbeddedForm": "0",
                    "EmbeddedFormId": 0
                }
            ]
        },
        {
            "fieldID": 0,
            "fieldTypeID": 14,
            "pageGUID": "pageGUID",
            "fieldName": "",
            "questionName": "",
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
            "dataExportName": "",
            "xmlElementName": "",
            "hasPhoto": false,
            "hasAttachment": false,
            "hasComment": false,
            "isPublished": -1,
            "fieldType": {
                "fieldTypeID": 14,
                "displayName": "Checkbox",
                "description": "check_box",
                "value": "checkbox"
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
                "pageGUID": "string",
                "parentGroupID": 0,
                "type": "string",
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
                    "height": 24,
                    "cssClass": "linear-gradient(147deg, #f9fcff 0%, #dee4ea 74%)"
                }
            ],
            "fieldValidations": [
                {
                    "fieldValidationID": 0,
                    "dataLength": 50,
                    "isEditable": true,
                    "isRequired": false,
                    "isHidden": false,
                    "EmbeddedForm": "0",
                    "EmbeddedFormId": 0
                }
            ]
        },
        {
            "fieldID": 0,
            "fieldTypeID": 13,
            "pageGUID": "pageGUID",
            "fieldName": "",
            "questionName": "",
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
            "dataExportName": "",
            "xmlElementName": "",
            "hasPhoto": false,
            "hasAttachment": false,
            "hasComment": false,
            "isPublished": -1,
            "fieldType": {
                "fieldTypeID": 13,
                "displayName": "Date",
                "description": "date_range",
                "value": "date"
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
                "pageGUID": "string",
                "parentGroupID": 0,
                "type": "string",
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
                    "height": 24,
                    "cssClass": "linear-gradient(147deg, #f9fcff 0%, #dee4ea 74%)"
                }
            ],
            "fieldValidations": [
                {
                    "fieldValidationID": 0,
                    "dataLength": 50,
                    "isEditable": true,
                    "isRequired": false,
                    "isHidden": false,
                    "EmbeddedForm": "0",
                    "EmbeddedFormId": 0
                }
            ]
        },
        {
            "fieldID": 0,
            "fieldTypeID": 29,
            "pageGUID": "pageGUID",
            "fieldName": "",
            "questionName": "",
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
            "dataExportName": "",
            "xmlElementName": "",
            "hasPhoto": false,
            "hasAttachment": false,
            "hasComment": false,
            "isPublished": -1,
            
            "fieldType": {
                "fieldTypeID": 29,
                "displayName": "Decimal",
                "description": "fiber_manual_record",
                "value": "decimal"
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
                    "height": 24,
                    "cssClass": "linear-gradient(147deg, #f9fcff 0%, #dee4ea 74%)"
                }
            ],
            "fieldValidations": [
                {
                    "fieldValidationID": 0,
                    "dataLength": 50,
                    "isEditable": true,
                    "isRequired": false,
                    "isHidden": false,
                    "EmbeddedForm": "0",
                    "EmbeddedFormId": 0
                }
            ]
        },
        {
            "fieldID": 0,
            "fieldTypeID": 30,
            "pageGUID": "pageGUID",
            "fieldName": "",
            "questionName": "",
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
            "dataExportName": "",
            "xmlElementName": "",
            "hasPhoto": false,
            "hasAttachment": false,
            "hasComment": false,
            "isPublished": -1,
            "fieldType": {
                "fieldTypeID": 30,
                "displayName": "Drawing Area",
                "description": "brush",
                "value": "imagearea"
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
                    "height": 24,
                    "cssClass": "linear-gradient(147deg, #f9fcff 0%, #dee4ea 74%)"
                }
            ],
            "fieldValidations": [
                {
                    "fieldValidationID": 0,
                    "dataLength": 50,
                    "isEditable": true,
                    "isRequired": false,
                    "isHidden": false,
                    "EmbeddedForm": "0",
                    "EmbeddedFormId": 0
                }
            ]
        },
        {
            "fieldID": 0,
            "fieldTypeID": 24,
            "pageGUID": "pageGUID",
            "fieldName": "",
            "questionName": "",
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
            "dataExportName": "",
            "xmlElementName": "",
            "hasPhoto": false,
            "hasAttachment": false,
            "hasComment": false,
            "isPublished": -1,
            "fieldType": {
                "fieldTypeID": 24,
                "displayName": "Email Address",
                "description": "alternate_email",
                "value": "EmailAddress"
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
                    "height": 24,
                    "cssClass": "linear-gradient(147deg, #f9fcff 0%, #dee4ea 74%)"
                }
            ],
            "fieldValidations": [
                {
                    "fieldValidationID": 0,
                    "dataLength": 50,
                    "isEditable": true,
                    "isRequired": false,
                    "isHidden": false,
                    "EmbeddedForm": "0",
                    "EmbeddedFormId": 0
                }
            ]
        },
        {
            "fieldID": 0,
            "fieldTypeID": 31,
            "pageGUID": "pageGUID",
            "fieldName": "",
            "questionName": "",
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
            "dataExportName": "",
            "xmlElementName": "",
            "hasPhoto": false,
            "hasAttachment": false,
            "hasComment": false,
            "isPublished": -1,
            "fieldType": {
                "fieldTypeID": 31,
                "displayName": "Information",
                "description": "info",
                "value": "information"
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
                "pageGUID": "string",
                "parentGroupID": 0,
                "type": "string",
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
                    "height": 24,
                    "cssClass": "linear-gradient(147deg, #f9fcff 0%, #dee4ea 74%)"
                }
            ],
            "fieldValidations": [
                {
                    "fieldValidationID": 0,
                    "dataLength": 50,
                    "isEditable": true,
                    "isRequired": false,
                    "isHidden": false,
                    "EmbeddedForm": "0",
                    "EmbeddedFormId": 0
                }
            ]
        },
        {
            "fieldID": 0,
            "fieldTypeID": 9,
            "pageGUID": "pageGUID",
            "fieldName": "",
            "questionName": "",
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
            "dataExportName": "",
            "xmlElementName": "",
            "hasPhoto": false,
            "hasAttachment": false,
            "hasComment": false,
            "isPublished": -1,
            "fieldType": {
                "fieldTypeID": 9,
                "displayName": "Number",
                "description": "numbers",
                "value": "number"
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
                "pageGUID": "string",
                "parentGroupID": 0,
                "type": "string",
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
                    "height": 24,
                    "cssClass": "linear-gradient(147deg, #f9fcff 0%, #dee4ea 74%)"
                }
            ],
            "fieldValidations": [
                {
                    "fieldValidationID": 0,
                    "dataLength": 50,
                    "isEditable": true,
                    "isRequired": false,
                    "isHidden": false,
                    "EmbeddedForm": "0",
                    "EmbeddedFormId": 0
                }
            ]
        },
        {
            "fieldID": 0,
            "fieldTypeID": 27,
            "pageGUID": "pageGUID",
            "fieldName": "",
            "questionName": "",
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
            "dataExportName": "",
            "xmlElementName": "",
            "hasPhoto": false,
            "hasAttachment": false,
            "hasComment": false,
            "isPublished": -1,
            "fieldType": {
                "fieldTypeID": 27,
                "displayName": "Plain Alpha",
                "description": "title",
                "value": "plainalpha"
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
                "pageGUID": "string",
                "parentGroupID": 0,
                "type": "string",
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
                    "height": 24,
                    "cssClass": "linear-gradient(147deg, #f9fcff 0%, #dee4ea 74%)"
                }
            ],
            "fieldValidations": [
                {
                    "fieldValidationID": 0,
                    "dataLength": 50,
                    "isEditable": true,
                    "isRequired": false,
                    "isHidden": false,
                    "EmbeddedForm": "0",
                    "EmbeddedFormId": 0
                }
            ]
        },
        {
            "fieldID": 0,
            "fieldTypeID": 4,
            "pageGUID": "pageGUID",
            "fieldName": "",
            "questionName": "",
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
            "dataExportName": "",
            "xmlElementName": "",
            "hasPhoto": false,
            "hasAttachment": false,
            "hasComment": false,
            "isPublished": -1,
            "fieldType": {
                "fieldTypeID": 4,
                "displayName": "Plain Text",
                "description": "text_fields",
                "value": "plaintext"
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
                "pageGUID": "string",
                "parentGroupID": 0,
                "type": "string",
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
                    "height": 24,
                    "cssClass": "linear-gradient(147deg, #f9fcff 0%, #dee4ea 74%)"
                }
            ],
            "fieldValidations": [
                {
                    "fieldValidationID": 0,
                    "dataLength": 50,
                    "isEditable": true,
                    "isRequired": false,
                    "isHidden": false,
                    "EmbeddedForm": "0",
                    "EmbeddedFormId": 0
                }
            ]
        },
        {
            "fieldID": 0,
            "fieldTypeID": 32,
            "pageGUID": "pageGUID",
            "fieldName": "group",
            "questionName": "group",
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
            "dataExportName": "",
            "xmlElementName": "",
            "hasPhoto": false,
            "hasAttachment": false,
            "hasComment": false,
            "isPublished": -1,
            "fieldType": {
                "fieldTypeID": 32,
                "displayName": "Question Group",
                "description": "view_stream",
                "value": "group"
            },
            "formPage": {
                "pageGUID": "string",
                "name": "string",
                "formID": 0,
                "isActive": true
            },
            "group": {
                "groupGUID": "string",
                "name": "",
                "isRequired": true,
                "pageGUID": "",
                "parentGroupID": 0,
                "type": ""
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
                    "height": 24,
                    "cssClass": GlobalConstants.groupStyle
                }
            ],
            "fieldValidations": [
                {
                    "fieldValidationID": 0,
                    "dataLength": 50,
                    "isEditable": true,
                    "isRequired": false,
                    "isHidden": false,
                    "EmbeddedForm": "0",
                    "EmbeddedFormId": 0
                }
            ]
        },
        {
            "fieldID": 0,
            "fieldTypeID": 8,
            "pageGUID": "pageGUID",
            "fieldName": "",
            "questionName": "",
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
            "dataExportName": "",
            "xmlElementName": "",
            "hasPhoto": false,
            "hasAttachment": false,
            "hasComment": false,
            "isPublished": -1,
            "fieldType": {
                "fieldTypeID": 8,
                "displayName": "Radio Button",
                "description": "radio_button_checked",
                "value": "field or"
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
                "pageGUID": "string",
                "parentGroupID": 0,
                "type": "string",
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
                    "height": 24,
                    "cssClass": "linear-gradient(147deg, #f9fcff 0%, #dee4ea 74%)"
                }
            ],
            "fieldValidations": [
                {
                    "fieldValidationID": 0,
                    "dataLength": 50,
                    "isEditable": true,
                    "isRequired": false,
                    "isHidden": false,
                    "EmbeddedForm": "0",
                    "EmbeddedFormId": 0
                }
            ]
        },
        {
            "fieldID": 0,
            "fieldTypeID": 7,
            "pageGUID": "pageGUID",
            "fieldName": "repeatgroup",
            "questionName": "repeatgroup",
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
            "dataExportName": "",
            "xmlElementName": "",
            "hasPhoto": false,
            "hasAttachment": false,
            "hasComment": false,
            "isPublished": -1,
            "fieldType": {
                "fieldTypeID": 7,
                "displayName": "Repeat Group",
                "description": "repeat_on",
                "value": "repeatgroup"
            },

            "formPage": {
                "pageGUID": "string",
                "name": "string",
                "formID": 0,
                "isActive": true
            },
            "group": {
                "groupGUID": "string",
                "name": "",
                "isRequired": true,
                "pageGUID": "",
                "parentGroupID": 0,
                "type": ""
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
                    "height": 24,
                    "cssClass": GlobalConstants.groupStyle
                }
            ],
            "fieldValidations": [
                {
                    "fieldValidationID": 0,
                    "dataLength": 50,
                    "isEditable": true,
                    "isRequired": false,
                    "isHidden": false,
                    "EmbeddedForm": "0",
                    "EmbeddedFormId": 0
                }
            ]
        },
        {
            "fieldID": 0,
            "fieldTypeID": 6,
            "pageGUID": "pageGUID",
            "fieldName": "section",
            "questionName": "section",
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
            "dataExportName": "",
            "xmlElementName": "",
            "hasPhoto": false,
            "hasAttachment": false,
            "hasComment": false,
            "isPublished": -1,
            "fieldType": {
                "fieldTypeID": 7,
                "displayName": "Section",
                "description": "article",
                "value": "section"
            },

            "formPage": {
                "pageGUID": "string",
                "name": "string",
                "formID": 0,
                "isActive": true
            },
            "group": {
                "groupGUID": "string",
                "name": "",
                "isRequired": true,
                "pageGUID": "",
                "parentGroupID": 0,
                "type": ""
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
                    "height": 24,
                    "cssClass": GlobalConstants.SectionStyle
                }
            ],
            "fieldValidations": [
                {
                    "fieldValidationID": 0,
                    "dataLength": 50,
                    "isEditable": true,
                    "isRequired": false,
                    "isHidden": false,
                    "EmbeddedForm": "0",
                    "EmbeddedFormId": 0
                }
            ]
        },
        {
            "fieldID": 0,
            "fieldTypeID": 5,
            "pageGUID": "pageGUID",
            "fieldName": "",
            "questionName": "",
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
            "dataExportName": "",
            "xmlElementName": "",
            "hasPhoto": false,
            "hasAttachment": false,
            "hasComment": false,
            "isPublished": -1,
            "fieldType": {
                "fieldTypeID": 5,
                "displayName": "Select - Single",
                "description": "arrow_drop_down",
                "value": "lexicon list"
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
                "pageGUID": "string",
                "parentGroupID": 0,
                "type": "string",
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
                    "height": 24,
                    "cssClass": "linear-gradient(147deg, #f9fcff 0%, #dee4ea 74%)"
                }
            ],
            "fieldValidations": [
                {
                    "fieldValidationID": 0,
                    "dataLength": 50,
                    "isEditable": true,
                    "isRequired": false,
                    "isHidden": false,
                    "EmbeddedForm": "0",
                    "EmbeddedFormId": 0
                }
            ]
        },
        {
            "fieldID": 0,
            "fieldTypeID": 33,
            "pageGUID": "pageGUID",
            "fieldName": "",
            "questionName": "",
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
            "dataExportName": "",
            "xmlElementName": "",
            "hasPhoto": false,
            "hasAttachment": false,
            "hasComment": false,
            "isPublished": -1,
            "fieldType": {
                "fieldTypeID": 5,
                "displayName": "Select - Multiple",
                "description": "unfold_more",
                "value": "link multi select"
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
                "pageGUID": "string",
                "parentGroupID": 0,
                "type": "string",
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
                    "height": 24,
                    "cssClass": "linear-gradient(147deg, #f9fcff 0%, #dee4ea 74%)"
                }
            ],
            "fieldValidations": [
                {
                    "fieldValidationID": 0,
                    "dataLength": 50,
                    "isEditable": true,
                    "isRequired": false,
                    "isHidden": false,
                    "EmbeddedForm": "0",
                    "EmbeddedFormId": 0
                }
            ]
        },
        {
            "fieldID": 0,
            "fieldTypeID": 28,
            "pageGUID": "pageGUID",
            "fieldName": "",
            "questionName": "",
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
            "dataExportName": "",
            "xmlElementName": "",
            "hasPhoto": false,
            "hasAttachment": false,
            "hasComment": false,
            "isPublished": -1,
            "fieldType": {
                "fieldTypeID": 28,
                "displayName": "Signature",
                "description": "border_color",
                "value": "signature"
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
                    "height": 24,
                    "cssClass": "linear-gradient(147deg, #f9fcff 0%, #dee4ea 74%)"
                }
            ],
            "fieldValidations": [
                {
                    "fieldValidationID": 0,
                    "dataLength": 50,
                    "isEditable": true,
                    "isRequired": false,
                    "isHidden": false,
                    "EmbeddedForm": "0",
                    "EmbeddedFormId": 0
                }
            ]
        },
        {
            "fieldID": 0,
            "fieldTypeID": 26,
            "pageGUID": "pageGUID",
            "fieldName": "",
            "questionName": "",
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
            "dataExportName": "",
            "xmlElementName": "",
            "hasPhoto": false,
            "hasAttachment": false,
            "hasComment": false,
            "isPublished": -1,
            "fieldType": {
                "fieldTypeID": 7,
                "displayName": "Sub Section",
                "description": "calendar_view_day",
                "value": "subSection"
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
                "pageGUID": "string",
                "parentGroupID": 0,
                "type": "string",
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
                    "height": 24,
                    "cssClass": GlobalConstants.SubsectionStyle
                }
            ],
            "fieldValidations": [
                {
                    "fieldValidationID": 0,
                    "dataLength": 50,
                    "isEditable": true,
                    "isRequired": false,
                    "isHidden": false,
                    "EmbeddedForm": "0",
                    "EmbeddedFormId": 0
                }
            ]
        },
        {
            "fieldID": 0,
            "fieldTypeID": 23,
            "pageGUID": "pageGUID",
            "fieldName": "",
            "questionName": "",
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
            "dataExportName": "",
            "xmlElementName": "",
            "hasPhoto": false,
            "hasAttachment": false,
            "hasComment": false,
            "isPublished": -1,
            "fieldType": {
                "fieldTypeID": 23,
                "displayName": "Time",
                "description": "timer",
                "value": "Time"
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
                    "height": 24,
                    "cssClass": "linear-gradient(147deg, #f9fcff 0%, #dee4ea 74%)"
                }
            ],
            "fieldValidations": [
                {
                    "fieldValidationID": 0,
                    "dataLength": 50,
                    "isEditable": true,
                    "isRequired": false,
                    "isHidden": false,
                    "EmbeddedForm": "0",
                    "EmbeddedFormId": 0
                }
            ]
        }
    ];

    publishStatus: number = -1;

    pages: any = [];

    formData: any = [];

    currentPage: any = [];

    formDesign: any = [];

    groups: any = [];

    operationField: string = "Select a Field";

    fields: any = [];

    operators: any[] = [
        {
            value: "add",
            viewValue: "+"
        }
        ,
        {
            value: "subtract",
            viewValue: "-"
        },
        {
            value: "multiply",
            viewValue: "*"
        },
        {
            value: "divide",
            viewValue: "/"
        }
    ];

    value: any = [{ data: "" }];

    groupvalue: any = [{ data: "" }];

    fieldOperatorList: any[];

    greyedOut: boolean = true;

    disableGroupAdd: boolean = false;

    formStatus: string = "background-color: #eee;";

   

    checkStatus() {
        if (this.formData.publishStatus === -1) {
            this.formStatus = "background-color: #eee;";
        }

        if (this.formData.publishStatus === 0) {
            this.formStatus = "background-color: #FFDB58;";
        }

        if (this.formData.publishStatus === 1) {
            this.formStatus = "background-color: #b1f6b1;";
        }
    }

   

    toggleValue(item: any) {
        this.refreshGroupSectionList();
        if (item.fieldType.value === "calculation") {
            if (item.calculation !== undefined && item.calculation !== "" && item.calculation !== "undefined") {
                var lastChar = (item.calculation).charAt((item.calculation).length - 1);
                if (lastChar !== '+' || lastChar !== '-' || lastChar !== '/' || lastChar !== '*') {
                    this.fieldOperatorList = this.operators;
                    this.operationField = "Select an operator";
                }
                else {
                    this.fieldOperatorList = this.updateCalculationFieldList();
                    this.operationField = "Select a field";
                }
            }
            if (this.fieldOperatorList.length == 0) {
                this.greyedOut = true;
            }
            else {
                this.greyedOut = false;
            }
        }
        if (item.groupGUID !== "" || item.groupGUID == "string") {
            this.disableGroupAdd = false;
        }
        else {
            this.disableGroupAdd = true;
        }
        item.toggle = true;
    }

    removeField(i: any) {
        Swal.fire({
            title: "<h5 style='color:white;font-weight:400'> Are you sure you want to remove this field? </h5>",
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            toast: true,
            position: 'top',
            allowOutsideClick: false,
            confirmButtonColor: '#000000',
            cancelButtonColor: '#000000',
            background: '#CA0B00'
        }).then((result) => {
            if (result.value) {
                if (i > -1) {
                    if (this.formDesign[i].pageGUID === "pageGUID") {
                        this.spinner.show();
                        this.formDesign.splice(i, 1);
                        this.fields = this.updateCalculationFieldList();
                        this.getDesignPerPage(this.currentPage.pageGUID);
                        this.refreshGroupSectionList();
                        this.spinner.hide();
                        this.showNotification('top', 'center', 'The field has been deleted successfully!', '', 'success');
                    }
                    else {
                        this.spinner.show();
                        this.formDesign[i].isActive = 'false';
                        this.refreshGroupSectionList();
                        this.spinner.hide();
                        this.showNotification('top', 'center', 'The field has been deleted successfully!', '', 'success');
                    }
                }
            }
        })
    }

    savePage() {
        
        this.saveDesignPerPage(this.currentPage.pageGUID);
        this.publishStatus = 0;
    }

    publishPage() {
        this.spinner.show();
        if (this.currentPage.name == "Page 1") {
            var count = 0;
        
            this.formDesign.forEach((element, index) => {
                console.log('CurrentPage:' +this.currentPage.name);
                console.log('isDisplayable:' +element.isDisplayable);
                if (element.isDisplayable !== false && this.currentPage.name == "Page 1") {
                    count++;
                }
            });
            this.spinner.show();
            if (count == 2) {
                var errorMessage = "Please ensure number ";
                var count2 = 0;
                var count1 = 0;
                let hasDuplicates: Boolean = false;
                this.formDesign.forEach((element, index) => {
                    element.isPublished = 1;
                    if (element.isDisplayable !== false && this.currentPage.name == "Page 1") {
                        count2++;
                    }

                    if (element.questionName === "" || element.fieldName === "" || element.questionName === (index + 1)) {
                        errorMessage = errorMessage + (index + 1) + ",";
                    }

                    hasDuplicates = this.checkForDuplicates(element.fieldName);
                    if (hasDuplicates == true) {
                        count1++
                    }
                    element.pageGUID = this.currentPage.pageGUID;
                    element.formPage.name = this.currentPage.name;
                });

                if (errorMessage === "Please ensure number ") {
                    if (count1 == 0) {
                        if (errorMessage === "Please ensure number ") {
                            this.spinner.show();
                            this.service.addFieldPerPage(this.formDesign, this.formData.formID, this.currentPage.pageGUID).subscribe(data => {
                                this.service.updateDynamicFormDetails(this.formData.formID, this.formData).subscribe(result => {
                                    this.service.PublishForm(this.formData.formID).subscribe(res => {
                                        this.formData.publishStatus = 1;
                                        this.service.updateDynamicFormDetails(this.formData.formID, this.formData).subscribe(result => {
                                            this.formData = result;
                                            this.checkStatus();
                                            if (res === "Form published Successfully!") {
                                                this.getDesignPerPage(this.currentPage.pageGUID);
                                                this.refreshGroupSectionList();
                                                this.showNotification('top', 'center', res, '', 'success');
                                                this.spinner.hide();
                                            }
                                            else {
                                                this.showNotification('top', 'center', res, '', 'danger');
                                                this.spinner.hide();
                                            }
                                        })
                                    });
                                });
                            }, error => {
                                this.showNotification('top', 'center', 'Error publishing form, please try again', '', 'danger');
                                this.spinner.hide();
                            });
                        }
                    }
                    else {
                        errorMessage = "Database name must be unique";
                        this.formDesign.forEach((element, index) => {
                            element.pageGUID = "pageGUID";
                        });
                        this.showNotification('top', 'center', errorMessage, '', 'danger');
                    }
                }
                else {
                    errorMessage = errorMessage + " form fields have question names, database names on the form before saving";
                    this.formDesign.forEach((element, index) => {
                        element.pageGUID = "pageGUID";
                    });
                    this.showNotification('top', 'center', errorMessage, '', 'danger');
                }
            }
            else {
                this.showNotification('top', 'center', 'Please set two displayables before publishing the form', '', 'danger');
                this.spinner.hide();
            }
        }
        else {
            this.showNotification('top', 'center', "The form can only be published from page 1", '', 'danger');
            this.spinner.hide();
        }
    }

    viewPage(i: any, page: any) {
        Swal.fire({
            title: 'Do you want save this page before going to ' + page.name + '?',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            toast: true,
            position: 'top',
            allowOutsideClick: false,
            confirmButtonColor: '#000000',
            cancelButtonColor: '#000000',
            background: '#FFD740'
        }).then((result) => {
            if (result.value) {
                var errorMessage = "Please ensure number ";
                var count = 0;
                var count1 = 0;
                let hasDuplicates: Boolean = false;
                this.formDesign.forEach((element, index) => {

                    if (element.isDisplayable !== false && this.currentPage.name == "Page 1") {
                        count++;
                    }

                    if (element.questionName === "" || element.fieldName === "" || element.questionName === (index + 1)) {
                        errorMessage = errorMessage + (index + 1) + ",";
                    }

                    hasDuplicates = this.checkForDuplicates(element.fieldName);

                    if (hasDuplicates) {
                        count1++;
                    }

                    element.pageGUID = this.currentPage.pageGUID;
                    element.formPage.name = this.currentPage.name;
                });
                if (errorMessage === "Please ensure number ") {
                    if (this.currentPage.name === "Page 1" && count == 2) {
                        if (count1 == 0) {
                            if (errorMessage === "Please ensure number ") {
                                this.spinner.show();
                                this.service.addFieldPerPage(this.formDesign, this.formData.formID, this.currentPage.pageGUID).subscribe(data => {
                                    this.formData.publishStatus = 0;
                                    this.service.updateDynamicFormDetails(this.formData.formID, this.formData).subscribe(result => {
                                        this.formData = result;
                                        //this.checkStatus();
                                        this.formDesign = [];
                                        this.getDesignPerPage(page.pageGUID);
                                        this.currentPage = page;
                                        this.refreshGroupSectionList();
                                        this.spinner.hide();
                                    });
                                },
                                    error => {
                                        this.showNotification('top', 'center', 'Error saving page fields, please try again', '', 'danger');
                                        this.spinner.hide();
                                    });
                            }
                        }
                        else {
                            errorMessage = "Database names must be unique";
                            this.showNotification('top', 'center', errorMessage, '', 'danger');
                            this.formDesign.forEach((element, index) => {
                                element.pageGUID = "pageGUID";
                            });
                        }
                    }
                    else if (this.currentPage.name !== "Page 1") {

                        if (count1 == 0) {
                            if (errorMessage === "Please ensure number ") {
                                this.spinner.show();
                                this.service.addFieldPerPage(this.formDesign, this.formData.formID, this.currentPage.pageGUID).subscribe(data => {
                                    this.formData.publishStatus = 0;
                                    this.service.updateDynamicFormDetails(this.formData.formID, this.formData).subscribe(result => {
                                        this.formData = result;
                                        this.checkStatus();
                                        this.formDesign = [];
                                        this.getDesignPerPage(page.pageGUID);
                                        this.currentPage = page;
                                        this.refreshGroupSectionList();
                                        this.spinner.hide();
                                    });
                                }, error => {
                                    this.showNotification('top', 'center', 'Error saving page fields, please try again', '', 'danger');
                                    this.spinner.hide();
                                });
                            }
                        }
                        else {
                            errorMessage = "Database name must be unique";
                            this.formDesign.forEach((element, index) => {
                                element.pageGUID = "pageGUID";
                            });
                            this.showNotification('top', 'center', errorMessage, '', 'danger');
                        }
                    }
                    else {
                        if (errorMessage === "Please ensure number ") {
                            errorMessage = "Two displayables must be set";
                            this.formDesign.forEach((element, index) => {
                                element.pageGUID = "pageGUID";
                            });
                            this.showNotification('top', 'center', errorMessage, '', 'danger');
                        }
                    }
                }
                else {
                    errorMessage = errorMessage + " form fields have question names, database names on the form before saving";
                    this.formDesign.forEach((element, index) => {
                        element.pageGUID = "pageGUID";
                    });
                    this.showNotification('top', 'center', errorMessage, '', 'danger');
                }
            }
            else {
                this.formDesign = [];
                this.getDesignPerPage(page.pageGUID);
                this.currentPage = page;
                this.refreshGroupSectionList();
            }
        })
    }

    addPage() {
        let val = {
            "pageGUID": "",
            "name": "Page " + (this.pages.length + 1),
            "formID": this.formData.formID,
            "isActive": true
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
            "dataExportName": "",
            "xmlElementName": "",
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
                    "height": 24,
                    "cssClass": GlobalConstants.pageTitleStyle
                }
            ],
            "fieldValidations": [
                {
                    "fieldValidationID": 0,
                    "dataLength": 50,
                    "isEditable": true,
                    "isRequired": false,
                    "isHidden": false,
                    "EmbeddedForm": this.formData.embeddedForm,
                    "EmbeddedFormId":this.formData.formTypeID
                }
            ]
        }]
        this.spinner.show();
        this.service.addFormPage(val).subscribe(data => {
            this.service.addFieldPerPage(pageField, this.formData.formID, JSON.parse(JSON.stringify(data)).pageGUID).subscribe(val => {
                this.refreshPageList();
                this.spinner.hide();
                this.showNotification('top', 'center', 'Page added successfully!', '', 'success');
            },
                error => {
                    this.showNotification('top', 'center', 'Error saving page, please try again', '', 'danger');
                    this.spinner.hide();
                });

        });
    }

    updateCalculationFieldList(): any[] {
        this.formDesign.forEach(element => {
            if (element.fieldType.value === "number" && element.isActive == true && element.fieldName !== "") {
                let x = {
                    value: element.fieldName,
                    viewValue: element.fieldName
                };
                this.fields.push(x);
            }
        });
        return this.fields;
    }

    removePage(i: any, page: any) {
        if (i + 1 !== 1) {
            Swal.fire({
                title: "<h5 style='color:white;font-weight:400'> Are you sure you want to delete " + page.name + " and its fields?</h5>",
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                toast: true,
                position: 'top',
                allowOutsideClick: false,
                confirmButtonColor: '#000000',
                cancelButtonColor: '#000000',
                background: '#CA0B00'
            }).then((result) => {
                if (result.value) {
                    this.spinner.show();
                    page.isActive = false;
                    this.service.deleteFormPage(page.pageGUID, page).subscribe(data => {
                        this.spinner.hide();
                        this.refreshPageList();
                        this.showNotification('top', 'center', 'The page and its Fields has been deleted successfully!', '', 'success');
                    },
                        error => {
                            this.showNotification('top', 'center', 'Error deleting page and its field, please try again', '', 'danger');
                            this.spinner.hide();
                        });
                }
            })
        }
        else {
            this.showNotification('top', 'center', 'You cannot delete the first page of the form', '', 'danger');
        }
    }

    drop(event: any) {
        //re-orders list
        this.refreshGroupSectionList();
        if (event.previousContainer === event.container && event.container.data !== this.fieldTypes && event.currentIndex !== 0) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            if (event.currentIndex !== 0) {
                transferArrayItem(
                    event.previousContainer.data,
                    event.container.data,
                    event.previousIndex,
                    event.currentIndex,
                );
                this.fields = [];
                this.fieldOperatorList = this.updateCalculationFieldList();
                this.fieldTypes = [
                    {
                        "fieldID": 0,
                        "fieldTypeID": 22,
                        "pageGUID": "pageGUID",
                        "fieldName": "",
                        "questionName": "",
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
                        "dataExportName": "",
                        "xmlElementName": "",
                        "hasPhoto": false,
                        "hasAttachment": false,
                        "hasComment": false,
                        "isPublished": -1,
                        "fieldType": {
                            "fieldTypeID": 22,
                            "displayName": "Alpha Numeric",
                            "description": "rtt",
                            "value": "Alphanumeric"
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
                                "height": 24,
                                "cssClass": "linear-gradient(147deg, #f9fcff 0%, #dee4ea 74%)"
                            }
                        ],
                        "fieldValidations": [
                            {
                                "fieldValidationID": 0,
                                "dataLength": 50,
                                "isEditable": true,
                                "isRequired": false,
                                "isHidden": false,
                                "EmbeddedForm": "0",
                                "EmbeddedFormId": 0
                            }
                        ]
                    },
                    {
                        "fieldID": 0,
                        "fieldTypeID": 15,
                        "pageGUID": "pageGUID",
                        "fieldName": "",
                        "questionName": "",
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
                        "dataExportName": "",
                        "xmlElementName": "",
                        "hasPhoto": false,
                        "hasAttachment": false,
                        "hasComment": false,
                        "isPublished": -1,
                        "fieldType": {
                            "fieldTypeID": 15,
                            "displayName": "Calculated Value",
                            "description": "calculate",
                            "value": "calculation"
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
                            "pageGUID": "string",
                            "parentGroupID": 0,
                            "type": "string",
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
                                "height": 24,
                                "cssClass": "linear-gradient(147deg, #f9fcff 0%, #dee4ea 74%)"
                            }
                        ],
                        "fieldValidations": [
                            {
                                "fieldValidationID": 0,
                                "dataLength": 50,
                                "isEditable": true,
                                "isRequired": false,
                                "isHidden": false,
                                "EmbeddedForm": "0",
                                "EmbeddedFormId": 0
                            }
                        ]
                    },
                    {
                        "fieldID": 0,
                        "fieldTypeID": 14,
                        "pageGUID": "pageGUID",
                        "fieldName": "",
                        "questionName": "",
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
                        "dataExportName": "",
                        "xmlElementName": "",
                        "hasPhoto": false,
                        "hasAttachment": false,
                        "hasComment": false,
                        "isPublished": -1,
                        "fieldType": {
                            "fieldTypeID": 14,
                            "displayName": "Checkbox",
                            "description": "check_box",
                            "value": "checkbox"
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
                            "pageGUID": "string",
                            "parentGroupID": 0,
                            "type": "string",
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
                                "height": 24,
                                "cssClass": "linear-gradient(147deg, #f9fcff 0%, #dee4ea 74%)"
                            }
                        ],
                        "fieldValidations": [
                            {
                                "fieldValidationID": 0,
                                "dataLength": 50,
                                "isEditable": true,
                                "isRequired": false,
                                "isHidden": false,
                                "EmbeddedForm": "0",
                                "EmbeddedFormId": 0
                            }
                        ]
                    },
                    {
                        "fieldID": 0,
                        "fieldTypeID": 13,
                        "pageGUID": "pageGUID",
                        "fieldName": "",
                        "questionName": "",
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
                        "dataExportName": "",
                        "xmlElementName": "",
                        "hasPhoto": false,
                        "hasAttachment": false,
                        "hasComment": false,
                        "isPublished": -1,
                        "fieldType": {
                            "fieldTypeID": 13,
                            "displayName": "Date",
                            "description": "date_range",
                            "value": "date"
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
                            "pageGUID": "string",
                            "parentGroupID": 0,
                            "type": "string",
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
                                "height": 24,
                                "cssClass": "linear-gradient(147deg, #f9fcff 0%, #dee4ea 74%)"
                            }
                        ],
                        "fieldValidations": [
                            {
                                "fieldValidationID": 0,
                                "dataLength": 50,
                                "isEditable": true,
                                "isRequired": false,
                                "isHidden": false,
                                "EmbeddedForm": "0",
                                "EmbeddedFormId": 0
                            }
                        ]
                    },
                    {
                        "fieldID": 0,
                        "fieldTypeID": 29,
                        "pageGUID": "pageGUID",
                        "fieldName": "",
                        "questionName": "",
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
                        "dataExportName": "",
                        "xmlElementName": "",
                        "hasPhoto": false,
                        "hasAttachment": false,
                        "hasComment": false,
                        "isPublished": -1,
                        "fieldType": {
                            "fieldTypeID": 29,
                            "displayName": "Decimal",
                            "description": "fiber_manual_record",
                            "value": "decimal"
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
                                "height": 24,
                                "cssClass": "linear-gradient(147deg, #f9fcff 0%, #dee4ea 74%)"
                            }
                        ],
                        "fieldValidations": [
                            {
                                "fieldValidationID": 0,
                                "dataLength": 50,
                                "isEditable": true,
                                "isRequired": false,
                                "isHidden": false,
                                "EmbeddedForm": "0",
                                "EmbeddedFormId": 0
                            }
                        ]
                    },
                    {
                        "fieldID": 0,
                        "fieldTypeID": 30,
                        "pageGUID": "pageGUID",
                        "fieldName": "",
                        "questionName": "",
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
                        "dataExportName": "",
                        "xmlElementName": "",
                        "hasPhoto": false,
                        "hasAttachment": false,
                        "hasComment": false,
                        "isPublished": -1,
                        "fieldType": {
                            "fieldTypeID": 30,
                            "displayName": "Drawing Area",
                            "description": "brush",
                            "value": "imagearea"
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
                                "height": 24,
                                "cssClass": "linear-gradient(147deg, #f9fcff 0%, #dee4ea 74%)"
                            }
                        ],
                        "fieldValidations": [
                            {
                                "fieldValidationID": 0,
                                "dataLength": 50,
                                "isEditable": true,
                                "isRequired": false,
                                "isHidden": false,
                                "EmbeddedForm": "0",
                                "EmbeddedFormId": 0
                            }
                        ]
                    },
                    {
                        "fieldID": 0,
                        "fieldTypeID": 24,
                        "pageGUID": "pageGUID",
                        "fieldName": "",
                        "questionName": "",
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
                        "dataExportName": "",
                        "xmlElementName": "",
                        "hasPhoto": false,
                        "hasAttachment": false,
                        "hasComment": false,
                        "isPublished": -1,
                        "fieldType": {
                            "fieldTypeID": 24,
                            "displayName": "Email Address",
                            "description": "alternate_email",
                            "value": "EmailAddress"
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
                                "height": 24,
                                "cssClass": "linear-gradient(147deg, #f9fcff 0%, #dee4ea 74%)"
                            }
                        ],
                        "fieldValidations": [
                            {
                                "fieldValidationID": 0,
                                "dataLength": 50,
                                "isEditable": true,
                                "isRequired": false,
                                "isHidden": false,
                                "EmbeddedForm": "0",
                                "EmbeddedFormId": 0
                            }
                        ]
                    },
                    {
                        "fieldID": 0,
                        "fieldTypeID": 31,
                        "pageGUID": "pageGUID",
                        "fieldName": "",
                        "questionName": "",
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
                        "dataExportName": "",
                        "xmlElementName": "",
                        "hasPhoto": false,
                        "hasAttachment": false,
                        "hasComment": false,
                        "isPublished": -1,
                        "fieldType": {
                            "fieldTypeID": 31,
                            "displayName": "Information",
                            "description": "info",
                            "value": "information"
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
                            "pageGUID": "string",
                            "parentGroupID": 0,
                            "type": "string",
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
                                "height": 24,
                                "cssClass": "linear-gradient(147deg, #f9fcff 0%, #dee4ea 74%)"
                            }
                        ],
                        "fieldValidations": [
                            {
                                "fieldValidationID": 0,
                                "dataLength": 50,
                                "isEditable": true,
                                "isRequired": false,
                                "isHidden": false,
                                "EmbeddedForm": "0",
                                "EmbeddedFormId": 0
                            }
                        ]
                    },
                    {
                        "fieldID": 0,
                        "fieldTypeID": 9,
                        "pageGUID": "pageGUID",
                        "fieldName": "",
                        "questionName": "",
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
                        "dataExportName": "",
                        "xmlElementName": "",
                        "hasPhoto": false,
                        "hasAttachment": false,
                        "hasComment": false,
                        "isPublished": -1,
                        "fieldType": {
                            "fieldTypeID": 9,
                            "displayName": "Number",
                            "description": "numbers",
                            "value": "number"
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
                            "pageGUID": "string",
                            "parentGroupID": 0,
                            "type": "string",
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
                                "height": 24,
                                "cssClass": "linear-gradient(147deg, #f9fcff 0%, #dee4ea 74%)"
                            }
                        ],
                        "fieldValidations": [
                            {
                                "fieldValidationID": 0,
                                "dataLength": 50,
                                "isEditable": true,
                                "isRequired": false,
                                "isHidden": false,
                                "EmbeddedForm": "0",
                                "EmbeddedFormId": 0
                            }
                        ]
                    },
                    {
                        "fieldID": 0,
                        "fieldTypeID": 27,
                        "pageGUID": "pageGUID",
                        "fieldName": "",
                        "questionName": "",
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
                        "dataExportName": "",
                        "xmlElementName": "",
                        "hasPhoto": false,
                        "hasAttachment": false,
                        "hasComment": false,
                        "isPublished": -1,
                        "fieldType": {
                            "fieldTypeID": 27,
                            "displayName": "Plain Alpha",
                            "description": "title",
                            "value": "plainalpha"
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
                            "pageGUID": "string",
                            "parentGroupID": 0,
                            "type": "string",
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
                                "height": 24,
                                "cssClass": "linear-gradient(147deg, #f9fcff 0%, #dee4ea 74%)"
                            }
                        ],
                        "fieldValidations": [
                            {
                                "fieldValidationID": 0,
                                "dataLength": 50,
                                "isEditable": true,
                                "isRequired": false,
                                "isHidden": false,
                                "EmbeddedForm": "0",
                                "EmbeddedFormId": 0
                            }
                        ]
                    },
                    {
                        "fieldID": 0,
                        "fieldTypeID": 4,
                        "pageGUID": "pageGUID",
                        "fieldName": "",
                        "questionName": "",
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
                        "dataExportName": "",
                        "xmlElementName": "",
                        "hasPhoto": false,
                        "hasAttachment": false,
                        "hasComment": false,
                        "isPublished": -1,
                        "fieldType": {
                            "fieldTypeID": 4,
                            "displayName": "Plain Text",
                            "description": "text_fields",
                            "value": "plaintext"
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
                            "pageGUID": "string",
                            "parentGroupID": 0,
                            "type": "string",
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
                                "height": 24,
                                "cssClass": "linear-gradient(147deg, #f9fcff 0%, #dee4ea 74%)"
                            }
                        ],
                        "fieldValidations": [
                            {
                                "fieldValidationID": 0,
                                "dataLength": 50,
                                "isEditable": true,
                                "isRequired": false,
                                "isHidden": false,
                                "EmbeddedForm": "0",
                                "EmbeddedFormId": 0
                            }
                        ]
                    },
                    {
                        "fieldID": 0,
                        "fieldTypeID": 32,
                        "pageGUID": "pageGUID",
                        "fieldName": "group",
                        "questionName": "group",
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
                        "dataExportName": "",
                        "xmlElementName": "",
                        "hasPhoto": false,
                        "hasAttachment": false,
                        "hasComment": false,
                        "isPublished": -1,
                        "fieldType": {
                            "fieldTypeID": 32,
                            "displayName": "Question Group",
                            "description": "view_stream",
                            "value": "group"
                        },
                        "formPage": {
                            "pageGUID": "string",
                            "name": "string",
                            "formID": 0,
                            "isActive": true
                        },
                        "group": {
                            "groupGUID": "string",
                            "name": "",
                            "isRequired": true,
                            "pageGUID": "",
                            "parentGroupID": 0,
                            "type": ""
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
                                "height": 24,
                                "cssClass": GlobalConstants.groupStyle
                            }
                        ],
                        "fieldValidations": [
                            {
                                "fieldValidationID": 0,
                                "dataLength": 50,
                                "isEditable": true,
                                "isRequired": false,
                                "isHidden": false,
                                "EmbeddedForm": "0",
                                "EmbeddedFormId": 0
                            }
                        ]
                    },
                    {
                        "fieldID": 0,
                        "fieldTypeID": 8,
                        "pageGUID": "pageGUID",
                        "fieldName": "",
                        "questionName": "",
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
                        "dataExportName": "",
                        "xmlElementName": "",
                        "hasPhoto": false,
                        "hasAttachment": false,
                        "hasComment": false,
                        "isPublished": -1,
                        "fieldType": {
                            "fieldTypeID": 8,
                            "displayName": "Radio Button",
                            "description": "radio_button_checked",
                            "value": "field or"
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
                            "pageGUID": "string",
                            "parentGroupID": 0,
                            "type": "string",
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
                                "height": 24,
                                "cssClass": "linear-gradient(147deg, #f9fcff 0%, #dee4ea 74%)"
                            }
                        ],
                        "fieldValidations": [
                            {
                                "fieldValidationID": 0,
                                "dataLength": 50,
                                "isEditable": true,
                                "isRequired": false,
                                "isHidden": false,
                                "EmbeddedForm": "0",
                                "EmbeddedFormId": 0
                            }
                        ]
                    },
                    {
                        "fieldID": 0,
                        "fieldTypeID": 7,
                        "pageGUID": "pageGUID",
                        "fieldName": "repeatgroup",
                        "questionName": "repeatgroup",
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
                        "dataExportName": "",
                        "xmlElementName": "",
                        "hasPhoto": false,
                        "hasAttachment": false,
                        "hasComment": false,
                        "isPublished": -1,
                        "fieldType": {
                            "fieldTypeID": 7,
                            "displayName": "Repeat Group",
                            "description": "repeat_on",
                            "value": "repeatgroup"
                        },

                        "formPage": {
                            "pageGUID": "string",
                            "name": "string",
                            "formID": 0,
                            "isActive": true
                        },
                        "group": {
                            "groupGUID": "string",
                            "name": "",
                            "isRequired": true,
                            "pageGUID": "",
                            "parentGroupID": 0,
                            "type": ""
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
                                "height": 24,
                                "cssClass": GlobalConstants.groupStyle
                            }
                        ],
                        "fieldValidations": [
                            {
                                "fieldValidationID": 0,
                                "dataLength": 50,
                                "isEditable": true,
                                "isRequired": false,
                                "isHidden": false,
                                "EmbeddedForm": "0",
                                "EmbeddedFormId": 0
                            }
                        ]
                    },
                    {
                        "fieldID": 0,
                        "fieldTypeID": 6,
                        "pageGUID": "pageGUID",
                        "fieldName": "section",
                        "questionName": "section",
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
                        "dataExportName": "",
                        "xmlElementName": "",
                        "hasPhoto": false,
                        "hasAttachment": false,
                        "hasComment": false,
                        "isPublished": -1,
                        "fieldType": {
                            "fieldTypeID": 7,
                            "displayName": "Section",
                            "description": "article",
                            "value": "section"
                        },

                        "formPage": {
                            "pageGUID": "string",
                            "name": "string",
                            "formID": 0,
                            "isActive": true
                        },
                        "group": {
                            "groupGUID": "string",
                            "name": "",
                            "isRequired": true,
                            "pageGUID": "",
                            "parentGroupID": 0,
                            "type": ""
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
                                "height": 24,
                                "cssClass": GlobalConstants.SectionStyle
                            }
                        ],
                        "fieldValidations": [
                            {
                                "fieldValidationID": 0,
                                "dataLength": 50,
                                "isEditable": true,
                                "isRequired": false,
                                "isHidden": false,
                                "EmbeddedForm": "0",
                                "EmbeddedFormId": 0
                            }
                        ]
                    },
                    {
                        "fieldID": 0,
                        "fieldTypeID": 5,
                        "pageGUID": "pageGUID",
                        "fieldName": "",
                        "questionName": "",
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
                        "dataExportName": "",
                        "xmlElementName": "",
                        "hasPhoto": false,
                        "hasAttachment": false,
                        "hasComment": false,
                        "isPublished": -1,
                        "fieldType": {
                            "fieldTypeID": 5,
                            "displayName": "Select - Single",
                            "description": "arrow_drop_down",
                            "value": "lexicon list"
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
                            "pageGUID": "string",
                            "parentGroupID": 0,
                            "type": "string",
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
                                "height": 24,
                                "cssClass": "linear-gradient(147deg, #f9fcff 0%, #dee4ea 74%)"
                            }
                        ],
                        "fieldValidations": [
                            {
                                "fieldValidationID": 0,
                                "dataLength": 50,
                                "isEditable": true,
                                "isRequired": false,
                                "isHidden": false,
                                "EmbeddedForm": "0",
                                "EmbeddedFormId": 0
                            }
                        ]
                    },
                    {
                        "fieldID": 0,
                        "fieldTypeID": 33,
                        "pageGUID": "pageGUID",
                        "fieldName": "",
                        "questionName": "",
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
                        "dataExportName": "",
                        "xmlElementName": "",
                        "hasPhoto": false,
                        "hasAttachment": false,
                        "hasComment": false,
                        "isPublished": -1,
                        "fieldType": {
                            "fieldTypeID": 5,
                            "displayName": "Select - Multiple",
                            "description": "unfold_more",
                            "value": "link multi select"
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
                            "pageGUID": "string",
                            "parentGroupID": 0,
                            "type": "string",
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
                                "height": 24,
                                "cssClass": "linear-gradient(147deg, #f9fcff 0%, #dee4ea 74%)"
                            }
                        ],
                        "fieldValidations": [
                            {
                                "fieldValidationID": 0,
                                "dataLength": 50,
                                "isEditable": true,
                                "isRequired": false,
                                "isHidden": false,
                                "EmbeddedForm": "0",
                                "EmbeddedFormId": 0
                            }
                        ]
                    },
                    {
                        "fieldID": 0,
                        "fieldTypeID": 28,
                        "pageGUID": "pageGUID",
                        "fieldName": "",
                        "questionName": "",
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
                        "dataExportName": "",
                        "xmlElementName": "",
                        "hasPhoto": false,
                        "hasAttachment": false,
                        "hasComment": false,
                        "isPublished": -1,
                        "fieldType": {
                            "fieldTypeID": 28,
                            "displayName": "Signature",
                            "description": "border_color",
                            "value": "signature"
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
                                "height": 24,
                                "cssClass": "linear-gradient(147deg, #f9fcff 0%, #dee4ea 74%)"
                            }
                        ],
                        "fieldValidations": [
                            {
                                "fieldValidationID": 0,
                                "dataLength": 50,
                                "isEditable": true,
                                "isRequired": false,
                                "isHidden": false,
                                "EmbeddedForm": "0",
                                "EmbeddedFormId": 0
                            }
                        ]
                    },
                    {
                        "fieldID": 0,
                        "fieldTypeID": 26,
                        "pageGUID": "pageGUID",
                        "fieldName": "",
                        "questionName": "",
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
                        "dataExportName": "",
                        "xmlElementName": "",
                        "hasPhoto": false,
                        "hasAttachment": false,
                        "hasComment": false,
                        "isPublished": -1,
                        "fieldType": {
                            "fieldTypeID": 7,
                            "displayName": "Sub Section",
                            "description": "calendar_view_day",
                            "value": "subSection"
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
                            "pageGUID": "string",
                            "parentGroupID": 0,
                            "type": "string",
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
                                "height": 24,
                                "cssClass": GlobalConstants.SubsectionStyle
                            }
                        ],
                        "fieldValidations": [
                            {
                                "fieldValidationID": 0,
                                "dataLength": 50,
                                "isEditable": true,
                                "isRequired": false,
                                "isHidden": false,
                                "EmbeddedForm": "0",
                                "EmbeddedFormId": 0
                            }
                        ]
                    },
                    {
                        "fieldID": 0,
                        "fieldTypeID": 23,
                        "pageGUID": "pageGUID",
                        "fieldName": "",
                        "questionName": "",
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
                        "dataExportName": "",
                        "xmlElementName": "",
                        "hasPhoto": false,
                        "hasAttachment": false,
                        "hasComment": false,
                        "isPublished": -1,
                        "fieldType": {
                            "fieldTypeID": 23,
                            "displayName": "Time",
                            "description": "timer",
                            "value": "Time"
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
                                "height": 24,
                                "cssClass": "linear-gradient(147deg, #f9fcff 0%, #dee4ea 74%)"
                            }
                        ],
                        "fieldValidations": [
                            {
                                "fieldValidationID": 0,
                                "dataLength": 50,
                                "isEditable": true,
                                "isRequired": false,
                                "isHidden": false,
                                "EmbeddedForm": "0",
                                "EmbeddedFormId": 0
                            }
                        ]
                    }
                ];
            }
        }
    }

    addField() {
        if (this.field !== null) {
            this.formDesign.push(this.field.pop());
            this.field = null;
            this.fieldTypes = [
                {
                    "fieldID": 0,
                    "fieldTypeID": 22,
                    "pageGUID": "pageGUID",
                    "fieldName": "",
                    "questionName": "",
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
                    "dataExportName": "",
                    "xmlElementName": "",
                    "hasPhoto": false,
                    "hasAttachment": false,
                    "hasComment": false,
                    "isPublished": -1,
                    "fieldType": {
                        "fieldTypeID": 22,
                        "displayName": "Alpha Numeric",
                        "description": "rtt",
                        "value": "Alphanumeric"
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
                            "height": 24,
                            "cssClass": "linear-gradient(147deg, #f9fcff 0%, #dee4ea 74%)"
                        }
                    ],
                    "fieldValidations": [
                        {
                            "fieldValidationID": 0,
                            "dataLength": 50,
                            "isEditable": true,
                            "isRequired": false,
                            "isHidden": false,
                            "EmbeddedForm": "0",
                            "EmbeddedFormId": 0
                        }
                    ]
                },
                {
                    "fieldID": 0,
                    "fieldTypeID": 15,
                    "pageGUID": "pageGUID",
                    "fieldName": "",
                    "questionName": "",
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
                    "dataExportName": "",
                    "xmlElementName": "",
                    "hasPhoto": false,
                    "hasAttachment": false,
                    "hasComment": false,
                    "isPublished": -1,
                    "fieldType": {
                        "fieldTypeID": 15,
                        "displayName": "Calculated Value",
                        "description": "calculate",
                        "value": "calculation"
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
                        "pageGUID": "string",
                        "parentGroupID": 0,
                        "type": "string",
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
                            "height": 24,
                            "cssClass": "linear-gradient(147deg, #f9fcff 0%, #dee4ea 74%)"
                        }
                    ],
                    "fieldValidations": [
                        {
                            "fieldValidationID": 0,
                            "dataLength": 50,
                            "isEditable": true,
                            "isRequired": false,
                            "isHidden": false,
                            "EmbeddedForm": "0",
                            "EmbeddedFormId": 0
                        }
                    ]
                },
                {
                    "fieldID": 0,
                    "fieldTypeID": 14,
                    "pageGUID": "pageGUID",
                    "fieldName": "",
                    "questionName": "",
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
                    "dataExportName": "",
                    "xmlElementName": "",
                    "hasPhoto": false,
                    "hasAttachment": false,
                    "hasComment": false,
                    "isPublished": -1,
                    "fieldType": {
                        "fieldTypeID": 14,
                        "displayName": "Checkbox",
                        "description": "check_box",
                        "value": "checkbox"
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
                        "pageGUID": "string",
                        "parentGroupID": 0,
                        "type": "string",
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
                            "height": 24,
                            "cssClass": "linear-gradient(147deg, #f9fcff 0%, #dee4ea 74%)"
                        }
                    ],
                    "fieldValidations": [
                        {
                            "fieldValidationID": 0,
                            "dataLength": 50,
                            "isEditable": true,
                            "isRequired": false,
                            "isHidden": false,
                            "EmbeddedForm": "0",
                            "EmbeddedFormId": 0
                        }
                    ]
                },
                {
                    "fieldID": 0,
                    "fieldTypeID": 13,
                    "pageGUID": "pageGUID",
                    "fieldName": "",
                    "questionName": "",
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
                    "dataExportName": "",
                    "xmlElementName": "",
                    "hasPhoto": false,
                    "hasAttachment": false,
                    "hasComment": false,
                    "isPublished": -1,
                    "fieldType": {
                        "fieldTypeID": 13,
                        "displayName": "Date",
                        "description": "date_range",
                        "value": "date"
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
                        "pageGUID": "string",
                        "parentGroupID": 0,
                        "type": "string",
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
                            "height": 24,
                            "cssClass": "linear-gradient(147deg, #f9fcff 0%, #dee4ea 74%)"
                        }
                    ],
                    "fieldValidations": [
                        {
                            "fieldValidationID": 0,
                            "dataLength": 50,
                            "isEditable": true,
                            "isRequired": false,
                            "isHidden": false,
                            "EmbeddedForm": "0",
                            "EmbeddedFormId": 0
                        }
                    ]
                },
                {
                    "fieldID": 0,
                    "fieldTypeID": 29,
                    "pageGUID": "pageGUID",
                    "fieldName": "",
                    "questionName": "",
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
                    "dataExportName": "",
                    "xmlElementName": "",
                    "hasPhoto": false,
                    "hasAttachment": false,
                    "hasComment": false,
                    "isPublished": -1,
                    "fieldType": {
                        "fieldTypeID": 29,
                        "displayName": "Decimal",
                        "description": "fiber_manual_record",
                        "value": "decimal"
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
                            "height": 24,
                            "cssClass": "linear-gradient(147deg, #f9fcff 0%, #dee4ea 74%)"
                        }
                    ],
                    "fieldValidations": [
                        {
                            "fieldValidationID": 0,
                            "dataLength": 50,
                            "isEditable": true,
                            "isRequired": false,
                            "isHidden": false,
                            "EmbeddedForm": "0",
                            "EmbeddedFormId": 0
                        }
                    ]
                },
                {
                    "fieldID": 0,
                    "fieldTypeID": 30,
                    "pageGUID": "pageGUID",
                    "fieldName": "",
                    "questionName": "",
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
                    "dataExportName": "",
                    "xmlElementName": "",
                    "hasPhoto": false,
                    "hasAttachment": false,
                    "hasComment": false,
                    "isPublished": -1,
                    "fieldType": {
                        "fieldTypeID": 30,
                        "displayName": "Drawing Area",
                        "description": "brush",
                        "value": "imagearea"
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
                            "height": 24,
                            "cssClass": "linear-gradient(147deg, #f9fcff 0%, #dee4ea 74%)"
                        }
                    ],
                    "fieldValidations": [
                        {
                            "fieldValidationID": 0,
                            "dataLength": 50,
                            "isEditable": true,
                            "isRequired": false,
                            "isHidden": false,
                            "EmbeddedForm": "0",
                            "EmbeddedFormId": 0
                        }
                    ]
                },
                {
                    "fieldID": 0,
                    "fieldTypeID": 24,
                    "pageGUID": "pageGUID",
                    "fieldName": "",
                    "questionName": "",
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
                    "dataExportName": "",
                    "xmlElementName": "",
                    "hasPhoto": false,
                    "hasAttachment": false,
                    "hasComment": false,
                    "isPublished": -1,
                    "fieldType": {
                        "fieldTypeID": 24,
                        "displayName": "Email Address",
                        "description": "alternate_email",
                        "value": "EmailAddress"
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
                            "height": 24,
                            "cssClass": "linear-gradient(147deg, #f9fcff 0%, #dee4ea 74%)"
                        }
                    ],
                    "fieldValidations": [
                        {
                            "fieldValidationID": 0,
                            "dataLength": 50,
                            "isEditable": true,
                            "isRequired": false,
                            "isHidden": false,
                            "EmbeddedForm": "0",
                            "EmbeddedFormId": 0
                        }
                    ]
                },
                {
                    "fieldID": 0,
                    "fieldTypeID": 31,
                    "pageGUID": "pageGUID",
                    "fieldName": "",
                    "questionName": "",
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
                    "dataExportName": "",
                    "xmlElementName": "",
                    "hasPhoto": false,
                    "hasAttachment": false,
                    "hasComment": false,
                    "isPublished": -1,
                    "fieldType": {
                        "fieldTypeID": 31,
                        "displayName": "Information",
                        "description": "info",
                        "value": "information"
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
                        "pageGUID": "string",
                        "parentGroupID": 0,
                        "type": "string",
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
                            "height": 24,
                            "cssClass": "linear-gradient(147deg, #f9fcff 0%, #dee4ea 74%)"
                        }
                    ],
                    "fieldValidations": [
                        {
                            "fieldValidationID": 0,
                            "dataLength": 50,
                            "isEditable": true,
                            "isRequired": false,
                            "isHidden": false,
                            "EmbeddedForm": "0",
                            "EmbeddedFormId": 0
                        }
                    ]
                },
                {
                    "fieldID": 0,
                    "fieldTypeID": 9,
                    "pageGUID": "pageGUID",
                    "fieldName": "",
                    "questionName": "",
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
                    "dataExportName": "",
                    "xmlElementName": "",
                    "hasPhoto": false,
                    "hasAttachment": false,
                    "hasComment": false,
                    "isPublished": -1,
                    "fieldType": {
                        "fieldTypeID": 9,
                        "displayName": "Number",
                        "description": "numbers",
                        "value": "number"
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
                        "pageGUID": "string",
                        "parentGroupID": 0,
                        "type": "string",
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
                            "height": 24,
                            "cssClass": "linear-gradient(147deg, #f9fcff 0%, #dee4ea 74%)"
                        }
                    ],
                    "fieldValidations": [
                        {
                            "fieldValidationID": 0,
                            "dataLength": 50,
                            "isEditable": true,
                            "isRequired": false,
                            "isHidden": false,
                            "EmbeddedForm": "0",
                            "EmbeddedFormId": 0
                        }
                    ]
                },
                {
                    "fieldID": 0,
                    "fieldTypeID": 27,
                    "pageGUID": "pageGUID",
                    "fieldName": "",
                    "questionName": "",
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
                    "dataExportName": "",
                    "xmlElementName": "",
                    "hasPhoto": false,
                    "hasAttachment": false,
                    "hasComment": false,
                    "isPublished": -1,
                    "fieldType": {
                        "fieldTypeID": 27,
                        "displayName": "Plain Alpha",
                        "description": "title",
                        "value": "plainalpha"
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
                        "pageGUID": "string",
                        "parentGroupID": 0,
                        "type": "string",
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
                            "height": 24,
                            "cssClass": "linear-gradient(147deg, #f9fcff 0%, #dee4ea 74%)"
                        }
                    ],
                    "fieldValidations": [
                        {
                            "fieldValidationID": 0,
                            "dataLength": 50,
                            "isEditable": true,
                            "isRequired": false,
                            "isHidden": false,
                            "EmbeddedForm": "0",
                            "EmbeddedFormId": 0
                        }
                    ]
                },
                {
                    "fieldID": 0,
                    "fieldTypeID": 4,
                    "pageGUID": "pageGUID",
                    "fieldName": "",
                    "questionName": "",
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
                    "dataExportName": "",
                    "xmlElementName": "",
                    "hasPhoto": false,
                    "hasAttachment": false,
                    "hasComment": false,
                    "isPublished": -1,
                    "fieldType": {
                        "fieldTypeID": 4,
                        "displayName": "Plain Text",
                        "description": "text_fields",
                        "value": "plaintext"
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
                        "pageGUID": "string",
                        "parentGroupID": 0,
                        "type": "string",
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
                            "height": 24,
                            "cssClass": "linear-gradient(147deg, #f9fcff 0%, #dee4ea 74%)"
                        }
                    ],
                    "fieldValidations": [
                        {
                            "fieldValidationID": 0,
                            "dataLength": 50,
                            "isEditable": true,
                            "isRequired": false,
                            "isHidden": false,
                            "EmbeddedForm": "0",
                            "EmbeddedFormId": 0
                        }
                    ]
                },
                {
                    "fieldID": 0,
                    "fieldTypeID": 32,
                    "pageGUID": "pageGUID",
                    "fieldName": "group",
                    "questionName": "group",
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
                    "dataExportName": "",
                    "xmlElementName": "",
                    "hasPhoto": false,
                    "hasAttachment": false,
                    "hasComment": false,
                    "isPublished": -1,
                    "fieldType": {
                        "fieldTypeID": 32,
                        "displayName": "Question Group",
                        "description": "view_stream",
                        "value": "group"
                    },
                    "formPage": {
                        "pageGUID": "string",
                        "name": "string",
                        "formID": 0,
                        "isActive": true
                    },
                    "group": {
                        "groupGUID": "string",
                        "name": "",
                        "isRequired": true,
                        "pageGUID": "",
                        "parentGroupID": 0,
                        "type": ""
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
                            "height": 24,
                            "cssClass": GlobalConstants.groupStyle
                        }
                    ],
                    "fieldValidations": [
                        {
                            "fieldValidationID": 0,
                            "dataLength": 50,
                            "isEditable": true,
                            "isRequired": false,
                            "isHidden": false,
                            "EmbeddedForm": "0",
                            "EmbeddedFormId": 0
                        }
                    ]
                },
                {
                    "fieldID": 0,
                    "fieldTypeID": 8,
                    "pageGUID": "pageGUID",
                    "fieldName": "",
                    "questionName": "",
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
                    "dataExportName": "",
                    "xmlElementName": "",
                    "hasPhoto": false,
                    "hasAttachment": false,
                    "hasComment": false,
                    "isPublished": -1,
                    "fieldType": {
                        "fieldTypeID": 8,
                        "displayName": "Radio Button",
                        "description": "radio_button_checked",
                        "value": "field or"
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
                        "pageGUID": "string",
                        "parentGroupID": 0,
                        "type": "string",
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
                            "height": 24,
                            "cssClass": "linear-gradient(147deg, #f9fcff 0%, #dee4ea 74%)"
                        }
                    ],
                    "fieldValidations": [
                        {
                            "fieldValidationID": 0,
                            "dataLength": 50,
                            "isEditable": true,
                            "isRequired": false,
                            "isHidden": false,
                            "EmbeddedForm": "0",
                            "EmbeddedFormId": 0
                        }
                    ]
                },
                {
                    "fieldID": 0,
                    "fieldTypeID": 7,
                    "pageGUID": "pageGUID",
                    "fieldName": "repeatgroup",
                    "questionName": "repeatgroup",
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
                    "dataExportName": "",
                    "xmlElementName": "",
                    "hasPhoto": false,
                    "hasAttachment": false,
                    "hasComment": false,
                    "isPublished": -1,
                    "fieldType": {
                        "fieldTypeID": 7,
                        "displayName": "Repeat Group",
                        "description": "repeat_on",
                        "value": "repeatgroup"
                    },

                    "formPage": {
                        "pageGUID": "string",
                        "name": "string",
                        "formID": 0,
                        "isActive": true
                    },
                    "group": {
                        "groupGUID": "string",
                        "name": "",
                        "isRequired": true,
                        "pageGUID": "",
                        "parentGroupID": 0,
                        "type": ""
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
                            "height": 24,
                            "cssClass": GlobalConstants.groupStyle
                        }
                    ],
                    "fieldValidations": [
                        {
                            "fieldValidationID": 0,
                            "dataLength": 50,
                            "isEditable": true,
                            "isRequired": false,
                            "isHidden": false,
                            "EmbeddedForm": "0",
                            "EmbeddedFormId": 0
                        }
                    ]
                },
                {
                    "fieldID": 0,
                    "fieldTypeID": 6,
                    "pageGUID": "pageGUID",
                    "fieldName": "section",
                    "questionName": "section",
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
                    "dataExportName": "",
                    "xmlElementName": "",
                    "hasPhoto": false,
                    "hasAttachment": false,
                    "hasComment": false,
                    "isPublished": -1,
                    "fieldType": {
                        "fieldTypeID": 7,
                        "displayName": "Section",
                        "description": "article",
                        "value": "section"
                    },

                    "formPage": {
                        "pageGUID": "string",
                        "name": "string",
                        "formID": 0,
                        "isActive": true
                    },
                    "group": {
                        "groupGUID": "string",
                        "name": "",
                        "isRequired": true,
                        "pageGUID": "",
                        "parentGroupID": 0,
                        "type": ""
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
                            "height": 24,
                            "cssClass": GlobalConstants.SectionStyle
                        }
                    ],
                    "fieldValidations": [
                        {
                            "fieldValidationID": 0,
                            "dataLength": 50,
                            "isEditable": true,
                            "isRequired": false,
                            "isHidden": false,
                            "EmbeddedForm": "0",
                            "EmbeddedFormId": 0
                        }
                    ]
                },
                {
                    "fieldID": 0,
                    "fieldTypeID": 5,
                    "pageGUID": "pageGUID",
                    "fieldName": "",
                    "questionName": "",
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
                    "dataExportName": "",
                    "xmlElementName": "",
                    "hasPhoto": false,
                    "hasAttachment": false,
                    "hasComment": false,
                    "isPublished": -1,
                    "fieldType": {
                        "fieldTypeID": 5,
                        "displayName": "Select - Single",
                        "description": "arrow_drop_down",
                        "value": "lexicon list"
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
                        "pageGUID": "string",
                        "parentGroupID": 0,
                        "type": "string",
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
                            "height": 24,
                            "cssClass": "linear-gradient(147deg, #f9fcff 0%, #dee4ea 74%)"
                        }
                    ],
                    "fieldValidations": [
                        {
                            "fieldValidationID": 0,
                            "dataLength": 50,
                            "isEditable": true,
                            "isRequired": false,
                            "isHidden": false,
                            "EmbeddedForm": "0",
                            "EmbeddedFormId": 0
                        }
                    ]
                },
                {
                    "fieldID": 0,
                    "fieldTypeID": 33,
                    "pageGUID": "pageGUID",
                    "fieldName": "",
                    "questionName": "",
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
                    "dataExportName": "",
                    "xmlElementName": "",
                    "hasPhoto": false,
                    "hasAttachment": false,
                    "hasComment": false,
                    "isPublished": -1,
                    "fieldType": {
                        "fieldTypeID": 5,
                        "displayName": "Select - Multiple",
                        "description": "unfold_more",
                        "value": "link multi select"
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
                        "pageGUID": "string",
                        "parentGroupID": 0,
                        "type": "string",
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
                            "height": 24,
                            "cssClass": "linear-gradient(147deg, #f9fcff 0%, #dee4ea 74%)"
                        }
                    ],
                    "fieldValidations": [
                        {
                            "fieldValidationID": 0,
                            "dataLength": 50,
                            "isEditable": true,
                            "isRequired": false,
                            "isHidden": false,
                            "EmbeddedForm": "0",
                            "EmbeddedFormId": 0
                        }
                    ]
                },
                {
                    "fieldID": 0,
                    "fieldTypeID": 28,
                    "pageGUID": "pageGUID",
                    "fieldName": "",
                    "questionName": "",
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
                    "dataExportName": "",
                    "xmlElementName": "",
                    "hasPhoto": false,
                    "hasAttachment": false,
                    "hasComment": false,
                    "isPublished": -1,
                    "fieldType": {
                        "fieldTypeID": 28,
                        "displayName": "Signature",
                        "description": "border_color",
                        "value": "signature"
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
                            "height": 24,
                            "cssClass": "linear-gradient(147deg, #f9fcff 0%, #dee4ea 74%)"
                        }
                    ],
                    "fieldValidations": [
                        {
                            "fieldValidationID": 0,
                            "dataLength": 50,
                            "isEditable": true,
                            "isRequired": false,
                            "isHidden": false,
                            "EmbeddedForm": "0",
                            "EmbeddedFormId": 0
                        }
                    ]
                },
                {
                    "fieldID": 0,
                    "fieldTypeID": 26,
                    "pageGUID": "pageGUID",
                    "fieldName": "",
                    "questionName": "",
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
                    "dataExportName": "",
                    "xmlElementName": "",
                    "hasPhoto": false,
                    "hasAttachment": false,
                    "hasComment": false,
                    "isPublished": -1,
                    "fieldType": {
                        "fieldTypeID": 7,
                        "displayName": "Sub Section",
                        "description": "calendar_view_day",
                        "value": "subSection"
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
                        "pageGUID": "string",
                        "parentGroupID": 0,
                        "type": "string",
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
                            "height": 24,
                            "cssClass": GlobalConstants.SubsectionStyle
                        }
                    ],
                    "fieldValidations": [
                        {
                            "fieldValidationID": 0,
                            "dataLength": 50,
                            "isEditable": true,
                            "isRequired": false,
                            "isHidden": false,
                            "EmbeddedForm": "0",
                            "EmbeddedFormId": 0
                        }
                    ]
                },
                {
                    "fieldID": 0,
                    "fieldTypeID": 23,
                    "pageGUID": "pageGUID",
                    "fieldName": "",
                    "questionName": "",
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
                    "dataExportName": "",
                    "xmlElementName": "",
                    "hasPhoto": false,
                    "hasAttachment": false,
                    "hasComment": false,
                    "isPublished": -1,
                    "fieldType": {
                        "fieldTypeID": 23,
                        "displayName": "Time",
                        "description": "timer",
                        "value": "Time"
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
                            "height": 24,
                            "cssClass": "linear-gradient(147deg, #f9fcff 0%, #dee4ea 74%)"
                        }
                    ],
                    "fieldValidations": [
                        {
                            "fieldValidationID": 0,
                            "dataLength": 50,
                            "isEditable": true,
                            "isRequired": false,
                            "isHidden": false,
                            "EmbeddedForm": "0",
                            "EmbeddedFormId": 0
                        }
                    ]
                }
            ];
        }
        else {
            alert("choose a field first")
        }
    }

    refreshPageList() {
        this.service.getFormPages(this.formData.formID).subscribe(data => {
            this.pages = data;
            this.getDesignPerPage(this.pages[0].pageGUID);
            this.currentPage = this.pages[0];
        });
    }

    refreshGroupSectionList() {
        this.service.getFormGroupsPerPage(this.formData.formID, this.currentPage.pageGUID).subscribe(data => {
            this.groupSectionList = [
                {
                    "groupGUID": "",
                    "name": "No Group/Section",
                    "isRequired": true,
                    "pageGUID": "string",
                    "parentGroupID": 0,
                    "type": "string",
                    "isActive": true
                }
            ];
            this.sectionList = [
                {
                    "groupGUID": "",
                    "name": "No Section",
                    "isRequired": true,
                    "pageGUID": "string",
                    "parentGroupID": 0,
                    "type": "string",
                    "isActive": true
                }
            ];
            var sections: any = [];
            var groups: any = [];
            var questionGroup: any = [];

            sections = data.filter(item => item.type === 'section');
            groups = data.filter(item => item.type === 'repeatgroup');
            questionGroup = data.filter(item => item.type === 'group');

            if (questionGroup.length > 0) {
                merge(this.groupSectionList, questionGroup);
            }

            if (groups.length > 0) {
                merge(this.groupSectionList, groups);
            }

            if (sections.length > 0) {
                merge(this.sectionList, sections);
                merge(this.groupSectionList, sections);
            }
        });
    }

    getformDescription() {
        this.spinner.show();
        this.service.getEmbeddedFormList().subscribe(data => {
          this.formdescription = data;
          console.log("formDes: "+this.formdescription[0].formID);
          console.log("Embedded: " +this.formdescription[0].embeddedForm)
          this.spinner.hide();
        });
      } 


    getDesignPerPage(pageGUID: any) {
        this.fieldList = [];
        this.spinner.show();
        this.service.getFormFieldsPerPage(this.formData.formID, pageGUID).subscribe(data => {
            this.formDesign = data;
            this.formDesign.forEach(field => {
                if (field.fieldType.value == 'plaintext' || field.fieldType.value == 'number' || field.fieldType.value == 'decimal' || field.fieldType.value == 'EmailAddress' || field.fieldType.value == 'Alphanumeric' || field.fieldType.value == 'plainalpha') {
                    this.fieldList.push(field);
                    this.service.GetSkipLogicRules(this.currentPage.pageGUID, field.fieldName).subscribe(res => {
                        if (res.length > 0) {
                            let obj = {
                                "showSkip": res[0].showSkip,
                                "allAny": res[0].allAny,
                                "field": res[0].field,
                                "condition": res[0].condition,
                                "value": res[0].value,
                                "pageGUID": res[0].pageGUID,
                                "displayText": res[0].displayText,
                                "xmlElementName": res[0].xmlElementName
                            }
                            field["skipRules"] = obj;
                        }
                        else {
                            let obj = {
                                "showSkip": "",
                                "allAny": "",
                                "field": "",
                                "condition": "",
                                "value": "",
                                "pageGUID": "",
                                "displayText": "",
                                "xmlElementName": ""
                            }
                            field["skipRules"] = obj;
                        }
                    });

                    this.service.GetAdvancedValidation(this.currentPage.pageGUID, field.fieldName).subscribe(res => {
                        if (res.length > 0) {
                            let obj = {
                                "allAny": res[0].allAny,
                                "condition": res[0].condition,
                                "value": res[0].value,
                                "": res[0].errorMessage,
                                "displayText": res[0].displayText,
                                "pageGUID": res[0].pageGUID,
                                "xmlElementName": res[0].xmlElementName,
                                "field": res[0].field
                            }
                            field["validRules"] = obj;
                        }
                        else {
                            let obj = {
                                "allAny": 0,
                                "condition": "",
                                "value": "",
                                "errorMessage": "",
                                "displayText": "",
                                "pageGUID": "",
                                "xmlElementName": "",
                                "field": ""
                            }
                            field["validRules"] = obj;
                        }
                    })
                }
            })
            this.fieldOperatorList = this.updateCalculationFieldList();
            this.spinner.hide();
        });
    }

    addCalc(item: any) {
        if (this.value.data !== "undefined" && this.value.data !== "" && this.value.data !== undefined) {
            item.calculation = item.calculation + " " + this.value.data;
            if (this.fieldOperatorList === this.operators) {
                this.fieldOperatorList = this.fields;
                this.operationField = "Select a field";
                this.value.data = "";
            }
            else {
                this.fieldOperatorList = this.operators;
                this.operationField = "Select an operator";
                this.value.data = "";
            }
        }
        else {
            this.showNotification('top', 'center', 'Please select a field/operation before adding to calculation!', '', 'danger');
        }
    }

    clearCalc(i: any) {
        this.formDesign[i].calculation = "";
        this.fieldOperatorList = this.fields;
        this.operationField = "Select a field";
    }

    saveDesignPerPage(pageGUID: any) {
        var errorMessage = "Please ensure number ";
        var errorMessageCompulsory="Please ensure number ";
        var count = 0;
        var count1 = 0;
        let hasDuplicates: Boolean = false;
        this.formDesign.forEach((element, index) => {
            if (element.isDisplayable !== false && this.currentPage.name == "Page 1") {
                count++;
            }

            if (element.questionName === "" || element.fieldName === "" || element.questionName === (index + 1)) {
                errorMessage = errorMessage + (index + 1) + ",";
            }

            if(element.fieldTypeID=="6" || element.fieldTypeID=="7" || element.fieldTypeID=="32"){
                if(element.groupGUID=="string"){
                    errorMessageCompulsory  = errorMessageCompulsory + (index+1) + ",";
                }
            }

            hasDuplicates = this.checkForDuplicates(element.fieldName);
            if (hasDuplicates == true) {
                count1++
            }

        
            
            element.pageGUID = pageGUID;
            element.formPage.name = this.currentPage.name;
        });

        if(errorMessageCompulsory==="Please ensure number "){
            if (errorMessage === "Please ensure number ") {
                if (count1 == 0) {
                    if (errorMessage === "Please ensure number ") {

                        this.spinner.show();
                        this.service.addFieldPerPage(this.formDesign, this.formData.formID, this.currentPage.pageGUID).subscribe(data => {
                            this.formData.publishStatus = 0;
                            this.service.updateDynamicFormDetails(this.formData.formID, this.formData).subscribe(result => {
                                this.formData = result;
                                this.checkStatus();
                                this.spinner.hide();
                                this.getDesignPerPage(pageGUID);
                                this.refreshGroupSectionList();
                                this.showNotification('top', 'center', 'Page fields saved successfully!', '', 'success');
                            });
                        }, error => {
                            this.showNotification('top', 'center', 'Error saving page fields, please try again', '', 'danger');
                            this.spinner.hide();
                        });
                    }
                }
                else {
                    errorMessage = "Database name must be unique";
                    this.formDesign.forEach((element, index) => {
                        element.pageGUID = "pageGUID";
                    });
                    this.showNotification('top', 'center', errorMessage, '', 'danger');
                }
            }
            else {
                errorMessage = errorMessage + " form field/s have question name/s, database name/s on the form before saving";
                this.formDesign.forEach((element, index) => {
                    element.pageGUID = "pageGUID";
                });
                this.showNotification('top', 'center', errorMessage, '', 'danger');
            }
        }
        else{
            errorMessageCompulsory = errorMessageCompulsory + " form field/s has been given a name/s and added before saving the entire form";
            this.formDesign.forEach((element, index) => {
                element.pageGUID = "pageGUID";
            });
            this.showNotification('top', 'center', errorMessageCompulsory, '', 'danger');
        }
    }

    addSection(item: any, i: any) {
        let obj = {
            "groupGUID": "string",
            "name": item.group.name,
            "isRequired": true,
            "pageGUID": this.currentPage.pageGUID,
            "parentGroupID": 0,
            "type": "section",
            "isActive": true
        }
        this.spinner.show();
        this.service.addGroupOrSection(obj, this.currentPage.pageGUID).subscribe(data => {
            this.formDesign[i].groupGUID = JSON.parse(JSON.stringify(data)).groupGUID;
            this.formDesign[i].questionName = JSON.parse(JSON.stringify(data)).name;
                this.showNotification('top', 'center', 'Section saved successfully!', '', 'success');
                this.refreshGroupSectionList();
                this.spinner.hide();
        },
            error => {
                this.showNotification('top', 'center', 'Error saving section, please try again', '', 'danger');
                this.spinner.hide();
            });
    }

    addGroup(item: any, i: any) {
        let obj = {
            "groupGUID": "string",
            "name": item.group.name,
            "isRequired": true,
            "pageGUID": this.currentPage.pageGUID,
            "parentGroupID": 0,
            "type": "repeatgroup",
            "isActive": true
        }
        this.spinner.show();
        this.service.addGroupOrSection(obj, this.currentPage.pageGUID).subscribe(data => {
            this.formDesign[i].groupGUID = JSON.parse(JSON.stringify(data)).groupGUID;
            this.formDesign[i].questionName = JSON.parse(JSON.stringify(data)).name;
                this.showNotification('top', 'center', 'Group saved successfully!', '', 'success');
                this.refreshGroupSectionList();
                this.spinner.hide();
        },
            error => {
                this.showNotification('top', 'center', 'Error saving group, please try again', '', 'danger');
                this.spinner.hide();
            });
    }

    addQuestionGroup(item: any, i: any) {
        let obj = {
            "groupGUID": "string",
            "name": item.group.name,
            "isRequired": true,
            "pageGUID": this.currentPage.pageGUID,
            "parentGroupID": 0,
            "type": "group",
            "isActive": true
        }
        this.spinner.show();
        this.service.addGroupOrSection(obj, this.currentPage.pageGUID).subscribe(data => {
            this.formDesign[i].groupGUID = JSON.parse(JSON.stringify(data)).groupGUID;
            this.formDesign[i].questionName = JSON.parse(JSON.stringify(data)).name;
                this.showNotification('top', 'center', 'Question group saved successfully!', '', 'success');
                this.refreshGroupSectionList();
                this.spinner.hide();
        },
            error => {
                this.showNotification('top', 'center', 'Error saving question group, please try again', '', 'danger');
                this.spinner.hide();
            });
    }

    previewPage() {
        Swal.fire({
            title: 'Are you sure want to go to save the page and preview the form ?',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            toast: true,
            position: 'top',
            allowOutsideClick: false,
            confirmButtonColor: '#000000',
            cancelButtonColor: '#000000'
        }).then((result) => {
            if (result.value) {
                var errorMessage = "Please ensure number ";
                var count = 0;
                var count1 = 0;
                let hasDuplicates: Boolean = false;
                this.formDesign.forEach((element, index) => {

                    if (element.isDisplayable !== false && this.currentPage.name == "Page 1") {
                        count++;
                    }

                    if (element.questionName === "" || element.fieldName === "" || element.questionName === (index + 1)) {
                        errorMessage = errorMessage + (index + 1) + ",";
                    }

                    hasDuplicates = this.checkForDuplicates(element.fieldName);
                    if (hasDuplicates == true) {
                        count1++
                    }
                    element.pageGUID = this.currentPage.pageGUID;
                    element.formPage.name = this.currentPage.name;
                });

                if (errorMessage === "Please ensure number ") {
                    if (this.currentPage.name === "Page 1" && count == 2) {
                        if (count1 == 0) {
                            if (errorMessage === "Please ensure number ") {
                                this.spinner.show();
                                this.service.addFieldPerPage(this.formDesign, this.formData.formID, this.currentPage.pageGUID).subscribe(data => {
                                    this.formData.publishStatus = 0;
                                    this.service.updateDynamicFormDetails(this.formData.formID, this.formData).subscribe(result => {
                                        this.formData = result;
                                        this.checkStatus();
                                        this.spinner.hide();
                                        localStorage.setItem('formPreviewDetails', JSON.stringify(this.formData));
                                        const dialogRef = this.dialog.open(FormPreviewComponent, {
                                            width: '85%',
                                            height: '85%',
                                            disableClose: true
                                        });
                                        dialogRef.afterClosed().subscribe(result => {
                                            console.log('The dialog was closed');
                                        });
                                    });
                                },
                                    error => {
                                        this.showNotification('top', 'center', 'Error saving page fields, please try again before previewing', '', 'danger');
                                        this.spinner.hide();
                                    });
                            }
                        }
                        else {
                            errorMessage = "Database names must be unique";
                            this.showNotification('top', 'center', errorMessage, '', 'danger');
                            this.formDesign.forEach((element, index) => {
                                element.pageGUID = "pageGUID";
                            });
                        }
                    }
                    else if (this.currentPage.name !== "Page 1") {
                        if (count1 == 0) {
                            if (errorMessage === "Please ensure number ") {
                                this.spinner.show();
                                this.service.addFieldPerPage(this.formDesign, this.formData.formID, this.currentPage.pageGUID).subscribe(data => {
                                    this.formData.publishStatus = 0;
                                    this.service.updateDynamicFormDetails(this.formData.formID, this.formData).subscribe(result => {
                                        this.formData = result;
                                        this.checkStatus();
                                        this.spinner.hide();
                                        localStorage.setItem('formPreviewDetails', JSON.stringify(this.formData));
                                        const dialogRef = this.dialog.open(FormPreviewComponent, {
                                            width: '85%',
                                            height: '85%',
                                            disableClose: true
                                        });
                                        dialogRef.afterClosed().subscribe(result => {
                                            console.log('The dialog was closed');
                                        });
                                    });
                                }, error => {
                                    this.showNotification('top', 'center', 'Error saving page fields, please try again', '', 'danger');
                                    this.spinner.hide();
                                });
                            }
                        }
                        else {
                            errorMessage = "Database name must be unique";
                            this.formDesign.forEach((element, index) => {
                                element.pageGUID = "pageGUID";
                            });
                            this.showNotification('top', 'center', errorMessage, '', 'danger');
                        }
                    }
                    else {
                        if (errorMessage === "Please ensure number ") {
                            errorMessage = "Two displayables must be set";
                            this.formDesign.forEach((element, index) => {
                                element.pageGUID = "pageGUID";
                            });
                            this.showNotification('top', 'center', errorMessage, '', 'danger');
                        }
                    }
                }
                else {
                    errorMessage = errorMessage + " form fields have question names, database names on the form before previewing";
                    this.formDesign.forEach((element, index) => {
                        element.pageGUID = "pageGUID";
                    });
                    this.showNotification('top', 'center', errorMessage, '', 'danger');
                }
            }
        })
    }

    closeForm() {
        Swal.fire({
            title: "<h5 style='color:white;font-weight:400'> Are you sure want to close this form? </h5>",
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            toast: true,
            position: 'top',
            allowOutsideClick: false,
            confirmButtonColor: '#000000',
            cancelButtonColor: '#000000',
            background: '#CA0B00'
        }).then((result) => {
            if (result.value) {
                this.service.unlockForm(this.formData.formID, this.formData).subscribe(res => {
                    this.userService.setMenuShow(true);
                    this.route.navigate(['formList']);
                })
            }
        })
    }

    checkForDuplicates(name: any): Boolean {
        let count: number = 0;
        if (name !== "" && name != null) {
            this.formDesign.forEach(element => {
                if (element.fieldName.toLowerCase() === name.toLowerCase() && element.fieldType.value !== 'section' && element.fieldType.value !== 'group' && element.fieldType.value !== 'repeatgroup') {
                    count++;
                }
            });
        }
        if (count > 1) {
            return true;
        }
        else {
            return false;
        }
    }

    copyPage() {
        let data = this.formDesign.filter((el) => {
            return el.fieldType.value !== "PageTitle";
        });
        localStorage.setItem('copiedPage', JSON.stringify(data));
        this.showNotification('top', 'center', 'Page fields copied!', '', 'success');
    }

    pastePage() {
        let data: any[] = JSON.parse(localStorage.getItem('copiedPage') || '{}');
        merge(this.formDesign, data);
        this.showNotification('top', 'center', 'Page fields pasted!', '', 'success');
    }


    //#region SKip rule

    // saveSkipRule(Option: any, Field: any, Condition: any, Value: any, item: any) {
    //     this.spinner.show();
    //     if (Option.value !== "" && Field.value !== "" && Condition.value !== "") {
    //         let obj = {
    //             "showSkip": Option.value,
    //             "allAny": 0,
    //             "field": Field.value,
    //             "condition": Condition.value,
    //             "value": Value.value,
    //             "pageGUID": this.currentPage.pageGUID,
    //             "displayText": "This field will be " + Option.value + " if " + Condition.value + " " + Value.value,
    //             "xmlElementName": item.fieldName
    //         }
    //         this.service.insertSkipLogic(obj).subscribe(res => {
    //             this.showNotification('top', 'center', 'Skip rule saved successfully!', '', 'success');
    //             this.spinner.hide();
    //         });
    //     }
    //     else {
    //         this.showNotification('top', 'center', 'Error saving skip rule, please choose a skip option, field and enter a value before saving', '', 'danger');
    //         this.spinner.hide();
    //     }
    // }

    // deleteSkipRule(Option: any, Field: any, Condition: any, Data: any, item: any) {
    //     this.spinner.show();
    //     let obj = {
    //         "showSkip": "",
    //         "allAny": 0,
    //         "field": "",
    //         "condition": "",
    //         "value": "",
    //         "pageGUID": "",
    //         "displayText": "",
    //         "xmlElementName": ""
    //     }
    //     this.service.DeleteSkipRule(this.currentPage.pageGUID, item.fieldName).subscribe(res => {
    //         this.showNotification('top', 'center', 'Skip rule deleted successfully!', '', 'success');
    //         item.skipRules = obj;
    //         this.spinner.hide();
    //     });
    // }

    // deleteValidationRule(validCondition: any, ValidData: any, ErrorMsg: any, item: any) {
    //     this.spinner.show();
    //     let obj = {
    //         "allAny": 0,
    //         "condition": "",
    //         "value": "",
    //         "errorMessage": "",
    //         "displayText": "",
    //         "pageGUID": "",
    //         "xmlElementName": "",
    //         "field": ""
    //     }
    //     this.service.DeleteAdvancedValidation(this.currentPage.pageGUID, item.fieldName).subscribe(res => {
    //         this.showNotification('top', 'center', 'Validation rule deleted successfully!', '', 'success');
    //         item.validRules = obj;
    //         this.spinner.hide();
    //     });
    // }

    // saveValidationRule(validCondition: any, ValidData: any, ErrorMsg: any, item: any) {
    //     if (validCondition.value !== "" && ValidData.value !== "") {
    //         let obj = {
    //             "allAny": 0,
    //             "condition": validCondition.value,
    //             "value": ValidData.value,
    //             "errorMessage": ErrorMsg.value,
    //             "displayText": "This field will be valid when it is" + validCondition.value + " " + ValidData.value,
    //             "pageGUID": this.currentPage.pageGUID,
    //             "xmlElementName": item.fieldName,
    //             "field": item.fieldName
    //         }
    //         this.service.insertAdvancedValidation(obj).subscribe(res => {
    //             this.showNotification('top', 'center', 'Validation rule saved successfully!', '', 'success');
    //             this.spinner.hide();
    //         });
    //     }
    //     else {
    //         this.showNotification('top', 'center', 'Error saving skip rule, please choose a validation option enter a value before saving', '', 'danger');
    //         this.spinner.hide();
    //     }
    // }

    //#endregion
    
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

    //auto populate other fields
    populateNames(item: any) {
        if (!isNaN(item.xmlElementName.charAt(0)) && item.xmlElementName!=""){ 
            this.showNotification('top', 'center', 'Friendly Name cannot start with a number', '', 'danger');
            item.dataExportName="";
            item.xmlElementName="";
            item.fieldName="";
        }
        else{
            item.xmlElementName = item.xmlElementName.replace(/\s/g, "").replace(/[^a-zA-Z0-9]/g, "").substring(0, 100);
            item.fieldName = item.xmlElementName.replace(/\s/g, "").replace(/[^a-zA-Z0-9]/g, "_").substring(0, 100);
            item.dataExportName = item.xmlElementName.replace(/\s/g, "").replace(/[^a-zA-Z0-9]/g, "_").substring(0, 100);
        }
        // item.xmlElementName=item.questionName.replace(/[^a-zA-Z0-9]\s/g, "_").substring(0,100);
    }

    //Remove blank space when pasting field name and and data export name
    removeBlankSpaceFieldName(atom: any) {
        atom.fieldName = atom.fieldName.replace(/\s/g, "");
        if (!isNaN(atom.fieldName.charAt(0)) && atom.fieldName!==""){ 
            this.showNotification('top', 'center', 'Database name cannot start with a number', '', 'danger');
            atom.dataExportName="";
            atom.xmlElementName="";
            atom.fieldName="";
        }
        else if(atom.fieldName==""){
            this.showNotification('top', 'center', 'Database name cannot be empty', '', 'danger');
        }
    }

    removeBlankSpaceDataExportName(item: any) {
        item.dataExportName = item.dataExportName.replace(/\s/g, "");
        if (!isNaN(item.dataExportName.charAt(0)) && item.dataExportName!==""){ 
            this.showNotification('top', 'center', 'Export name cannot start with a number', '', 'danger');
            item.dataExportName="";
            item.xmlElementName="";
            item.fieldName="";
        }
        else if(item.dataExportName==""){
            this.showNotification('top', 'center', 'Export Name cannot be empty', '', 'danger');
        }
    }


    //Date validation
    validateDateFriendlyName(item: any) {
        // if(item.xmlElementName.toLowerCase()==="date"){
        //     item.xmlElementName=item.xmlElementName.replace(item.xmlElementName, "");
        //     this.showNotification('top', 'center', 'Friendly name cannot be date', '', 'danger');
        // }
    }

    validateDateFieldName(item: any) {
        if (item.fieldName.toLowerCase() === "date") {
            item.fieldName = item.fieldName.replace(item.fieldName, "");
            this.showNotification('top', 'center', 'Database name cannot be date', '', 'danger');
        }
    }

    validateDateDataExportName(item: any) {
        if (item.dataExportName.toLowerCase() === "date") {
            item.dataExportName = item.dataExportName.replace(item.dataExportName, "");
            this.showNotification('top', 'center', 'Data export Name cannot be date', '', 'danger');
        }
    }

    //Time validation
    validateTimeFriendlyName(item: any) {
        // if(item.xmlElementName.toLowerCase()==="time"){
        //     item.xmlElementName=item.xmlElementName.replace(item.xmlElementName, "");
        //     this.showNotification('top', 'center', 'Friendly name cannot be time', '', 'danger');
        // }
    }

    validateTimeFieldName(item: any) {
        if (item.fieldName.toLowerCase() === "time") {
            item.fieldName = item.fieldName.replace(item.fieldName, "");
            this.showNotification('top', 'center', 'Database name cannot be time', '', 'danger');
        }
    }

    validateTimeDataExportName(item: any) {
        if (item.dataExportName.toLowerCase() === "time") {
            item.dataExportName = item.dataExportName.replace(item.dataExportName, "");
            this.showNotification('top', 'center', 'Data export name cannot be time', '', 'danger');
        }
    }

    onKeyUp(item:any){
    //     let length = boxInput.value.length ;
    //     let isnumber=isNaN(parseInt(boxInput.value));
    //     if(length>0 && isnumber==false){   
    //       console.log("error");
    //       boxInput.value=""; 
    //       this.showNotification('top', 'center', 'Upload name cannot start with a number', '', 'danger');
    //    }
    
    }
}
