import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
  
import {NgxSpinner, NgxSpinnerService} from 'ngx-spinner';
import { merge } from 'jquery';
import * as moment from 'moment';
import { TreediagramService } from 'src/app/treediagram.service';
import Swal from 'sweetalert2'
declare var $: any;


@Component({
  selector: 'app-level-node-edit',
  templateUrl: './level-node-edit.component.html',
  styleUrls: ['./level-node-edit.component.css']
})
export class LevelNodeEditComponent implements OnInit {

  submitted = false;
  NodeData: any;
  NodeAttributesData: any;
  levels: any;
  nodes: any;
  nodefields: any;
  Roles:any=[];
  UserfieldTypes: any=[];
  treeData: any;
  divListValue: boolean  = false;
  divAddAtrributes: boolean  = true;
  divEditAtrributes: boolean  = false;
  divLengthValidation: boolean  = false;
  divLengthReportUrl : boolean  = false;
  LevelData: any;
  isSubmitBtnDisabled: boolean= false;
  LevelfieldCompulsory: any;
  verticalPosition: any;
  horizontalPosition: any;
  varDataExportName: any;
  p: number = 1;
  AttributesDataExportName: any=[];
  collection: any[] | any;
  NodeAdd: any=[];
  formDesign: any = [];

  constructor(public dialogRef: MatDialogRef<LevelNodeEditComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    public service: TreediagramService, public formBuilder: FormBuilder,private spinner: NgxSpinnerService) 
    { 
      this.NodeData = data;     
      this.treeData = JSON.parse(localStorage.getItem('treeData') || '{}');   

      this.NodeAttributesData = {
        alert: "",
        calculationText: "",
        compulsory: 0,
        criteriaColumn: "",
        criteriaRow: "",
        dataExportName: "",
        description: "",
        friendlyname: "",
        hasChildren: "0",
        lengthValidation: "",
        levelID: 0,
        listValue: "",
        metadataLevelID: 0,
        questionName: "",
        recognitionType: "",
        reportUrl: "",
        status: "",
        tooltip: "",
        value: 0,
        warehouseName: ""
      }
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
    this.levelID = this.NodeData.levelID;
    this.role = this.NodeData.role;
    this.levelName = this.NodeData.levelName;
    this.levelDescription = this.NodeData.levelDescription;
    this.fieldName = this.NodeData.fieldName;
    this.fieldQuestion = this.NodeData.fieldQuestion;
    this.fieldXML = this.NodeData.fieldXML;
    this.fieldTypeID = this.NodeData.fieldTypeID;
    this.Tooltip = this.NodeData.Tooltip;
    this.fieldCompulsory = this.NodeData.fieldCompul;
    this.levelfieldName = this.NodeData.levelfieldName;
    this.listValue = this.NodeData.listValue;
    this.ReportUrl = this.NodeData.ReportUrl;
    // this.getRoles();
    this.getUserfieldTypes();
    this.getLevels();
    this.getNodes();
    this.getNodeAttributes(this.NodeData.levelID);
    this.service.getLevelMetadata(this.NodeData.levelID);
  }

  public gridData: any = this.service.getLevelMetadata(this.levelID);

  // getRoles(){
  //   this.spinner.show();   
  //   this.service.getRoles().subscribe(data => {
  //        this.Roles = data;
  //        this.spinner.hide();
  //   });
  // }

  
  splitString(text:string):any[]
  {
    let values = text.split(";");
    let obj2: any = [];
    values.forEach(listV => {
      let obj = {
        name: listV,
        value: listV
      }
      obj2.push(obj);
    });
    return obj2;
  }

  
  OpenTargets(){ 
    
  }
   
  OpenExternalData(){ 
    
  }
  
  getLevels(){ 
    this.service.getLevelsList(this.treeData.treeID).subscribe(data => {
         this.levels = data;
    });
  }

  getNodeAttributes(NodelevelID : any){ 
    this.service.getNodeAttributes(NodelevelID).subscribe(data => {
         this.formDesign = data;

         this.formDesign.forEach((element, index) => {

          if (element.listValue !== "") {
            this.formDesign[index].listValue = this.splitString(element.listValue);
          }
        });  
    });
  }
  getNodes(){
    this.spinner.show();
    this.service.getNodesLevelID(this.levelID).subscribe(data => {
      this.nodes = data;       
  });   
  }


