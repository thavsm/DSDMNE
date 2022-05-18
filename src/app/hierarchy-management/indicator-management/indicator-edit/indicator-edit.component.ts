import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { merge } from 'jquery';
import * as moment from 'moment';
import { TreediagramService } from 'src/app/treediagram.service';
import Swal from 'sweetalert2'
import * as JsonToXML from "js2xmlparser";
import { HierarchyManagementService } from 'src/app/hierarchy-management.service';
declare var $: any;

@Component({
  selector: 'app-indicator-edit',
  templateUrl: './indicator-edit.component.html',
  styleUrls: ['./indicator-edit.component.css']
})
export class IndicatorEditComponent implements OnInit {


  formDesign: any = [];
  IndicatorAdd: any;
  formDesignData: any = [];
  XMLname: string = "";
  XMLdataExportName: string = "";
  formDesignAddData: any;
  EditNodeData: any;
  formDesignAddDataXML: any;

  constructor(public dialog: MatDialog ,public dialogRef: MatDialogRef<IndicatorEditComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    public service: TreediagramService, public Hierarchyservice: HierarchyManagementService, public formBuilder: FormBuilder, private spinner: NgxSpinnerService)  
  {
    this.IndicatorAdd = data;
  }

  ngOnInit(): void {
    this.getIndicatorAttributesData(this.IndicatorAdd.indicatorID);
    this.getIndicatorAttributes();
  }

  getIndicatorAttributesData(IndicatorID: any) {

    this.spinner.show();
    this.Hierarchyservice.getIndicatorAttributesDataByIndicatorID(IndicatorID).subscribe(data => {
      
      this.formDesignData = data;
      this.getIndicatorAttributes();
      this.spinner.hide();
    });
  }

  addForm() {
    
    this.formDesignAddData = {};
    this.EditNodeData = {
      "indicatorID": this.IndicatorAdd.indicatorID,
      "status": "1"
    };

    this.formDesign.forEach(item => {
      for (const [key, value] of Object.entries(item)) {

        if (key === "data") {

          if (item.dataExportName == "Name") {

            this.EditNodeData["indicatorName"] = item.data

          } else if (item.dataExportName == "Description") {

            this.EditNodeData["indicatorDescription"] = item.data
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


    this.formDesignAddDataXML = {
      "indicatorID": this.IndicatorAdd.indicatorID
    }

    if (this.EditNodeData.indicatorName != "" && this.EditNodeData.indicatorName !== undefined) {

      this.spinner.show();
      this.service.UpdateIndicatorNodeByID(this.EditNodeData).subscribe(res => {
        this.spinner.hide();

        this.formDesignAddDataXML["data"] = JsonToXML.parse("Node", this.formDesignAddData);

        this.spinner.show();
        this.service.UpdateMetadataIndicatorForm(this.formDesignAddDataXML).subscribe(res => {
          this.spinner.hide();

          this.showNotification('top', 'center', 'Indicator Updated Form Successfully!', 'Success', 'success');
        });
      });

    } else {
      this.showNotification('top', 'center', 'Please add a Node name before saving!', '', 'danger');
    }

  }
  getIndicatorAttributes() {
    // this.formDesignData = this.getNodeAttributesData(this.NodeID); 
    this.spinner.show();
    this.Hierarchyservice.getMetadataIndicatorLevel().subscribe(data => {
      this.formDesign = data;

      //  this.getNodeAttributesData(this.NodeData.nodeID);

      this.formDesign.forEach((element, index) => {

        if (element.listValue !== "") {
          this.formDesign[index].listValue = this.splitString(element.listValue);
        }

        if (typeof this.formDesignData !== "undefined" && this.formDesignData.length === 0) {

          if (this.formDesign[index].dataExportName == "Name") {

            element["data"] = this.IndicatorAdd.indicatorName;

          } else if (this.formDesign[index].dataExportName == "Description") {

            element["data"] = this.IndicatorAdd.indicatorDescription;

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

            element["data"] = this.IndicatorAdd.indicatorName;

          } else if (this.formDesign[index].dataExportName == "Description") {

            element["data"] =this.IndicatorAdd.indicatorDescription;

          }

          this.formDesignData.forEach(item => {
            for (const [key, value] of Object.entries(item)) {
              if (key == this.XMLname) {
                element["data"] = value;
              }
            }
          }) 
        }
      });

      this.spinner.hide();
    });
  }

  splitString(text: string): any[] {
    let values = text.split(";");
    let obj2: any = [];
    values.forEach(listV => {
      let obj = {
        name: listV.trim(),
        value: listV.trim()
      }
      obj2.push(obj);
    });
    return obj2;
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
