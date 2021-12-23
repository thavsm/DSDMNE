import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem } from '@angular/cdk/drag-drop';
import { FormbuilderService } from '../shared/formbuilder.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { merge } from 'jquery';
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
            "displayName": "DD-MM-YY"
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
            "fieldType": {
                "fieldTypeID": 22,
                "displayName": "Alpha Numeric",
                "description": "title",
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
                    "width": 0,
                    "height": 0,
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
            "fieldTypeID": 16,
            "pageGUID": "pageGUID",
            "fieldName": "",
            "questionName": "",
            "isDisplayable": false,
            "toolTip": "",
            "parentFieldName": "",
            "childFieldName": "",
            "listValue": "",
            "calculation": "",
            "groupGUID": "",
            "isLocked": false,
            "lockedByUserID": 0,
            "meetAllCustomValidationConditions": true,
            "dateCreated": "2021-12-01T12:32:22.006Z",
            "createdByUserID": 0,
            "dateLastModified": "2021-12-01T12:32:22.006Z",
            "lastModifiedByUserID": 0,
            "isActive": true,
            "fieldType": {
                "fieldTypeID": 16,
                "displayName": "Attachment",
                "description": "attach_file",
                "value": "attachment"
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
                "type": "string"
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
                    "width": 0,
                    "height": 0,
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
                "type": "string"
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
                    "width": 0,
                    "height": 0,
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
                "type": "string"
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
                    "width": 0,
                    "height": 0,
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
                "type": "string"
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
                    "width": 0,
                    "height": 0,
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
                    "width": 0,
                    "height": 0,
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
                "type": "string"
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
                    "width": 0,
                    "height": 0,
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
                "type": "string"
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
                    "width": 0,
                    "height": 0,
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
                    "width": 0,
                    "height": 0,
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
                    "width": 0,
                    "height": 0,
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
                "type": "string"
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
                    "width": 0,
                    "height": 0,
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
                "type": "string"
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
                    "width": 0,
                    "height": 0,
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
            "fieldType": {
                "fieldTypeID": 4,
                "displayName": "Text",
                "description": "text_fields",
                "value": "text"
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
                "type": "string"
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
                    "width": 0,
                    "height": 0,
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
                    "width": 0,
                    "height": 0,
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

    constructor(private service: FormbuilderService, private spinner: NgxSpinnerService) {
        this.formData = JSON.parse(localStorage.getItem('formDesignInfo') || '{}');
    }

    ngOnInit(): void {
        this.spinner.show();
        this.refreshPageList();
        this.types = this.fieldTypes;
        this.spinner.hide();
    }

    toggleValue(item: any) {
        this.refreshGroupSectionList();
        if (item.fieldType.value === "calculation") {
            if (item.calculation !== undefined && item.calculation !== "" && item.calculation !== "undefined") {
                alert(item.calculation);
                var lastChar = (item.calculation).charAt((item.calculation).length - 1);
                alert(lastChar);
                if (lastChar !== '+' || lastChar !== '-' || lastChar !== '/' || lastChar !== '*') {
                    this.fieldOperatorList = this.operators;
                    this.operationField = "Select an operator";
                }
                else {
                    this.fieldOperatorList = this.updateCalcuationFieldList();
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
            cancelButtonColor: '#000000'
        }).then((result) => {
            if (result.value) {
                if (i > -1) {
                    if (this.formDesign[i].pageGUID === "pageGUID") {
                        this.formDesign.splice(i, 1);
                        this.fields = this.updateCalcuationFieldList();
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
    }

    savePages(i: any) {
        this.autoSaveDesignPerPage(this.currentPage.pageGUID, 0, i);
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
                this.formDesign = [];
                this.savePages(2);
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
        console.log(JSON.stringify(val));
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
                    "width": 0,
                    "height": 0,
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
            });

        });
    }

    updateCalcuationFieldList(): any[] {
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
                cancelButtonColor: '#000000'
            }).then((result) => {
                if (result.value) {
                    this.spinner.show();
                    page.isActive = false;
                    this.service.deleteFormPage(page.pageGUID, page).subscribe(data => {
                        this.spinner.hide();
                        this.refreshPageList();
                        this.showNotification('top', 'center', 'The Page and its Fields has Deleted Successfully!', 'Success.', 'success');
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
        if (event.previousContainer === event.container && event.container.data !== this.fieldTypes) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            console.log(JSON.stringify(event.container.data));
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex,
            );
            this.fields = [];
            this.fieldOperatorList = this.updateCalcuationFieldList();
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
                    "fieldType": {
                        "fieldTypeID": 22,
                        "displayName": "Alpha Numeric",
                        "description": "title",
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
                            "width": 0,
                            "height": 0,
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
                    "fieldTypeID": 16,
                    "pageGUID": "pageGUID",
                    "fieldName": "",
                    "questionName": "",
                    "isDisplayable": false,
                    "toolTip": "",
                    "parentFieldName": "",
                    "childFieldName": "",
                    "listValue": "",
                    "calculation": "",
                    "groupGUID": "",
                    "isLocked": false,
                    "lockedByUserID": 0,
                    "meetAllCustomValidationConditions": true,
                    "dateCreated": "2021-12-01T12:32:22.006Z",
                    "createdByUserID": 0,
                    "dateLastModified": "2021-12-01T12:32:22.006Z",
                    "lastModifiedByUserID": 0,
                    "isActive": true,
                    "fieldType": {
                        "fieldTypeID": 16,
                        "displayName": "Attachment",
                        "description": "attach_file",
                        "value": "attachment"
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
                        "type": "string"
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
                            "width": 0,
                            "height": 0,
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
                        "type": "string"
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
                            "width": 0,
                            "height": 0,
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
                        "type": "string"
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
                            "width": 0,
                            "height": 0,
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
                        "type": "string"
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
                            "width": 0,
                            "height": 0,
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
                            "width": 0,
                            "height": 0,
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
                        "type": "string"
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
                            "width": 0,
                            "height": 0,
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
                        "type": "string"
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
                            "width": 0,
                            "height": 0,
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
                            "width": 0,
                            "height": 0,
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
                            "width": 0,
                            "height": 0,
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
                        "type": "string"
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
                            "width": 0,
                            "height": 0,
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
                        "type": "string"
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
                            "width": 0,
                            "height": 0,
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
                    "fieldType": {
                        "fieldTypeID": 4,
                        "displayName": "Text",
                        "description": "text_fields",
                        "value": "text"
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
                        "type": "string"
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
                            "width": 0,
                            "height": 0,
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
                            "width": 0,
                            "height": 0,
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
                    "name": "No Group",
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
                    "name": "No Group",
                    "isRequired": true,
                    "pageGUID": "string",
                    "parentGroupID": 0,
                    "type": "string",
                    "isActive": true
                  }
            ];
            var sections: any = [];
            var groups: any = [];

            sections = data.filter(item => item.type === 'section');
            groups = data.filter(item => item.type === 'repeatgroup');
            if (groups.length > 0) {
                merge(this.groupSectionList, groups);
            }
            if (sections.length > 0) {
                merge(this.sectionList, sections);
                merge(this.groupSectionList,sections);
            }
        });
    }

    getDesignPerPage(pageGUID: any) {
        this.spinner.show();
        this.service.getFormFieldsPerPage(this.formData.formID, pageGUID).subscribe(data => {
            this.formDesign = data;
            this.fieldOperatorList = this.updateCalcuationFieldList();
            this.spinner.hide();
        });
    }

    autoSaveDesignPerPage(pageGUID: any, isDeleted: any, i: any) {
        this.formDesign.forEach((element) => {
            element.pageGUID = pageGUID;
            element.formPage.name = this.currentPage.name;
            element.group.name = "group name";
        });
    }

    addCalc(item: any) {
        alert(this.value.data);
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
            this.showNotification('top', 'center', 'Please select a field/opertion before adding to calculation!', 'Error.', 'danger');
        }
    }

    clearCalc(i: any) {
        this.formDesign[i].calculation = "";
        this.fieldOperatorList = this.fields;
        this.operationField = "Select a field";
    }

    saveDesignPerPage(pageGUID: any) {
        var errorMessage = "Please ensure number ";
        this.formDesign.forEach((element, index) => {
            if (element.questionName == "") {
                errorMessage = errorMessage + (index + 1) + ",";
            }

            if (element.fieldType.value === "subSection") {
                element.fieldName = "ua_group_" + (element.questionName).split(/\s/).join('');
            }
            else {
                element.fieldName = "ua_" + (element.questionName).split(/\s/).join('');
            }
            
            element.pageGUID = pageGUID;
            element.formPage.name = this.currentPage.name;
        });
        if (errorMessage === "Please ensure number ") {
            this.spinner.show();
            this.service.addFieldPerPage(this.formDesign, this.formData.formID, pageGUID).subscribe(data => {
                this.spinner.hide();
                this.getDesignPerPage(pageGUID);
                this.showNotification('top', 'center', 'Page fields have been saved Successfully!', 'Success.', 'success');
            });
        }
        else {
            errorMessage = errorMessage + " form fields have question names before saving";
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
            this.formDesign[i].GroupGUID = JSON.parse(JSON.stringify(data)).groupGUID;
            this.formDesign[i].questionName = JSON.parse(JSON.stringify(data)).name;
            this.refreshGroupSectionList();
            this.spinner.hide();
            this.showNotification('top', 'center', 'Section Saved Successfully!', 'Success.', 'success');
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
            this.spinner.hide();
            this.showNotification('top', 'center', 'Group Saved Successfully!', 'Success', 'success');
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