  ShowHide(Type: any){

    if (Type == "Date") {

      this.divListValue = false;
      this.divLengthValidation = false;
      this.divLengthReportUrl = false;     

    }else if (Type == "List") {

      this.divListValue = true;
      this.divLengthValidation = false;
      this.divLengthReportUrl = false;   

    }else if (Type == "Number") {

      this.divListValue = false;
      this.divLengthValidation = true;
      this.divLengthReportUrl = false;   

    }else if (Type == "Text") {

      this.divListValue = false;
      this.divLengthValidation = true;
      this.divLengthReportUrl = false;   

    }else if (Type == "External Data") {     

      this.divListValue = false;
      this.divLengthValidation = false;
      this.divLengthReportUrl = true;   

    }else if (Type == "Attachment") {

      this.divListValue = false;
      this.divLengthValidation = false;
      this.divLengthReportUrl = false;  

    }else if (Type == "Target") {

      this.divListValue = false;
      this.divLengthValidation = false;
      this.divLengthReportUrl = false;  

    }else if (Type == "URL") {

      this.divListValue = false;
      this.divLengthValidation = false;
      this.divLengthReportUrl = false;  

    }

  }
  onUserfieldTypesChange(ob) {    
    this.ShowHide(ob.value);
  }

  
  saveAttributes() {
 
    if (this.NodeAttributesData.friendlyname != "" && this.NodeAttributesData.questionName != "" && this.NodeAttributesData.recognitionType != "") {
      this.submitted = true;

      if(this.NodeAttributesData.compulsory == true){
        this.LevelfieldCompulsory = 1;
      }if(this.NodeAttributesData.compulsory == false){
        this.LevelfieldCompulsory = 0;
      }

      var val = {        
        "MetadataLevelID": this.NodeAttributesData.metadataLevelID,
        "Friendlyname": this.NodeAttributesData.friendlyname,
        "Description": this.NodeAttributesData.description,
        "DataExportName": this.varDataExportName,
        "RecognitionType": this.NodeAttributesData.recognitionType,
        "Tooltip": this.NodeAttributesData.tooltip,
        "alert": "",
        "Compulsory": this.LevelfieldCompulsory,
        "LengthValidation": this.NodeAttributesData.lengthValidation,
        "LevelID": this.NodeData.levelID,
        "QuestionName": this.NodeAttributesData.questionName,
        "HasChildren": "0",
        "ListValue": this.NodeAttributesData.listValue,
        "WarehouseName": "",
        "Value": 0,
        "CalculationText":  "",
        "CriteriaColumn": "",
        "CriteriaRow":  "",
        "Status": 1,
        "ReportUrl": this.NodeAttributesData.reportUrl
      };
      this.spinner.show();
      this.service.updateLevelAttributes(this.NodeAttributesData.metadataLevelID, val).subscribe(res => {
      this.spinner.hide();
      this.showNotification('top', 'center', 'level Attributes Updated Successfully!', 'Success', 'success');   
      this.service.getLevelMetadata(this.NodeData.levelID);
      this.getNodeAttributes(this.NodeData.levelID);
      });
    }else {
      this.showNotification('top','center','Please enter a Field Name, Question Name and Field Type before saving!','','danger');
    }
  }

  getUserfieldTypes(){
    this.spinner.show();   
    this.service.getUserfieldTypes().subscribe(data => {
         this.UserfieldTypes = data;
         this.spinner.hide();
    });
  }

  clickDelete(item: any) {
    Swal.fire({
      title: 'Are you sure you want to delete ' + item.friendlyname + ' tree?',
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
          this.showNotification('top','center','Atrribute Deleted Succesfully!','Success.','success');
          this.service.getLevelMetadata(this.NodeData.levelID)
        });
      }
    })
  }

  clickEdit(item: any) {
    this.NodeAttributesData = item;
    this.varDataExportName = item.dataExportName;
    this.ShowHide(item.recognitionType);

    this.divAddAtrributes = false;
    this.divEditAtrributes = true;
  }

  addAttributes() {

    this.service.getAttributesDataExportName(this.NodeAttributesData.friendlyname.replace(/\s/g, ""), this.NodeData.levelID).subscribe(data => {
      this.AttributesDataExportName = data;

      if(typeof this.AttributesDataExportName !== "undefined" && this.AttributesDataExportName.length === 0){

        if (this.NodeAttributesData.friendlyname != "" && this.NodeAttributesData.questionName != "" && this.NodeAttributesData.recognitionType != "") {
          this.submitted = true;
    
          if(this.NodeAttributesData.compulsory == true){
            this.LevelfieldCompulsory = 1;
          }if(this.NodeAttributesData.compulsory == false){
            this.LevelfieldCompulsory = 0;
          }
    
          var val = {        
            "MetadataLevelID": 0,
            "Friendlyname": this.NodeAttributesData.friendlyname,
            "Description": this.NodeAttributesData.description,
            "DataExportName": this.NodeAttributesData.friendlyname.replace(/\s/g, ""),
            "RecognitionType": this.NodeAttributesData.recognitionType,
            "Tooltip": this.NodeAttributesData.tooltip,
            "alert": "",
            "Compulsory": this.LevelfieldCompulsory,
            "LengthValidation": this.NodeAttributesData.lengthValidation,
            "LevelID": this.NodeData.levelID,
            "QuestionName": this.NodeAttributesData.questionName,
            "HasChildren": "0",
            "ListValue": this.NodeAttributesData.listValue,
            "WarehouseName": "",
            "Value": 0,
            "CalculationText":  "",
            "CriteriaColumn": "",
            "CriteriaRow":  "",
            "Status": 1,
            "ReportUrl": this.NodeAttributesData.reportUrl
          };
          this.spinner.show();
          this.service.addLevelAttributes(val).subscribe(res => {
          this.spinner.hide();
          this.showNotification('top', 'center', 'level Attributes Added Successfully!', 'Success', 'success');   
          this.service.getLevelMetadata(this.NodeData.levelID);
          this.getNodeAttributes(this.NodeData.levelID);
          });
        }else {
          this.showNotification('top','center','Please enter a Field Name, Question Name and Field Type before saving!','','danger');
        }
      }else {
        this.showNotification('top','center','Please enter a Unique Field Name!','','danger');
      }  
    });
  }

  
  editLevel() {

    if (this.NodeData.levelName != "") {
      //updating form
      this.submitted = true;
      // stop here if form is invalid
      var val = {
        "levelID": this.NodeData.levelID,
        "levelName": this.NodeData.levelName,
        "levelDescription": this.NodeData.levelDescription,
        "treeID": this.treeData.treeID,
        "status": "1"
      };
      this.spinner.show();
      this.service.updateLevelDetails(this.NodeData.levelID, val).subscribe(res => {
        this.spinner.hide();
        this.showNotification('top','center','Level Updated Successfully!','Success','success');
      });
    }
    else {
      this.showNotification('top','center','Please add a Level name before saving!','','danger');
    }
  }

  addForm(){
    
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
