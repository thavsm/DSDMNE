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
declare var $: any;

@Component({
    selector: 'app-form-designer',
    templateUrl: './form-designer.component.html',
    styleUrls: ['./form-designer.component.css']
})
export class FormDesignerComponent implements OnInit {

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

    types: any[];

    sectionList: any = [];

    groupSectionList: any[];

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
                    "cssClass": "linear-gradient(147deg, #eff3f7 72%, #00f7ff 28%)"
                }
            ],
            "fieldValidations": [
                {
                    "fieldValidationID": 0,
                    "dataLength": 50,
                    "isEditable": true,
                    "isRequired": false,
                    "isHidden": false,
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
                    "cssClass": "linear-gradient(147deg, #eff3f7 72%, #00f7ff 28%)"
                }
            ],
            "fieldValidations": [
                {
                    "fieldValidationID": 0,
                    "dataLength": 50,
                    "isEditable": true,
                    "isRequired": false,
                    "isHidden": false,
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
                    "cssClass": "linear-gradient(147deg, #eff3f7 72%, #00d9ff 28%)"
                }
            ],
            "fieldValidations": [
                {
                    "fieldValidationID": 0,
                    "dataLength": 50,
                    "isEditable": true,
                    "isRequired": false,
                    "isHidden": false,
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
            "fieldType": {
                "fieldTypeID": 5,
                "displayName": "Select(one/many)",
                "description": "unfold_more",
                "value": "lexicon data"
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
                    "cssClass": "linear-gradient(147deg, #eff3f7 72%, #9ff1ff 28%)"
                }
            ],
            "fieldValidations": [
                {
                    "fieldValidationID": 0,
                    "dataLength": 50,
                    "isEditable": true,
                    "isRequired": false,
                    "isHidden": false,
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

    fields: any[] = [];

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

    constructor(public dialog: MatDialog,private route: Router, private service: FormbuilderService, private spinner: NgxSpinnerService,private userService:UserService) {
        this.formData = JSON.parse(localStorage.getItem('formDesignInfo') || '{}');
    }

    ngOnInit(): void {
        this.spinner.show();
        this.refreshPageList();
        this.types = this.fieldTypes;
        this.spinner.hide();
        if(this.formData.isLocked===true){
            this.userService.setMenuShow(false);
        }
        this.publishStatus = 0;
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
            title: 'Are you sure want to remove this field?',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            toast: true,
            position: 'top',
            allowOutsideClick: false,
            confirmButtonColor: '#000000',
            cancelButtonColor: '#000000',
            background: '#ffcccb'
        }).then((result) => {
            if (result.value) {
                if (i > -1) {
                    if (this.formDesign[i].pageGUID === "pageGUID") {
                        this.formDesign.splice(i, 1);
                        this.fields = this.updateCalculationFieldList();
                        this.showNotification('top', 'center', 'The fields has been deleted Successfully!', 'Success.', 'success');
                    }
                    else {
                        this.formDesign[i].isActive = 'false';
                        this.showNotification('top', 'center', 'The fields has been deleted Successfully!', 'Success.', 'success');
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
        this.service.PublishForm(this.formData.formID).subscribe(res =>{
            if(res==="Form published Successfully!")
            {
                this.showNotification('top', 'center', res, 'Success.', 'success');
                this.spinner.hide();
            }
            else{
                this.showNotification('top', 'center', res, 'Error.', 'danger');
            }
        });
    }

    viewPage(i: any, page: any) {
        Swal.fire({
            title: 'Are you sure want to go to ' + page.name + '?',
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
                this.formDesign.forEach((element, index) => {
                    if (element.isDisplayable !== false && this.currentPage.name == "Page 1") {
                        count++;
                    }

                    if (element.questionName == "") {
                        errorMessage = errorMessage + (index + 1) + ",";
                    }

                    // if (element.fieldType.value === "subSection") {
                    //     element.fieldName = "ua_group_" + (element.questionName).split(/\s/).join('');
                    // }
                    // else {
                    //     element.fieldName = "ua_" + (element.questionName).split(/\s/).join('');
                    // }

                    element.pageGUID = this.currentPage.pageGUID;
                    element.formPage.name = this.currentPage.name;
                });
                if (errorMessage === "Please ensure number ") {
                    if (this.currentPage.name === "Page 1") {
                        if (errorMessage === "Please ensure number ") {
                            this.spinner.show();
                            this.service.addFieldPerPage(this.formDesign, this.formData.formID, this.currentPage.pageGUID).subscribe(data => {
                                this.formDesign = [];
                                this.getDesignPerPage(page.pageGUID);
                                this.currentPage = page;
                                this.refreshGroupSectionList();
                            });
                        }
                    }
                    else if (this.currentPage.name !== "Page 1") {
                        if (errorMessage === "Please ensure number ") {
                            this.spinner.show();
                            this.service.addFieldPerPage(this.formDesign, this.formData.formID, this.currentPage.pageGUID).subscribe(data => {
                                this.formDesign = [];
                                this.getDesignPerPage(page.pageGUID);
                                this.currentPage = page;
                                this.refreshGroupSectionList();

                            });
                        }
                    }
                    else {
                        if (errorMessage === "Please ensure number ") {
                            errorMessage = "Please ensure two displayables are set on the form before going to another page"
                        }
                        else {
                            errorMessage = errorMessage + " form fields have question names and that two displayables are set on the form before going to another page";
                        }
                        this.showNotification('top', 'center', errorMessage, 'Error.', 'danger');
                    }
                }
                else {
                    errorMessage = errorMessage + " form fields have question names and that two displayables are set on the form before saving";
                    this.showNotification('top', 'center', errorMessage, 'Error.', 'danger');
                }
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
                    "cssClass": "linear-gradient(147deg, #eff3f7 72%, #028ea7 28%)"
                }
            ],
            "fieldValidations": [
                {
                    "fieldValidationID": 0,
                    "dataLength": 50,
                    "isEditable": true,
                    "isRequired": false,
                    "isHidden": false,
                }
            ]
        }]
        this.spinner.show();
        this.service.addFormPage(val).subscribe(data => {
            this.service.addFieldPerPage(pageField, this.formData.formID, JSON.parse(JSON.stringify(data)).pageGUID).subscribe(val => {
                this.refreshPageList();
                this.spinner.hide();
                this.showNotification('top', 'center', 'Page Added Successfully!', 'Success.', 'success');
            },
                error => {
                    this.showNotification('top', 'center', 'Error saving page, please try again', 'Error.', 'danger');
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
                title: 'Are you sure you want to delete ' + page.name + ' and its fields?',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                toast: true,
                position: 'top',
                allowOutsideClick: false,
                confirmButtonColor: '#000000',
                cancelButtonColor: '#000000',
                background: '#ffcccb'
            }).then((result) => {
                if (result.value) {
                    this.spinner.show();
                    page.isActive = false;
                    this.service.deleteFormPage(page.pageGUID, page).subscribe(data => {
                        this.spinner.hide();
                        this.refreshPageList();
                        this.showNotification('top', 'center', 'The Page and its Fields has Deleted Successfully!', 'Success.', 'success');
                    },
                        error => {
                            this.showNotification('top', 'center', 'Error deleting page and its field, please try again', 'Error.', 'danger');
                            this.spinner.hide();
                        });
                }
            })
        }
        else {
            this.showNotification('top', 'center', 'You cannot delete the first page of the form', 'Error.', 'danger');
        }

    }

    drop(event: any) {
        //re-orders list
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
                                "cssClass": "linear-gradient(147deg, #eff3f7 72%, #00f7ff 28%)"
                            }
                        ],
                        "fieldValidations": [
                            {
                                "fieldValidationID": 0,
                                "dataLength": 50,
                                "isEditable": true,
                                "isRequired": false,
                                "isHidden": false,
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
                                "cssClass": "linear-gradient(147deg, #eff3f7 72%, #00f7ff 28%)"
                            }
                        ],
                        "fieldValidations": [
                            {
                                "fieldValidationID": 0,
                                "dataLength": 50,
                                "isEditable": true,
                                "isRequired": false,
                                "isHidden": false,
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
                                "cssClass": "linear-gradient(147deg, #eff3f7 72%, #00d9ff 28%)"
                            }
                        ],
                        "fieldValidations": [
                            {
                                "fieldValidationID": 0,
                                "dataLength": 50,
                                "isEditable": true,
                                "isRequired": false,
                                "isHidden": false,
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
                        "fieldType": {
                            "fieldTypeID": 5,
                            "displayName": "Select(one/many)",
                            "description": "unfold_more",
                            "value": "lexicon data"
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
                                "cssClass": "linear-gradient(147deg, #eff3f7 72%, #9ff1ff 28%)"
                            }
                        ],
                        "fieldValidations": [
                            {
                                "fieldValidationID": 0,
                                "dataLength": 50,
                                "isEditable": true,
                                "isRequired": false,
                                "isHidden": false,
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
                            }
                        ]
                    }
                ];
            }
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
            var questionGroup:any=[];

            sections = data.filter(item => item.type === 'section');
            groups = data.filter(item => item.type === 'repeatgroup');
            questionGroup=data.filter(item=>item.type === 'group');

            if(questionGroup.length>0){
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

    getDesignPerPage(pageGUID: any) {
        this.spinner.show();
        this.service.getFormFieldsPerPage(this.formData.formID, pageGUID).subscribe(data => {
            this.formDesign = data;
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
            this.showNotification('top', 'center', 'Please select a field/operation before adding to calculation!', 'Error.', 'danger');
        }
    }

    clearCalc(i: any) {
        this.formDesign[i].calculation = "";
        this.fieldOperatorList = this.fields;
        this.operationField = "Select a field";
    }

    saveDesignPerPage(pageGUID: any) {
        var errorMessage = "Please ensure number ";
        var count = 0;

        this.formDesign.forEach((element, index) => {
            if (element.isDisplayable !== false && this.currentPage.name == "Page 1") {
                count++;
            }

            if (element.questionName === "" || element.fieldName === "" || element.questionName === (index + 1)) {
                errorMessage = errorMessage + (index + 1) + ",";
            }

            // if (element.fieldType.value === "subSection") {
            //     element.fieldName = "ua_group_" + (element.questionName).split(/\s/).join('');
            // }
            // else {
            //     element.fieldName = "ua_" + (element.questionName).split(/\s/).join('');
            // }

            element.pageGUID = pageGUID;
            element.formPage.name = this.currentPage.name;
        });

        if (errorMessage === "Please ensure number ") {
            //&& count === 2
            if (this.currentPage.name === "Page 1") {
                if (errorMessage === "Please ensure number ") {
                    this.spinner.show();
                    this.service.addFieldPerPage(this.formDesign, this.formData.formID, this.currentPage.pageGUID).subscribe(data => {
                        this.showNotification('top', 'center', 'Page Fields Saved Successfully!', 'Success.', 'success');
                        this.spinner.hide();
                        this.getDesignPerPage(pageGUID);
                        this.refreshGroupSectionList();
                    },
                        error => {
                            this.showNotification('top', 'center', 'Error saving page fields, please try again', 'Error.', 'danger');
                            this.spinner.hide();
                        });
                }
            }
            else if (this.currentPage.name !== "Page 1") {
                if (errorMessage === "Please ensure number ") {
                    this.spinner.show();
                    this.service.addFieldPerPage(this.formDesign, this.formData.formID, this.currentPage.pageGUID).subscribe(data => {
                        this.spinner.hide();
                        this.getDesignPerPage(pageGUID);
                        this.refreshGroupSectionList();
                        this.showNotification('top', 'center', 'Page Fields Saved Successfully!', 'Success.', 'success');
                    }, error => {
                        this.showNotification('top', 'center', 'Error saving page fields, please try again', 'Error.', 'danger');
                        this.spinner.hide();
                    });
                }
            }
            else {
                if (errorMessage === "Please ensure number ") {
                    errorMessage = "Please ensure two displayables are set on the form before saving"
                }
                else {
                    errorMessage = errorMessage + " form fields have question names,database names and that two displayables are set on the form before saving";
                }
                this.showNotification('top', 'center', errorMessage, 'Error.', 'danger');
            }
        }
        else {
            errorMessage = errorMessage + " form fields have question names,database names and that two displayables are set on the form before saving";
            this.showNotification('top', 'center', errorMessage, 'Error.', 'danger');
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
            this.refreshGroupSectionList();
            this.spinner.hide();
            this.showNotification('top', 'center', 'Section Saved Successfully!', 'Success.', 'success');
        },
            error => {
                this.showNotification('top', 'center', 'Error saving section, please try again', 'Error.', 'danger');
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
            this.refreshGroupSectionList();
            this.spinner.hide();
            this.showNotification('top', 'center', 'Group Saved Successfully!', 'Success', 'success');
        },
            error => {
                this.showNotification('top', 'center', 'Error saving group, please try again', 'Error.', 'danger');
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
            this.showNotification('top', 'center', 'Group Saved Successfully!', 'Success', 'success');
            this.refreshGroupSectionList();
            this.spinner.hide();
        },
            error => {
                this.showNotification('top', 'center', 'Error saving group, please try again', 'Error.', 'danger');
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
                this.formDesign.forEach((element, index) => {
                    if (element.isDisplayable !== false && this.currentPage.name == "Page 1") {
                        count++;
                    }

                    if (element.questionName == "") {
                        errorMessage = errorMessage + (index + 1) + ",";
                    }

                    // if (element.fieldType.value === "subSection") {
                    //     element.fieldName = "ua_group_" + (element.questionName).split(/\s/).join('');
                    // }
                    // else {
                    //     element.fieldName = "ua_" + (element.questionName).split(/\s/).join('');
                    // }

                    element.pageGUID = this.currentPage.pageGUID;
                    element.formPage.name = this.currentPage.name;
                });

                if (errorMessage === "Please ensure number ") {
                    if (this.currentPage.name === "Page 1" && count === 2) {
                        if (errorMessage === "Please ensure number ") {
                            this.spinner.show();
                            this.service.addFieldPerPage(this.formDesign, this.formData.formID, this.currentPage.pageGUID).subscribe(data => {
                                let myObj = {
                                    formID: this.formData.formID,
                                    formName: this.formData.formName,
                                    displayName: this.formData.displayName,
                                    formCaptureID: 0,
                                    state: 'add'
                                };
                                this.spinner.hide();
                                localStorage.setItem('formPreviewDetails', JSON.stringify(myObj));
                                const dialogRef = this.dialog.open(FormPreviewComponent, {
                                    width: '85%',
                                    height: '85%',
                                    disableClose: true
                                });
                                dialogRef.afterClosed().subscribe(result => {
                                    console.log('The dialog was closed');
                                });
                            }, error => {
                                this.showNotification('top', 'center', 'Error previewing page, please try again', 'Error.', 'danger');
                                this.spinner.hide();
                            });
                        }
                    }
                    else if (this.currentPage.name !== "Page 1") {
                        if (errorMessage === "Please ensure number ") {
                            this.spinner.show();
                            this.service.addFieldPerPage(this.formDesign, this.formData.formID, this.currentPage.pageGUID).subscribe(data => {
                                let myObj = {
                                    formID: this.formData.formID,
                                    formName: this.formData.formName,
                                    displayName: this.formData.displayName,
                                    formCaptureID: 0,
                                    state: 'add'
                                };
                                this.spinner.hide();
                                localStorage.setItem('formPreviewDetails', JSON.stringify(myObj));
                                const dialogRef = this.dialog.open(FormPreviewComponent, {
                                    width: '85%',
                                    height: '85%',
                                    disableClose: true
                                });
                                dialogRef.afterClosed().subscribe(result => {
                                    console.log('The dialog was closed');
                                });
                            }, error => {
                                this.showNotification('top', 'center', 'Error previewing page, please try again', 'Error.', 'danger');
                                this.spinner.hide();
                            });
                        }
                    }
                    else {
                        if (errorMessage === "Please ensure number ") {
                            errorMessage = "Please ensure two displayables are set on the form before previewing"
                        }
                        else {
                            errorMessage = errorMessage + " form fields have question names and that two displayables are set on the form before saving";
                        }
                        this.showNotification('top', 'center', errorMessage, 'Error.', 'danger');
                    }
                }
                else {
                    errorMessage = errorMessage + " form fields have question names and that two displayables are set on the form before pr";
                    this.showNotification('top', 'top', errorMessage, 'Error.', 'danger');
                }
            }
        })
    }

    closeForm(){
        Swal.fire({
            title: 'Are you sure you want to close this form?',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            toast: true,
            position: 'top',
            allowOutsideClick: false,
            confirmButtonColor: '#000000',
            cancelButtonColor: '#000000',
            background: '#ffcccb'
        }).then((result) => {
            if (result.value) {
                this.service.unlockForm(this.formData.formID,this.formData).subscribe(res=>{
                    this.userService.setMenuShow(true);
                    this.route.navigate(['formList']);
                })   
            }
        })
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
