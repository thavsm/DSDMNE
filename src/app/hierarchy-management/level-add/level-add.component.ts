import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
  
import {NgxSpinner, NgxSpinnerService} from 'ngx-spinner';
import { merge } from 'jquery';
import * as moment from 'moment';
import { TreediagramService } from 'src/app/treediagram.service';
declare var $: any;



@Component({
  selector: 'app-level-add',
  templateUrl: './level-add.component.html',
  styleUrls: ['./level-add.component.css']
})
export class LevelAddComponent implements OnInit {

  submitted = false;
  levelAdd: any;
  levels: any;
  nodefields: any;
  Roles:any=[];
  UserfieldTypes: any=[];
  treeData: any;
  divListValue: boolean  = false;
  divLengthValidation: boolean  = false;
  divLengthReportUrl : boolean  = false;
  LevelData: any;
  isSubmitBtnDisabled: boolean= true;
  LevelfieldCompulsory: any;
  AttributesDataExportName: any=[];

  constructor(public dialogRef: MatDialogRef<LevelAddComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private service: TreediagramService, public formBuilder: FormBuilder,private spinner: NgxSpinnerService) 
    { 
      this.levelAdd = data;    
      this.treeData = JSON.parse(localStorage.getItem('treeData') || '{}');      
    }

    levelID: number = 0;
    role: string = "";
    levelName: string = "";
    levelDescription: string = "";
    fieldName: string = "";
    fieldQuestion: string = "";
    fieldDescription: string = "";
    fieldXML: string = "";
    fieldTypeID: any;
    Tooltip: string = "";
    fieldCompulsory: any;
    levelfieldName   = "";
    listValue  = ""; 
    ReportUrl  = "";
    
  
  ngOnInit(): void {

    this.levelID = this.levelAdd.levelID;
    this.role = this.levelAdd.role;
    this.levelName = this.levelAdd.levelName;
    this.levelDescription = this.levelAdd.levelDescription;
    this.fieldName = this.levelAdd.fieldName;
    this.fieldQuestion = this.levelAdd.fieldQuestion;
    this.fieldXML = this.levelAdd.fieldXML;
    this.fieldTypeID = this.levelAdd.fieldTypeID;
    this.Tooltip = this.levelAdd.Tooltip;
    this.fieldCompulsory = this.levelAdd.fieldCompul;
    this.levelfieldName = this.levelAdd.levelfieldName;
    this.listValue = this.levelAdd.listValue;
    this.ReportUrl = this.levelAdd.ReportUrl;
    // this.getRoles();
    this.getUserfieldTypes();
  }

  // getRoles(){
  //   this.spinner.show();   
  //   this.service.getRoles().subscribe(data => {
  //        this.Roles = data;
  //        this.spinner.hide();
  //   });
  // }

  getUserfieldTypes(){
    this.spinner.show();   
    this.service.getUserfieldTypes().subscribe(data => {
         this.UserfieldTypes = data;
         this.spinner.hide();
    });
  }

  onUserfieldTypesChange(ob) {    
    //this.getNodes(ob.value, ob.index);
    if (ob.value == "Date") {

      this.divListValue = false;
      this.divLengthValidation = false;
      this.divLengthReportUrl = false;     

    }else if (ob.value == "List") {

      this.divListValue = true;
      this.divLengthValidation = false;
      this.divLengthReportUrl = false;   

    }else if (ob.value == "Number") {

      this.divListValue = false;
      this.divLengthValidation = true;
      this.divLengthReportUrl = false;   

    }else if (ob.value == "Text") {

      this.divListValue = false;
      this.divLengthValidation = true;
      this.divLengthReportUrl = false;   

    }else if (ob.value == "External Data") {     

      this.divListValue = false;
      this.divLengthValidation = false;
      this.divLengthReportUrl = true;   

    }else if (ob.value == "Attachment") {

      this.divListValue = false;
      this.divLengthValidation = false;
      this.divLengthReportUrl = false;  

    }else if (ob.value == "Target") {

      this.divListValue = false;
      this.divLengthValidation = false;
      this.divLengthReportUrl = false;  

    }else if (ob.value == "URL") {

      this.divListValue = false;
      this.divLengthValidation = false;
      this.divLengthReportUrl = false;  

    }
  }

