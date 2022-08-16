import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {FormControl} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {NgxSpinner, NgxSpinnerService} from 'ngx-spinner';
import { merge } from 'jquery';
import * as moment from 'moment';
import Swal from 'sweetalert2'
import { TreediagramService } from 'src/app/treediagram.service';
declare var $: any;


interface Options {
  value: string;
  text: string;
}

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
  divAddAtrributes: boolean = true;
  divEditAtrributes: boolean = false;
  LevelData: any;
  isSubmitBtnDisabled: boolean= true;
  LevelfieldCompulsory: any;
  divAttr: boolean= false;
  divLevelAdd: boolean= true;
  divLevelEdit: boolean= false;
  divGridAttr: boolean= false;
  AttributesDataExportName: any=[];
  LevelsList: any=[];
  thEdit: boolean  = true;
  thDelete: boolean  = true;

  Option: Options[] = [
    {value: '1', text: 'True'},
    {value: '0', text: 'False'}
  ];

  constructor(public dialogRef: MatDialogRef<LevelAddComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    public service: TreediagramService, public formBuilder: FormBuilder,private spinner: NgxSpinnerService ) 
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
    this.levelAdd.isIndicator = "";
    // this.getRoles();
    this.getUserfieldTypes();
    this.getLevels();
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

  DisableEditandDelete(item: any): Boolean {

    if (item.friendlyname == "Name" || item.friendlyname == "Description") {
      return false
    }
    else {
      return true
    }
  }

  clickDeleteAtrribute(item: any) {
    Swal.fire({
      title: 'Are you sure you want to delete ' + item.friendlyname + ' Atrribute?',
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
        this.service.archiveAttributes(item.metadataLevelID).subscribe(data => {
          this.spinner.hide();
          this.showNotification('top', 'center', 'Atrribute Deleted Succesfully!', 'Success.', 'success');
          this.service.getLevelMetadata(this.levelAdd.levelID)
        });
      }
    })
  }


  clickEdit(item: any) {
    this.levelAdd.levelName = item.levelName;
    this.levelAdd.levelDescription = item.levelDescription;
    this.levelAdd.isIndicator = item.isIndicatorLevel;
    this.levelAdd.levelID = item.levelID;
    this.divLevelAdd = false;
    this.divLevelEdit = true;
    this.divGridAttr = true;
    this.divAttr= true;
    this.service.getLevelMetadata(item.levelID);    
  }

  saveAttributes() {

    if (this.levelAdd.fieldName != "" && this.levelAdd.fieldQuestion != "" && this.levelAdd.levelfieldName != "") {
      this.submitted = true;

      if(this.levelAdd.fieldCompulsory == true){
        this.LevelfieldCompulsory = 1;
      }if(this.levelAdd.fieldCompulsory == false){
        this.LevelfieldCompulsory = 0;
      }

      var val = {
        "MetadataLevelID": this.levelAdd.metadataLevelID,
        "Friendlyname": this.levelAdd.fieldName,
        "Description": this.levelAdd.fieldDescription,
        "DataExportName": this.levelAdd.fieldName.replace(/\s/g, ""),
        "RecognitionType": this.levelAdd.levelfieldName,
        "Tooltip": this.levelAdd.Tooltip,
        "alert": "",
        "Compulsory": this.LevelfieldCompulsory,
        "LengthValidation": this.levelAdd.lengthValidation,
        "LevelID": this.levelAdd.levelID,
        "QuestionName": this.levelAdd.fieldQuestion,
        "HasChildren": "0",
        "ListValue": this.levelAdd.listValue,
        "WarehouseName": "",
        "Value": 0,
        "CalculationText": "",
        "CriteriaColumn": "",
        "CriteriaRow": "",
        "Status": 1,
        "ReportUrl": this.levelAdd.ReportUrl
      };
      this.spinner.show();
      this.service.updateLevelAttributes(this.levelAdd.metadataLevelID, val).subscribe(res => {
        this.spinner.hide();
        this.showNotification('top', 'center', 'level Attributes Updated Successfully!', '', 'success');
        this.service.getLevelMetadata(this.levelAdd.levelID);
        //this.getNodeAttributes(this.NodeData.levelID);

        this.levelAdd.ReportUrl = "";
        this.levelAdd.fieldName = "";
        this.levelAdd.fieldDescription = "";
        this.levelAdd.Tooltip = "";
        this.levelAdd.lengthValidation = "";
        this.levelAdd.fieldQuestion = "";
        this.levelAdd.listValue = "";
        this.levelAdd.ReportUrl = "";
        this.levelAdd.levelfieldName = "";
        this.divListValue = false;
        this.divLengthValidation = false;
        this.divLengthReportUrl = false;  
        this.divAddAtrributes = true;
        this.divEditAtrributes = false; 
      });
    } else {
      this.showNotification('top', 'center', 'Please enter a Field Name, Question Name and Field Type before saving!', '', 'danger');
    }
  }



  clickEditAttritubes(item: any) {
    // this.NodeAttributesData = item;
    // this.varDataExportName = item.dataExportName;

    this.levelAdd.fieldName = item.friendlyname;
    this.levelAdd.fieldQuestion = item.questionName;
    this.levelAdd.fieldDescription = item.description;
    this.levelAdd.fieldXML = item.friendlyname;
    this.levelAdd.levelfieldName = item.recognitionType;
    this.levelAdd.listValue = item.listValue;
    this.levelAdd.lengthValidation = item.lengthValidation;
    this.levelAdd.ReportUrl = item.reportUrl;
    this.levelAdd.Tooltip = item.tooltip;
    this.levelAdd.fieldCompulsory = item.compulsory;
    this.levelAdd.metadataLevelID = item.metadataLevelID;
    this.ShowHide(item.recognitionType);

    this.divAddAtrributes = false;
    this.divEditAtrributes = true;
  }

  ShowHide(Type: any) {

    if (Type == "Date") {

      this.divListValue = false;
      this.divLengthValidation = false;
      this.divLengthReportUrl = false;

    } else if (Type == "List") {

      this.divListValue = true;
      this.divLengthValidation = false;
      this.divLengthReportUrl = false;

    } else if (Type == "Number") {

      this.divListValue = false;
      this.divLengthValidation = true;
      this.divLengthReportUrl = false;

    } else if (Type == "Text") {

      this.divListValue = false;
      this.divLengthValidation = true;
      this.divLengthReportUrl = false;

    } else if (Type == "External Data") {

      this.divListValue = false;
      this.divLengthValidation = false;
      this.divLengthReportUrl = true;

    } else if (Type == "Attachment") {

      this.divListValue = false;
      this.divLengthValidation = false;
      this.divLengthReportUrl = false;

    } else if (Type == "Target") {

      this.divListValue = false;
      this.divLengthValidation = false;
      this.divLengthReportUrl = false;

    } else if (Type == "URL") {

      this.divListValue = false;
      this.divLengthValidation = false;
      this.divLengthReportUrl = false;

    }

  }

  editLevel() {

    if (this.levelAdd.levelName != "") {

      if (this.levelAdd.isIndicator != "") {
      //updating form
      this.submitted = true;
      // stop here if form is invalid
      var val = {
        "levelID": this.levelAdd.levelID,
        "levelName": this.levelAdd.levelName,
        "levelDescription":  this.levelAdd.levelDescription,
        "treeID": this.treeData.treeID,
        "status": "1",
        "isIndicatorLevel": this.levelAdd.isIndicator
      };
      this.spinner.show();
      this.service.updateLevelDetails(this.levelAdd.levelID, val).subscribe(res => {
        this.spinner.hide();
        this.levelID = this.levelAdd.levelID;
        this.levelAdd.levelName ="";
        this.levelAdd.levelDescription ="";
        this.levelAdd.levelName ="";
        this.levelAdd.isIndicator ="";
        this.isSubmitBtnDisabled = false;
        this.divLevelAdd = true;
        this.divLevelEdit = false;
        this.divGridAttr = false;
        this.divAttr = false;
        this.getLevels();
        this.showNotification('top', 'center', 'Level Updated Successfully!', '', 'success');
      });

      }else {
        this.showNotification('top', 'center', 'Please select level type before saving!', '', 'danger');
      }
    }
    else {
      this.showNotification('top', 'center', 'Please add a Level name before saving!', '', 'danger');
    }
  }

  
  clickDelete(item: any) {
    Swal.fire({
      title: 'Are you sure you want to delete Level?',
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
        this.service.DeleteLevel(item.levelID).subscribe(data => {
          this.spinner.hide();
          this.showNotification('top', 'center', 'Level Deleted Succesfully!', 'Success.', 'success');
        });
      }
    })
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

  closePopup() {
    this.dialogRef.close();
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
      "LevelID": this.levelAdd.levelID,
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
      "LevelID": this.levelAdd.levelID,
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

    if(this.levelAdd.isIndicator == 0){

      this.service.addLevelAttributes(Nameval).subscribe(res => {});
      this.service.addLevelAttributes(Descriptionval).subscribe(res => {});

    }else{
      this.service.addLevelIndicatorAttributes(this.LevelData.levelID).subscribe(res=>{},error => {
       console.log(error)
    });

    }

  }
  addAttributes() {

    this.LevelData = JSON.parse(localStorage.getItem('LevelData') || '{}');
    this.service.getAttributesDataExportName(this.levelAdd.fieldName.replace(/\s/g, ""), this.levelAdd.levelID).subscribe(data => { 
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
            "LevelID": this.levelAdd.levelID,
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
          // this.dialogRef.close();
          this.spinner.hide();
          this.showNotification('top', 'center', 'level Attributes Added Successfully!', '', 'success');
          
          this.levelAdd.ReportUrl = "";
          this.levelAdd.fieldName = "";
          this.levelAdd.fieldDescription = "";
          this.levelAdd.Tooltip = "";
          this.levelAdd.lengthValidation = "";
          this.levelAdd.fieldQuestion = "";
          this.levelAdd.listValue = "";
          this.levelAdd.ReportUrl = "";
          this.levelAdd.levelfieldName = "";
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


  getLevels(){
    this.spinner.show();   
    this.service.getLevelsList(this.treeData.treeID).subscribe(data => {
         this.LevelsList =  data;
         this.spinner.hide();
    });
  }

  addLevel() {
    if (this.levelAdd.levelName != "") {
      if (this.levelAdd.isIndicator != "") {

        //adding form
        const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';
        this.submitted = true;
        var val = {
          "levelID": 0,
          "levelName": this.levelAdd.levelName,
          "levelDescription": this.levelAdd.levelDescription,
          "treeID": this.treeData.treeID,
          "status": "1",
          "isIndicatorLevel": this.levelAdd.isIndicator
        };
        this.spinner.show();
        this.service.addLevel(val).subscribe(res => {
          //this.dialogRef.close();
          this.spinner.hide();
          this.showNotification('top', 'center', 'level Added Successfully!', '', 'success');
          localStorage.setItem('LevelData', JSON.stringify(res));
          this.addDefaultAttributes();
          this.getLevels();
          this.levelID = this.levelAdd.levelID;
          this.levelAdd.levelName ="";
          this.levelAdd.levelDescription ="";
          this.levelAdd.levelName ="";
          this.levelAdd.isIndicator ="";
          this.isSubmitBtnDisabled = false;
        });

        
        if(this.levelAdd.isIndicator == 0){
          this.divAttr = true;
        }

      } else {
        this.showNotification('top', 'center', 'Please select level type before saving!', '', 'danger');
      }

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
