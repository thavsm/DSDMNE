import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { merge } from 'jquery';
import * as moment from 'moment';
import { TreediagramService } from 'src/app/treediagram.service';
import Swal from 'sweetalert2'
import * as JsonToXML from "js2xmlparser";
import { TargetAddComponent } from '../target-add/target-add.component';
import { ExternaldataAddComponent } from '../externaldata-add/externaldata-add.component';

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
  Roles: any = [];
  UserfieldTypes: any = [];
  treeData: any;
  divListValue: boolean = false;
  divAddAtrributes: boolean = true;
  divEditAtrributes: boolean = false;
  divLengthValidation: boolean = false;
  divLengthReportUrl: boolean = false;
  LevelData: any;
  isSubmitBtnDisabled: boolean = false;
  LevelfieldCompulsory: any;
  verticalPosition: any;
  horizontalPosition: any;
  varDataExportName: any;
  p: number = 1;
  AttributesDataExportName: any = [];
  collection: any[] | any;
  NodeAdd: any = [];
  formDesign: any = [];
  formDesignData: any = [];
  formDesignAddData: any;
  EditNodeData: any;
  formDesignAddDataXML: any;
  GetMetadataNodeFormID: any;
  tgAdd: any;
  OpnExternalData: any;
  divLevelButtons : boolean  = true;
  divAtrributes: boolean  = true;
  thEdit: boolean  = true;
  thDelete: boolean  = true;
  tabIndex: number = 1;
  TabNodeEdit: string = "Node Edit";
  TabLevelEdit: string = "Level Edit";
  btnSave : boolean  = true;
  btnDelete: boolean  = true;

  constructor(public dialog: MatDialog ,public dialogRef: MatDialogRef<LevelNodeEditComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    public service: TreediagramService, public formBuilder: FormBuilder, private spinner: NgxSpinnerService) {
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
  NodeID: number = 0;
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
  levelfieldName = "";
  listValue = "";
  ReportUrl = "";
  XMLname: string = "";
  ParentNodeName: string = "";
  nodeName: string = "";
  nodeDescription: string = "";
  XMLdataExportName: string = "";
  nodeParentD: number;

  ngOnInit(): void {
    this.levelID = this.NodeData.levelID;
    this.NodeID = this.NodeData.nodeID;
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
    this.ParentNodeName = this.NodeData.ParentNodeName;
    this.nodeName = this.NodeData.nodeName;
    this.nodeDescription = this.NodeData.nodeDescription;
    this.nodeParentD = this.NodeData.nodeParentD;
    this.getNodeAttributesData(this.NodeData.nodeID);
    // this.getRoles();
    this.getUserfieldTypes();
    this.getLevels();
    this.getNodes();
    this.getNodeAttributes(this.NodeData.levelID);
    this.service.getLevelMetadata(this.NodeData.levelID);
    this.hideEditButtons();
  }

  hideEditButtons(){


    if(this.NodeData.ViewEdit == 1){

      this.divLevelButtons = true;  
      this.divAddAtrributes = true;  
      this.divAtrributes = true;  
      this.thEdit= true;  
      this.thDelete= true;  
      this.TabNodeEdit = "Node Edit";
      this.TabLevelEdit = "Level Edit";
      this.tabIndex = 1;
      this.btnSave= true;  
      this.btnDelete= true;  

    }else if(this.NodeData.ViewEdit == 0){

      this.divLevelButtons = false;  
      this.divAddAtrributes = false; 
      this.divAtrributes = false;  
      this.thEdit= false;  
      this.thDelete= false;  
      this.TabNodeEdit = "Node";
      this.TabLevelEdit = "Level"; 
      this.tabIndex = 1;
      this.btnSave= false;  
      this.btnDelete= false;  
    }

  }
  public gridData: any = this.service.getLevelMetadata(this.levelID);

  // getRoles(){
  //   this.spinner.show();   
  //   this.service.getRoles().subscribe(data => {
  //        this.Roles = data;
  //        this.spinner.hide();
  //   });
  // }


  splitString(text: string): any[] {
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


  OpenTargets() {

    this.tgAdd = {
      targetID:0,
      quaterOne:"",
      quaterTwo:"",
      quaterThree: "",
      quaterFour:"",
      annualTarget: "",
      nodeID: this.NodeData.nodeID,
      financialYear: "",
      financialStartDate: "",
      ViewEdit:this.NodeData.ViewEdit

    }

     let WinHeight = '75%';
     let WinWidth = '55%';

    const dialogRef = this.dialog.open(TargetAddComponent, { width: WinWidth, data: this.tgAdd, disableClose: true }
    );

    dialogRef.afterClosed().subscribe(result => {

      console.log('The dialog was closed');

    });
  }

  OpenExternalData() {

    this.OpnExternalData = {
      nodeID : this.NodeData.nodeID,
      ViewEdit:this.NodeData.ViewEdit
    }


    // let WinHeight = '85%';
    let WinWidth = '65%';


    const dialogRef = this.dialog.open(ExternaldataAddComponent, { width: WinWidth, data: this.OpnExternalData, disableClose: true }
    );

    dialogRef.afterClosed().subscribe(result => {

      console.log('The dialog was closed');

    });

  }

  getLevels() {
    this.service.getLevelsList(this.treeData.treeID).subscribe(data => {
      this.levels = data;
    });
  }

  getNodeAttributesData(NodeID: any) {

    this.service.getNodeAttributesData(NodeID).subscribe(data => {
      this.formDesignData = data;
    });
  }

  
  getNodeAttributes(NodelevelID: any) {
    // this.formDesignData = this.getNodeAttributesData(this.NodeID); 

    this.service.getNodeAttributes(NodelevelID).subscribe(data => {
      this.formDesign = data;

      this.getNodeAttributesData(this.NodeData.nodeID);

      this.formDesign.forEach((element, index) => {

        if (element.listValue !== "") {
          this.formDesign[index].listValue = this.splitString(element.listValue);
        }

        if (typeof this.formDesignData !== "undefined" && this.formDesignData.length === 0) {

          if (this.formDesign[index].dataExportName == "Name") {

            element["data"] = this.NodeData.nodeName;

          } else if (this.formDesign[index].dataExportName == "Description") {

            element["data"] = this.NodeData.nodeDescription;

          } else {

            element["data"] = "";
          }

        } else {

          if (this.formDesign[index].recognitionType == "Date") {
            this.XMLname = "date" + this.formDesign[index].dataExportName

          } else if (this.formDesign[index].recognitionType == "List") {
            this.XMLname = "drp" + this.formDesign[index].dataExportName

          } else if (this.formDesign[index].recognitionType == "Number") {
            this.XMLname = "txt" + this.formDesign[index].dataExportName

          } else if (this.formDesign[index].recognitionType == "Text") {
            this.XMLname = "txt" + this.formDesign[index].dataExportName

          } else if (this.formDesign[index].recognitionType == "External Data") {
            this.XMLname = "upload" + this.formDesign[index].dataExportName

          } else if (this.formDesign[index].recognitionType == "Attachment") {
            this.XMLname = "upload" + this.formDesign[index].dataExportName

          } else if (this.formDesign[index].recognitionType == "Target") {
            this.XMLname = "target" + this.formDesign[index].dataExportName

          } else if (this.formDesign[index].recognitionType == "URL") {
            this.XMLname = "txtDynamic" + this.formDesign[index].dataExportName

          }

          if (this.formDesign[index].dataExportName == "Name") {

            element["data"] = this.NodeData.nodeName;

          } else if (this.formDesign[index].dataExportName == "Description") {

            element["data"] = this.NodeData.nodeDescription;

          }

          this.formDesignData.forEach(item => {
            for (const [key, value] of Object.entries(item)) {
              if (key == this.XMLname) {
                // if (this.XMLname == "txtName") {

                //   element["data"] = this.NodeData.nodeName;

                // } else if (this.XMLname == "txtDescription") {

                //   element["data"] = this.NodeData.nodeDescription;

                // } else {

                  
                // }

                element["data"] = value;
              }
            }
          })
        }
      });
    });
  }
  getNodes() {
    this.spinner.show();
    this.service.getNodesLevelID(this.levelID).subscribe(data => {
      this.nodes = data;
    });
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
  onUserfieldTypesChange(ob) {
    this.ShowHide(ob.value);
  }


  saveAttributes() {

    if (this.NodeAttributesData.friendlyname != "" && this.NodeAttributesData.questionName != "" && this.NodeAttributesData.recognitionType != "") {
      this.submitted = true;

      if (this.NodeAttributesData.compulsory == true) {
        this.LevelfieldCompulsory = 1;
      } if (this.NodeAttributesData.compulsory == false) {
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
        "CalculationText": "",
        "CriteriaColumn": "",
        "CriteriaRow": "",
        "Status": 1,
        "ReportUrl": this.NodeAttributesData.reportUrl
      };
      this.spinner.show();
      this.service.updateLevelAttributes(this.NodeAttributesData.metadataLevelID, val).subscribe(res => {
        this.spinner.hide();
        this.showNotification('top', 'center', 'level Attributes Updated Successfully!', 'Success', 'success');
        this.service.getLevelMetadata(this.NodeData.levelID);
        this.getNodeAttributes(this.NodeData.levelID);

        this.NodeAttributesData.MetadataLevelID = 0;
        this.NodeAttributesData.friendlyname = " ";
        this.NodeAttributesData.description = " ";
        this.NodeAttributesData.recognitionType = " ";
        this.NodeAttributesData.tooltip = " ";
        this.NodeAttributesData.compulsory = 0;
        this.NodeAttributesData.lengthValidation = " ";
        this.NodeAttributesData.questionName = " ";
        this.NodeAttributesData.listValue = " ";
        this.NodeAttributesData.reportUrl = " ";
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

  getUserfieldTypes() {
    this.spinner.show();
    this.service.getUserfieldTypes().subscribe(data => {
      this.UserfieldTypes = data;
      this.spinner.hide();
    });
  }

  deleteLevel(){

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
        this.service.DeleteLevel(this.NodeData.levelID).subscribe(data => {
          this.spinner.hide();
          this.showNotification('top', 'center', 'Level Deleted Succesfully!', 'Success.', 'success');
        });
      }
    })

  }

  
  deleteNode(){

    Swal.fire({
      title: 'Are you sure you want to delete Node?',
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
        this.service.DeleteNode(this.NodeData.nodeID).subscribe(data => {
          this.spinner.hide();
          this.showNotification('top', 'center', 'Node Deleted Succesfully!', 'Success.', 'success');
        });
      }
    })

    
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
          this.showNotification('top', 'center', 'Atrribute Deleted Succesfully!', 'Success.', 'success');
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

      if (typeof this.AttributesDataExportName !== "undefined" && this.AttributesDataExportName.length === 0) {

        if (this.NodeAttributesData.friendlyname != "" && this.NodeAttributesData.questionName != "" && this.NodeAttributesData.recognitionType != "") {
          this.submitted = true;

          if (this.NodeAttributesData.compulsory == true) {
            this.LevelfieldCompulsory = 1;
          } if (this.NodeAttributesData.compulsory == false) {
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
            "CalculationText": "",
            "CriteriaColumn": "",
            "CriteriaRow": "",
            "Status": 1,
            "ReportUrl": this.NodeAttributesData.reportUrl
          };
          this.spinner.show();
          this.service.addLevelAttributes(val).subscribe(res => {
            this.spinner.hide();
            this.showNotification('top', 'center', 'level Attributes Added Successfully!', 'Success', 'success');
            this.service.getLevelMetadata(this.NodeData.levelID);
            this.getNodeAttributes(this.NodeData.levelID);

            this.NodeAttributesData.MetadataLevelID = 0;
            this.NodeAttributesData.friendlyname = " ";
            this.NodeAttributesData.description = " ";
            this.NodeAttributesData.recognitionType = " ";
            this.NodeAttributesData.tooltip = " ";
            this.NodeAttributesData.compulsory = 0;
            this.NodeAttributesData.lengthValidation = " ";
            this.NodeAttributesData.questionName = " ";
            this.NodeAttributesData.listValue = " ";
            this.NodeAttributesData.reportUrl = " ";
            this.divListValue = false;
            this.divLengthValidation = false;
            this.divLengthReportUrl = false;

            this.divAddAtrributes = true;
            this.divEditAtrributes = false;


          });
        } else {
          this.showNotification('top', 'center', 'Please enter a Field Name, Question Name and Field Type before saving!', '', 'danger');
        }
      } else {
        this.showNotification('top', 'center', 'Please enter a Unique Field Name!', '', 'danger');
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
        this.showNotification('top', 'center', 'Level Updated Successfully!', 'Success', 'success');
      });
    }
    else {
      this.showNotification('top', 'center', 'Please add a Level name before saving!', '', 'danger');
    }
  }

  addForm() {

    this.formDesignAddData = {};
    this.EditNodeData = {
      "nodeID": this.NodeData.nodeID,
      "nodeParentD": this.NodeData.nodeParentD,
      "levelID": this.NodeData.levelID,
      "status": "1"
    };


    this.formDesign.forEach(item => {
      for (const [key, value] of Object.entries(item)) {

        if (key === "data") {

          if (item.dataExportName == "Name") {

            this.EditNodeData["nodeName"] = item.data

          } else if (item.dataExportName == "Description") {

            this.EditNodeData["nodeDescription"] = item.data
          }


          if (item.recognitionType == "Date") {

            this.XMLdataExportName = "date" + item.dataExportName;

          } else if (item.recognitionType == "List") {

            this.XMLdataExportName = "drp" + item.dataExportName;

          } else if (item.recognitionType == "Number") {

            this.XMLdataExportName = "txt" + item.dataExportName;

          } else if (item.recognitionType == "Text") {

            this.XMLdataExportName = "txt" + item.dataExportName;

          } else if (item.recognitionType == "External Data") {

            this.XMLdataExportName = "upload" + item.dataExportName;

          } else if (item.recognitionType == "Attachment") {

            this.XMLdataExportName = "upload" + item.dataExportName;

          } else if (item.recognitionType == "Target") {

            this.XMLdataExportName = "target" + item.dataExportName;

          } else if (item.recognitionType == "URL") {

            this.XMLdataExportName = "txtDynamic" + item.dataExportName;

          }

          this.formDesignAddData[this.XMLdataExportName] = item.data 
          
        }
      }
    })


    if (this.EditNodeData.nodeName != "" && this.EditNodeData.nodeName !== undefined) {
      this.spinner.show();
      this.service.updateNodeDetails(this.EditNodeData.nodeID, this.EditNodeData).subscribe(res => {


        if (typeof this.formDesignData !== "undefined" && this.formDesignData.length !== 0) {

          this.service.GetMetadataNodeFormID(this.NodeData.nodeID).subscribe(data => {
            this.GetMetadataNodeFormID = data;

            this.formDesignAddDataXML = {

              "metadataNodeFormID": this.GetMetadataNodeFormID.filter(item => item)[0],
              "nodeID": this.NodeData.nodeID,
              "status": "1"
  
            }
  
            this.formDesignAddDataXML["data"] = JsonToXML.parse("Node", this.formDesignAddData);
  
            this.service.UpdateNodeXMLForm(this.GetMetadataNodeFormID.filter(item => item)[0], this.formDesignAddDataXML).subscribe(res => {
              this.spinner.hide();
              this.showNotification('top', 'center', 'Node Updated Form Successfully!', 'Success', 'success');
            });
          });

        } else {

          this.formDesignAddDataXML = {

            "metadataNodeFormID": 0,
            "nodeID": this.NodeData.nodeID,
            "status": "1"

          }

          this.formDesignAddDataXML["data"] = JsonToXML.parse("Node", this.formDesignAddData);

          this.service.addNodeXMLForm(this.formDesignAddDataXML).subscribe(res => {
            this.spinner.hide();
            this.showNotification('top', 'center', 'Node Updated Successfully!', 'Success', 'success');
          });
        }
      });
    } else {
      this.showNotification('top', 'center', 'Please add a Node name before saving!', '', 'danger');
    }
    // this.formDesignAddData = this.formDesign;

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