  addDefaultAttributes() {

    this.LevelData = JSON.parse(localStorage.getItem('LevelData') || '{}');

    var Nameval = {
      "MetadataLevelID": 0,
      "Friendlyname": "Name",
      "Description": "Name",
      "DataExportName": "Name",
      "RecognitionType": "Text",
      "Tooltip": "",
      "alert": "",
      "Compulsory": 1,
      "LengthValidation": "",
      "LevelID": this.LevelData.levelID,
      "QuestionName": "Name",
      "HasChildren": "0",
      "ListValue": "",
      "WarehouseName": "",
      "Value": 0,
      "CalculationText": "",
      "CriteriaColumn": "",
      "CriteriaRow": "",
      "Status": 1,
      "ReportUrl": ""
    };

    var Descriptionval = {
      "MetadataLevelID": 0,
      "Friendlyname": "Description",
      "Description": "Description",
      "DataExportName": "Description",
      "RecognitionType": "Text",
      "Tooltip": "",
      "alert": "",
      "Compulsory": 1,
      "LengthValidation": "",
      "LevelID": this.LevelData.levelID,
      "QuestionName": "Description",
      "HasChildren": "0",
      "ListValue": "",
      "WarehouseName": "",
      "Value": 0,
      "CalculationText": "",
      "CriteriaColumn": "",
      "CriteriaRow": "",
      "Status": 1,
      "ReportUrl": ""
    };

    this.service.addLevelAttributes(Nameval).subscribe(res => {});
    this.service.addLevelAttributes(Descriptionval).subscribe(res => {});

  }
  addAttributes() {

    this.LevelData = JSON.parse(localStorage.getItem('LevelData') || '{}');
    this.service.getAttributesDataExportName(this.levelAdd.fieldName.replace(/\s/g, ""), this.LevelData.levelID).subscribe(data => { 
      this.AttributesDataExportName = data;
      if(typeof this.AttributesDataExportName !== "undefined" && this.AttributesDataExportName.length === 0){

        if (this.levelAdd.fieldName != "" && this.levelAdd.fieldQuestion != "" && this.levelAdd.levelfieldName != "") {
          this.submitted = true;

          if(this.levelAdd.fieldCompulsory == true){
            this.LevelfieldCompulsory = 1;
          }if(this.levelAdd.fieldCompulsory == false){
            this.LevelfieldCompulsory = 0;
          }
    
          var val = {        
            "MetadataLevelID": 0,
            "Friendlyname": this.levelAdd.fieldName,
            "Description": this.levelAdd.fieldDescription,
            "DataExportName": this.levelAdd.fieldName.replace(/\s/g, ""),
            "RecognitionType": this.levelAdd.levelfieldName,
            "Tooltip": this.levelAdd.Tooltip,
            "alert": "",
            "Compulsory": this.LevelfieldCompulsory,
            "LengthValidation": this.levelAdd.lengthValidation,
            "LevelID": this.LevelData.levelID,
            "QuestionName": this.levelAdd.fieldQuestion,
            "HasChildren": "0",
            "ListValue": this.levelAdd.listValue,
            "WarehouseName": "",
            "Value": 0,
            "CalculationText":  "",
            "CriteriaColumn": "",
            "CriteriaRow":  "",
            "Status": 1,
            "ReportUrl": this.levelAdd.ReportUrl
          };
          this.spinner.show();
          this.service.addLevelAttributes(val).subscribe(res => {
          this.dialogRef.close();
          this.spinner.hide();
          this.showNotification('top', 'center', 'level Attributes Added Successfully!', 'Success', 'success');
          
          this.levelAdd.ReportUrl = "";
          this.levelAdd.fieldName = "";
          this.levelAdd.fieldDescription = "";
          this.levelAdd.Tooltip = "";
          this.levelAdd.lengthValidation = "";
          this.levelAdd.fieldQuestion = "";
          this.levelAdd.listValue = "";
          this.levelAdd.ReportUrl = "";

          this.divListValue = false;
          this.divLengthValidation = false;
          this.divLengthReportUrl = false;  

          });
        }else {
          this.showNotification('top','center','Please enter a Field Name, Question Name and Field Type before saving!','','danger');
        }
  
      }else {
        this.showNotification('top','center','Please enter a Unique Field Name!','','danger');
      }
     });   
  }

  addLevel() {
    if (this.levelAdd.levelName != "") {
      //adding form
      const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';
      this.submitted = true;
      var val = {        
        "levelID": 0,
        "levelName": this.levelAdd.levelName,
        "levelDescription": this.levelAdd.levelDescription,
        "treeID": this.treeData.treeID,
        "status": "1"
      };
      this.spinner.show();
      this.service.addLevel(val).subscribe(res => {
        //this.dialogRef.close();
        this.spinner.hide();
        this.showNotification('top', 'center', 'level Added Successfully!', 'Success', 'success');   
        localStorage.setItem('LevelData', JSON.stringify(res));   
        this.addDefaultAttributes(); 
        this.levelID = this.levelAdd.levelID;
        //this.levelAdd.levelName ="";
        //this.levelAdd.levelDescription ="";
        this.isSubmitBtnDisabled = false;
      });
    }
    else {
      this.showNotification('top', 'center', 'Please add a level name before saving!', '', 'danger');
    }
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
