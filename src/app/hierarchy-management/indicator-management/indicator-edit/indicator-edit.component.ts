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
import { HierarchyFormPreviewComponent } from '../../hierarchy-form-preview/hierarchy-form-preview.component';
import { ExternaldataAddComponent } from '../../externaldata-add/externaldata-add.component';
import { UserService } from 'src/app/shared/user.service';

declare var $: any;

@Component({
  selector: 'app-indicator-edit',
  templateUrl: './indicator-edit.component.html',
  styleUrls: ['./indicator-edit.component.css']
})
export class IndicatorEditComponent implements OnInit {

  ExternalDataType: any=[];
  formDesign: any = [];
  IndicatorAdd: any;
  formDesignData: any = [];
  XMLname: string = "";
  XMLdataExportName: string = "";
  formDesignAddData: any;
  EditNodeData: any;
  formDesignAddDataXML: any;
  NodeData: any;
  Indicators:any=[];
  Preview: any;
  FormCategory: any=[];
  Form: any=[];
  divForm: boolean  = false;
  divFormField: boolean  = false;
  FormFields: any[];
  SelectedForm: any;
  FormFieldsByFieldID: any;
  OpnExternalData: any;
  ExternalData: any;
  divColName: boolean  = false;
  divFormCat: boolean  = false;
  divOperator: boolean  = false;
  divSearchCriteriaCmb: boolean  = false;
  divSearchCriteriaTxt: boolean  = false;
  divSearchCriteriaNmb: boolean  = false;
  divSearchCriteriaDate: boolean  = false;
  divImportTableName: boolean  = false;
  divExternalDataName: boolean  = false;
  divExternalTableDataName: boolean  = false;
  divFTIContorls : boolean  = false;
  divEXTContorls: boolean  = true;
  DataImportUpload: any;
  TableColumns: any;
  Dataservice: any;
  ExternalDataTableName: any;
  SelectedDataServiceID: any;
  dataServiceID: any;
  divEXTForm: boolean  = false;
  divEXTFormField: boolean  = false;
  listCategory: any=[];
  listValues: any=[];
  Calc: number = 0;
  DBCalc: any;
  FormName: any;
  selectedFieldName: any;
  CalcEval: string = "";
  DataVal: string = "";
  CalcAdd: any;
  p: number = 1;
  nodeID: number = 0;
  TotalVal: any;
  CalTotalVal: any;
  isDisabled  : boolean  = false;
  isAddDisabled : boolean  = true;
  ItemCalID: any;
  divAdd: boolean  = true;
  divEdit: boolean  = false;
  divContorls : boolean  = true;
  thEdit: boolean  = true;
  thDelete: boolean  = true;
  IndicatorFormFields: any[];
  divNotForm: boolean  = false;
  divIsForm: boolean  = false;
  divIsFormField: boolean = false;
  divIsFormD: boolean = false;
  ExtData: any[];
  levels: any = [];
  Formfiltered: any[] = [];
  userData: any;
  provID: any;

  constructor(public dialog: MatDialog , public userService : UserService , private Treeservice: TreediagramService, public dialogRef: MatDialogRef<IndicatorEditComponent>,
    @Inject(MAT_DIALOG_DATA) data,
  public service: TreediagramService, public Hierarchyservice: HierarchyManagementService, public formBuilder: FormBuilder, private spinner: NgxSpinnerService)  
  {
    this.IndicatorAdd = data;
    //this.service.getExternalCalculationByNodeID(this.IndicatorAdd.indicatorID);
  }

  ngOnInit(): void {
  
    this.getExternalDataType();

    this.NodeData = {
      indicatorID : 0
    } 
    this.getFormCategory();
    this.getIndicatorAttributesData(this.IndicatorAdd.indicatorID);
    this.getIndicatorAttributes();
    this.getIndicators();
    this.getFormCategory();

    this.service.getTreeUpload().subscribe(data => {
      this.DataImportUpload = data;         
    });

    this.service.getDataService().subscribe(data => {
      this.Dataservice = data;         
    });

    this.getExternalDataType();
    this.getFormCategory();
    this.getLevels();
    this.nodeID = this.IndicatorAdd.indicatorID;
  
    this.ExternalData = {
      name: "",
      formCategoryName : "",
      FormName : "",
      fName : "",
      calculation : "",
      SearchCriteria : "",
      selection : ""
   
    }

    this.ExternalData.SearchCriteria= "";
    this.ExternalData.ArraySearchCriteria = "";
    this.ExternalData.calcVal= "";
    this.ExternalData.column_name = "";

    this.CalTotalVal = {
      total:  ""  
    }

    this.service.getExternalTotalCalculationByNodeID(this.nodeID).subscribe(data => {
      this.TotalVal = data;
      this.CalTotalVal = {
        total:  this.TotalVal[0].totalValue   
      }    
    });


    this.service.getTreeUpload().subscribe(data => {
      this.DataImportUpload = data;         
    });

    this.service.getDataService().subscribe(data => {
      this.Dataservice = data;         
    });

    this.CalcAdd = {
      ViewEdit: 1
    }

    this.hideEditButtons();  
    this.getIndicators();   
    this.setIndicatorFileds();
    this.setExternalData();
  }

  setExternalData() {

    //this.service.getExternalCalculationByNodeID(this.IndicatorAdd.indicatorID);
    this.service.getExternalCalculationByIndicatorID(this.IndicatorAdd.indicatorID).subscribe(data => {
      this.ExtData = data;
      if (typeof data !== 'undefined' && data.length > 0) {

        this.divIsForm = false;
        this.divNotForm = true;    
        this.isDisabled = true;    
        this.ExternalData.name = this.ExtData[0].externalDataTypeID ;
      }  

    });      
  }
  addIndicatorLink() {
    this.spinner.show();  
    if(this.IndicatorAdd.indicatorID != 0){

      if (this.NodeData.FormName != "" && this.NodeData.fName) {

        var Indicatorvalues = {
          "indicatorID": this.IndicatorAdd.indicatorID,
          "tableName": 'Data_' + this.SelectedForm.formName+ "_" + this.FormFieldsByFieldID[0].formPage.name.replace(/\s/g, ""),
          "fieldID": this.NodeData.fName,
          "formID": this.NodeData.FormName        
        };

        this.service.addupdateIndicatorNode(Indicatorvalues).subscribe(data => {
         
        }); 
        this.showNotification('top', 'center', 'Indicator, form field link saved!', '', 'success');
        this.spinner.hide();
      }else {
        this.showNotification('top', 'center', 'Please select a form and form field before saving!', '', 'danger');
        return;
      }
      
    }
  }

  setIndicatorFileds(){
    this.spinner.show();    
    this.service.getIndicatorNode(this.IndicatorAdd.indicatorID).subscribe(data => {

      if (typeof data !== 'undefined' && data.length > 0) {
        this.IndicatorFormFields = data;
        this.divIsForm = true;
        this.divNotForm = false;  
        this.isDisabled = true; 
        this.ExternalData.name = 1003;
        if(this.IndicatorFormFields.length > 0 ){
          this.spinner.show();  
          this.service.GetFormCategoryId(this.IndicatorFormFields[0].formCategoryID).subscribe(data => {  
            this.Form = data;   
            this.userService.getUserProfile().subscribe(UserData => {
              this.userData = UserData['formData'];
              this.provID = this.userData['provinceID'];  
              this.Formfiltered.push(this.Form.find(i => i.locationID === this.provID)); 
              this.spinner.hide();
              this.divIsFormD = true;
            });
            this.SelectedForm = this.Formfiltered.find(i => i.formID === this.IndicatorFormFields[0].formID);
            this.spinner.hide();
            this.divIsFormD = true;
          });
  
          this.spinner.show();
          this.service.GetFormFieldsByFormId(this.IndicatorFormFields[0].formID).subscribe(data => {
            this.FormFields = data;
            this.filteredFormFields = this.FormFields.slice();
            this.spinner.hide();
            this.divIsFormField = true;
          }); 
  
          this.spinner.show();
          this.service.GetFormFieldsByFieldID(this.IndicatorFormFields[0].fieldID).subscribe(data => {
            this.FormFieldsByFieldID = data;
            this.spinner.hide();
          });      
        }

      }  
      this.spinner.hide();
      this.NodeData.indicatorID = this.IndicatorFormFields[0].indicatorID;
      this.NodeData.FormCategory = this.IndicatorFormFields[0].formCategoryID;     
      this.NodeData.FormName = this.IndicatorFormFields[0].formID;
      this.NodeData.fName = this.IndicatorFormFields[0].fieldID;
    }); 
  }

  OpenExternalData() {
    this.OpnExternalData = {
      nodeID : 1,
      ViewEdit:1
    }
    // let WinHeight = '85%';
    let WinWidth = '65%';
    const dialogRef = this.dialog.open(ExternaldataAddComponent, { width: WinWidth, data: this.OpnExternalData, disableClose: true }
    );

    dialogRef.afterClosed().subscribe(result => {

      console.log('The dialog was closed');

    });

  }
  
  
  public filteredIndicators;
  public filteredFormFields;

  getIndicatorAttributesData(IndicatorID: any) {

    this.spinner.show();
    this.Hierarchyservice.getIndicatorAttributesDataByIndicatorID(IndicatorID).subscribe(data => {
      
      this.formDesignData = data;
      this.getIndicatorAttributes();
      this.spinner.hide();
    });
  }


  onEXTformfieldChange(ob) {  

    this.service.GetFormFieldsByFieldID(ob.value).subscribe(data => {
      this.FormFieldsByFieldID = data;

      this.ExternalData.SearchCriteria= "";
      this.ExternalData.ArraySearchCriteria = "";
      if (this.FormFieldsByFieldID[0].fieldTypeID == 5) {

        this.divSearchCriteriaCmb = true;
        this.divSearchCriteriaTxt = false;
        this.divSearchCriteriaNmb = false;
        this.divSearchCriteriaDate= false;
        this.listCategory = this.splitString(this.FormFieldsByFieldID[0].listValue);


      } else if (this.FormFieldsByFieldID[0].fieldTypeID == 13) {

        this.divSearchCriteriaCmb = false;
        this.divSearchCriteriaTxt = false;
        this.divSearchCriteriaNmb = false;
        this.divSearchCriteriaDate= true;


      } else if (this.FormFieldsByFieldID[0].fieldTypeID  == 9) {

        this.divSearchCriteriaCmb = false;
        this.divSearchCriteriaTxt = false;
        this.divSearchCriteriaNmb = true;
        this.divSearchCriteriaDate= false;


      } else {
        this.divSearchCriteriaCmb = false;
        this.divSearchCriteriaTxt = true;
        this.divSearchCriteriaNmb = false;
        this.divSearchCriteriaDate= false;
      }

      this.selectedFieldName = this.FormFieldsByFieldID[0].fieldName;
    });

  }


  onEXTformCategoryChange(ob) {

    this.spinner.show();
    this.service.GetFormCategoryId(ob.value).subscribe(data => {   
      this.Form = data;     
      this.spinner.hide();
      this.divEXTForm = true;
    });
  }


  onEXTformChange(ob) {  
    this.spinner.show();
    this.service.GetFormFieldsByFormId(ob.value).subscribe(data => {
      this.FormFields = data;
      this.filteredFormFields = this.FormFields.slice();
      this.spinner.hide();
      this.divFormField = true;
    }); 

    this.SelectedForm = this.Form.find(i => i.formID === ob.value);
  }
  

  deleteLink() {
    Swal.fire({
      title: 'Are you sure you want to delete linkage ?',
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
        this.service.DeleteLinkByIndicatorID(this.IndicatorAdd.indicatorID).subscribe(data => {
          this.spinner.hide();
          this.showNotification('top','center','Indicator linkage deleted succesfully!','','success');

          this.divIsForm = false;
          this.isDisabled = false;
          this.ExternalData.name = "";
        });
      }
    })
  }

  getLevels() {
    this.spinner.show();
    this.service.getLevelsList(4082).subscribe(data => {
      this.levels = data;
      this.spinner.hide();
    });
  }

  addForm() {
    
    this.formDesignAddData = {};
    this.EditNodeData = {
      "indicatorID": this.IndicatorAdd.indicatorID,
      "status": "1",
      "locationID": this.IndicatorAdd.locationID
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

          this.showNotification('top', 'center', 'Indicator updated successfully', '', 'success');
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

  onformChangeIsForm(ob) {  
    this.spinner.show();
    this.service.GetFormFieldsByFormId(ob.value).subscribe(data => {
      this.FormFields = data;
      this.filteredFormFields = this.FormFields.slice();
      this.spinner.hide();
      this.divIsFormField = true;
    }); 

    this.SelectedForm = this.Form.find(i => i.formID === ob.value);
  }  
  
  onIsformfieldChange(ob) {  
    this.service.GetFormFieldsByFieldID(ob.value).subscribe(data => {
      this.FormFieldsByFieldID = data;

      let test = this.SelectedForm.formName+ "_" + this.FormFieldsByFieldID[0].formPage.name.replace(/\s/g, "");
    });
  }

  onIsformCategoryChange(ob) {

    this.spinner.show();
    this.service.GetFormCategoryId(ob.value).subscribe(data => {
      this.Form = data
      this.userService.getUserProfile().subscribe(UserData => {
        this.userData = UserData['formData'];
        this.provID = this.userData['provinceID'];  
        this.Formfiltered.push(this.Form.find(i => i.locationID === this.provID)); 
        // this.Formfiltered = this.Form.find(i => i.locationID === this.provID);
        this.spinner.hide();
        this.divIsFormD = true;
      })
    });
  }

  // onIsformCategoryChange(ob) {

  //   this.spinner.show();
  //   this.service.GetFormCategoryId(ob.value).subscribe(data => {   
  //     this.Form = data;     
  //     this.spinner.hide();
  //     this.divIsFormD = true;
  //   });
  // }
  openFormDesign(): void {

    if (this.NodeData.FormName != "" && this.NodeData.fName) {

      this.Preview = {
        formID: this.NodeData.FormName,
        indicatorID: this.NodeData.indicatorID,
        formName: '' , //'DevelopmentandResearch19'
        formCaptureID:'', 
        state: 'edit',
        fieldID: this.NodeData.fName
      }
  
      const dialogRef = this.dialog.open(HierarchyFormPreviewComponent, {
        width: '65%',
        height: '65%',
        data: this.Preview,
        disableClose:true
      });

    }else {
      this.showNotification('top', 'center', 'Please select a form and form field before preview!', '', 'danger');
      return;
    }

  }
  
  getIndicators(){
    this.spinner.show();   
    this.Hierarchyservice.getIndicatorNodes().subscribe(data => {
         this.Indicators = data;
         this.filteredIndicators = this.Indicators.slice();
         this.spinner.hide();
    });
  }


  hideEditButtons(){


    if(this.CalcAdd.ViewEdit == 1){

      this.divContorls = true;
      this.thEdit= true;  
      this.thDelete= true;  

    }else if(this.CalcAdd.ViewEdit == 0){

      this.divContorls = false;
      this.thEdit= false;  
      this.thDelete= false;  
    }

  }
  public gridData: any = this.service.getExternalCalculationByNodeID(this.nodeID);

  onType(ob) {  

    if(this.ExternalData.name == 1){

      this.divFormCat = true;
      this.divImportTableName = false;
      this.divExternalTableDataName = false;
      this.divExternalDataName = false;
      this.divNotForm  = true;
      this.divIsForm  = false;

    }else if(this.ExternalData.name == 2){

      this.divFormCat = false;
      this.divForm = false;
      this.divFormField = false;
      this.divImportTableName = true;
      this.divExternalTableDataName = false;
      this.divExternalDataName = false;
      this.divNotForm  = true;
      this.divIsForm  = false;

    }else if(this.ExternalData.name == 3){

      this.divFormCat = false;
      this.divForm = false;
      this.divFormField = false;
      this.divImportTableName = false;
      this.divExternalTableDataName = false;
      this.divExternalDataName = true;
      this.divNotForm  = true;
      this.divIsForm  = false;

    }else if(this.ExternalData.name == 1003){
      this.divNotForm  = false;
      this.divIsForm  = true;
    }


  }

  
  onDataservice(ob) {

    this.divExternalTableDataName = true;
    let Database = ob.source.triggerValue

    this.service.CreateProcs(ob.value, Database).subscribe(data => {
      this.service.getExternalTables(ob.value).subscribe(data => {
        this.ExternalDataTableName = data;
        this.spinner.hide();
      });
    });

    
    this.SelectedDataServiceID = this.Dataservice.find(i => i.connectString === ob.value);
    this.dataServiceID = this.SelectedDataServiceID.dataServiceID;
 
  }

  onformCategoryChange(ob) {

    this.divForm = true;

    this.service.GetFormCategoryId(ob.value).subscribe(data => {
      this.Form = data;
      this.spinner.hide();
    });
  }

  onUploadNameChange(ob) {

    let TableName = ob.value + "_DataImport";
    this.divColName = true;

     this.service.getTableColumns(TableName).subscribe(data => {
      this.TableColumns = data;         
    });

  }

  onExternalDataTableName(ob) {

    let TableName = ob.value;
    this.divColName = true;

     this.service.getExternalTableColumns(this.ExternalData.connectString ,TableName).subscribe(data => {
      this.TableColumns = data;         
    });

  }

  onColName(ob) {
    this.divSearchCriteriaTxt = true;
  }
  
  onformChange(ob) {  
    this.spinner.show();
    this.service.GetEXTFormFieldsByFormId(ob.value).subscribe(data => {
      this.FormFields = data;
      this.filteredFormFields = this.FormFields.slice();
      this.spinner.hide();
      this.divFormField = true;
    }); 

    this.SelectedForm = this.Form.find(i => i.formID === ob.value);
  }  
  

  
  onformfieldChange(ob) {  

    this.service.GetFormFieldsByFieldID(ob.value).subscribe(data => {
      this.FormFieldsByFieldID = data;

      this.ExternalData.SearchCriteria= "";
      this.ExternalData.ArraySearchCriteria = "";
      if (this.FormFieldsByFieldID[0].fieldTypeID == 5) {

        this.divSearchCriteriaCmb = true;
        this.divSearchCriteriaTxt = false;
        this.divSearchCriteriaNmb = false;
        this.divSearchCriteriaDate= false;
        this.listCategory = this.splitString(this.FormFieldsByFieldID[0].listValue);


      } else if (this.FormFieldsByFieldID[0].fieldTypeID == 13) {

        this.divSearchCriteriaCmb = false;
        this.divSearchCriteriaTxt = false;
        this.divSearchCriteriaNmb = false;
        this.divSearchCriteriaDate= true;


      } else if (this.FormFieldsByFieldID[0].fieldTypeID  == 9) {

        this.divSearchCriteriaCmb = false;
        this.divSearchCriteriaTxt = false;
        this.divSearchCriteriaNmb = true;
        this.divSearchCriteriaDate= false;


      } else {
        this.divSearchCriteriaCmb = false;
        this.divSearchCriteriaTxt = true;
        this.divSearchCriteriaNmb = false;
        this.divSearchCriteriaDate= false;
      }

      this.selectedFieldName = this.FormFieldsByFieldID[0].fieldName;
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

  Clear() {

    this.ExternalData.FormCategory = "";
    this.DataVal = "";
    this.CalcEval = "";
    this.ExternalData.uploadName = "";
    this.ExternalData.connectString  = "";
    this.ExternalData.tablE_NAME  = "";
    this.ExternalData.column_name  = "";
    this.ExternalData.FormName = "";
    this.ExternalData.fName  = "";
    this.ExternalData.ArraySearchCriteria  = "";
    this.ExternalData.SearchCriteria = "";
    this.ExternalData.selection  = "";
    this.ExternalData.calculation = "";
    this.ExternalData.calcVal = "";
    this.ExternalData.tablE_NAME  = "";
    this.ExternalData.tablE_NAME  = "";
    this.ExternalData.tablE_NAME  = "";
    this.isDisabled = true;
    this.divExternalDataName = false;
    this.divExternalTableDataName = false;
    this.divColName = false;
    this.divFormCat = false;
    this.divOperator = false;
    this.divForm = false;
    this.divFormField = false;
    this.divSearchCriteriaCmb = false;
    this.divSearchCriteriaTxt = false;
    this.divSearchCriteriaNmb = false;
    this.divSearchCriteriaDate = false;
    this.divImportTableName = false;
    this.divAdd = true;
    this.divEdit = false;
    this.isAddDisabled = true;

  }

  EditCompCalculation(){

    let Tname = "";
    if(this.ExternalData.name == 1){

      Tname = this.SelectedForm.formName;


    }else if(this.ExternalData.name == 2){

      Tname = this.ExternalData.uploadName.replace(/\s/g, "") + "_DataImport";

    }else if(this.ExternalData.name == 3){

      Tname = this.ExternalData.tablE_NAME.replace(/\s/g, "");
     
    }
 
    if (this.ExternalData.name != "" && this.ExternalData.calculation != "") {

      this.spinner.show();
      this.service.UpdateExternalCalculation(this.ItemCalID,this.nodeID,Tname, this.ExternalData.name,this.ExternalData.calculation.replaceAll('+', '*plus*').replaceAll('/', '*divide*'), this.ExternalData.calcVal).subscribe(res => {       
        
        if(this.ExternalData.name == 3){
          this.service.insertExternalConnection(this.dataServiceID).subscribe(data => {});            
        }

        this.service.getExternalTotalCalculationByNodeID(this.nodeID).subscribe(data => {
          this.TotalVal = data;
          this.CalTotalVal = {
            total:  this.TotalVal[0].totalValue   
          }  
        });     
        this.spinner.hide();
        this.service.getExternalCalculationByNodeID(this.nodeID);
        this.Clear();
        this.showNotification('top', 'center', 'Calculation updated successfully!', '', 'success');
      });
    }
    else {
      this.showNotification('top', 'center', 'Please enter all required(*) fields before saving!', '', 'danger');
    }
  }

  addCompCalculation() {


    let Tname = "";
    if(this.ExternalData.name == 1){

      Tname = this.SelectedForm.formName;


    }else if(this.ExternalData.name == 2){

      Tname = this.ExternalData.uploadName.replace(/\s/g, "") + "_DataImport";

    }else if(this.ExternalData.name == 3){

      Tname = this.ExternalData.tablE_NAME.replace(/\s/g, "");
     
    }
 
    if (this.ExternalData.name != "" && this.ExternalData.calculation != "") {

      this.spinner.show();
      this.service.insertExternalCalculation(this.nodeID,Tname, this.ExternalData.name," ", " ",this.ExternalData.calculation.replaceAll('+', '*plus*').replaceAll('/', '*divide*'), this.ExternalData.calcVal).subscribe(res => {       
        
        if(this.ExternalData.name == 3){
          this.service.insertExternalConnection(this.dataServiceID).subscribe(data => {});            
        }
        
        this.service.addNodeVal(this.nodeID,Tname, " "," ",this.ExternalData.calculation.replaceAll('+', '*plus*').replaceAll('/', '*divide*'),this.ExternalData.calcVal,this.ExternalData.name,this.ExternalData.calculation.replaceAll('+', '*plus*').replaceAll('/', '*divide*')).subscribe(res => {
          this.service.getExternalTotalCalculationByNodeID(this.nodeID).subscribe(data => {
            this.TotalVal = data;
            this.CalTotalVal = {
              total:  this.TotalVal[0].totalValue   
            }  
          });     
          this.spinner.hide();
          this.service.getExternalCalculationByNodeID(this.nodeID);
          this.Clear();
          this.showNotification('top', 'center', 'Calculation added successfully!', '', 'success');

          this.service.getExternalCalculationByIndicatorID(this.IndicatorAdd.indicatorID).subscribe(data => {
            this.ExtData = data; 
          });  

        });
         
      });
    }
    else {
      this.showNotification('top', 'center', 'Please enter all required(*) fields before saving!', '', 'danger');
    }
  }

  addCalculation() {
   
    if(this.ExternalData.name == 1){

      this.addCalculationForm();

    }else if(this.ExternalData.name == 2){

      this.addCalculationImportData();
      

    }else if(this.ExternalData.name == 3){

      this.addCalculationExternalData();

    }

    this.isAddDisabled = false;
    this.service.getExternalCalculationByNodeID(this.nodeID);
  
  }

  
  addCalculationExternalData() {

    if(this.ExternalData.calculation != "" && this.ExternalData.selection == ""){

      this.showNotification('top', 'center', 'Please choose operation', '', 'danger');

    }else{

      if(this.ExternalData.column_name != "" && this.ExternalData.SearchCriteria != ""){

        this.divOperator = true;
        this.listValues = this.ExternalData.SearchCriteria;
    
        
        let TableName = this.ExternalData.tablE_NAME.replace(/\s/g, "");
        this.ExternalData.calculation += this.ExternalData.selection + this.ExternalData.column_name + '(' + this.listValues + ')';
  
        
        if(this.ExternalData.calcVal != "" ){
          this.CalcEval = this.ExternalData.calcVal;
        }
        
  
        if(this.ExternalData.SearchCriteria != "" ){
  
          this.DataVal = this.listValues;
  
          this.service.ExtrenalCountColumnData(this.ExternalData.column_name, this.DataVal, TableName, this.ExternalData.connectString).subscribe(data => {
            this.DBCalc = data;
            this.CalcEval += this.ExternalData.selection + this.DBCalc[0].counter;
            this.ExternalData.calcVal = eval(this.CalcEval);
          }
          );
        } 

      }else{
        this.showNotification('top', 'center', 'Please choose all required(*) fields', '', 'danger');
      }
  
    }

  }

  addCalculationImportData() {

    if(this.ExternalData.calculation != "" && this.ExternalData.selection == ""){

      this.showNotification('top', 'center', 'Please choose operation', '', 'danger');

    }else{

      if(this.ExternalData.column_name != "" && this.ExternalData.SearchCriteria != ""){


        this.divOperator = true;
        this.listValues = this.ExternalData.SearchCriteria;
    
        
        let TableName = this.ExternalData.uploadName.replace(/\s/g, "") + "_DataImport";
        this.ExternalData.calculation += this.ExternalData.selection + this.ExternalData.column_name + '(' + this.listValues + ')';
  
        if(this.ExternalData.calcVal != "" ){
          this.CalcEval = this.ExternalData.calcVal;
        }
        
        if(this.ExternalData.SearchCriteria != "" ){
  
          this.DataVal = this.listValues;
  
          this.service.CountColumnData(this.ExternalData.column_name, this.DataVal, TableName).subscribe(data => {
            this.DBCalc = data;
            this.CalcEval += this.ExternalData.selection + this.DBCalc[0].counter;
            this.ExternalData.calcVal = eval(this.CalcEval);
          }
          );
        }   
      }else{
        this.showNotification('top', 'center', 'Please choose all required(*) fields', '', 'danger');
      }


    }

  }

  clickRefresh(item:any){

    // if(item.externalDataTypeID == 1){

    //   this.refreshCalculationForm(item);

    // }else if(item.externalDataTypeID == 2){

    //   this.refreshCalculationImportData(item);
      

    // }else if(item.externalDataTypeID == 3){

    //   this.refreshCalculationExternalData(item);

    // }
    
    this.service.RefreshExternalFormCalculation(item.calculationField.replaceAll('+', '*plus*').replaceAll('/', '*divide*'), item.externalDataName, item.calculationID, item.connectString, item.externalDataTypeID).subscribe(data => {

      this.spinner.show();
      this.service.getExternalCalculationByNodeID(this.nodeID);
      this.showNotification('top','center','Calculation refreshed succesfully!','','success');
      this.service.getExternalTotalCalculationByNodeID(this.nodeID).subscribe(data => {
        this.TotalVal = data;
        this.CalTotalVal = {
          total:  this.TotalVal[0].totalValue   
        }  
        this.spinner.hide();
      });    

    });

  }

  // refreshCalculationForm(item:any) {
   
    

  // }

  // refreshCalculationImportData(item:any) {

  //   this.service.RefreshExternalFormCalculation(item.calculationField.replaceAll('+', '*plus*').replaceAll('/', '*divide*'), item.externalDataName, item.calculationID, item.connectString, item.externalDataTypeID).subscribe(data => {

  //     this.spinner.show();
  //     this.service.getExternalCalculationByNodeID(this.nodeID);
  //     this.showNotification('top','center','Calculation Refreshed Succesfully!','Success.','success');
  //     this.service.getExternalTotalCalculationByNodeID(this.nodeID).subscribe(data => {
  //       this.TotalVal = data;
  //       this.CalTotalVal = {
  //         total:  this.TotalVal[0].totalValue   
  //       }  
  //       this.spinner.hide();
  //     });    

  //   });

  // }

  // refreshCalculationExternalData(item:any) {

  //   this.service.RefreshExternalFormCalculation(item.calculationField.replaceAll('+', '*plus*').replaceAll('/', '*divide*'), item.externalDataName, item.calculationID, item.connectString, item.externalDataTypeID).subscribe(data => {

  //     this.spinner.show();
  //     this.service.getExternalCalculationByNodeID(this.nodeID);
  //     this.showNotification('top','center','Calculation Refreshed Succesfully!','Success.','success');
  //     this.service.getExternalTotalCalculationByNodeID(this.nodeID).subscribe(data => {
  //       this.TotalVal = data;
  //       this.CalTotalVal = {
  //         total:  this.TotalVal[0].totalValue   
  //       }  

  //       this.spinner.hide();
  //     });    

  //   });

  // }


  addCalculationForm() {

    if (this.ExternalData.calculation != "" && this.ExternalData.selection == "") {

      this.showNotification('top', 'center', 'Please choose operation', '', 'danger');

    } else {

      if (this.selectedFieldName != undefined) {

        if (this.ExternalData.SearchCriteria == "" && this.ExternalData.ArraySearchCriteria == "") {

          this.showNotification('top', 'center', 'Please choose all required(*) fields', '', 'danger');

        } else {


          this.divOperator = true;

          if (this.ExternalData.SearchCriteria != "") {

            this.listValues = this.ExternalData.SearchCriteria;

          } else {

            this.listValues = this.ExternalData.ArraySearchCriteria;

          }

          this.FormName = 'Data_' + this.SelectedForm.formName + "_" + this.FormFieldsByFieldID[0].formPage.name.replace(/\s/g, "");
          this.ExternalData.calculation += this.ExternalData.selection + this.selectedFieldName + '(' + this.listValues + ')';

          if(this.ExternalData.calcVal != "" ){
            this.CalcEval = this.ExternalData.calcVal;
          }

          if (this.ExternalData.SearchCriteria != "") {

            this.DataVal = this.listValues;

            this.service.CountColumnData(this.selectedFieldName, this.DataVal, this.FormName).subscribe(data => {
              this.DBCalc = data;
              this.CalcEval += this.ExternalData.selection + this.DBCalc[0].counter;
              this.ExternalData.calcVal = eval(this.CalcEval);
            }
            );
          } else {

            this.DataVal = "";
            let count: number = 0;

            this.listValues.forEach(item => {

              if (count > 0) {
                this.service.CountColumnData(this.selectedFieldName, item.trim(), this.FormName).subscribe(data => {
                  this.DBCalc = data;
                  this.CalcEval += this.ExternalData.selection + "+" + this.DBCalc[0].counter;
                  this.ExternalData.calcVal = eval(this.CalcEval);
                });
              } else {
                this.service.CountColumnData(this.selectedFieldName, item.trim(), this.FormName).subscribe(data => {
                  this.DBCalc = data;
                  this.CalcEval += this.ExternalData.selection + this.DBCalc[0].counter;
                  this.ExternalData.calcVal = eval(this.CalcEval);
                });
              }



              count++;

            })


          }
        }

      } else {
        this.showNotification('top', 'center', 'Please choose all required(*) fields', '', 'danger');
      }
    }

  }

  getExternalDataType(){
    this.spinner.show();   
    this.service.getExternalDataType().subscribe(data => {
         this.ExternalDataType = data;
         this.spinner.hide();
    });
  }

  getFormCategory(){
    this.spinner.show();   
    this.service.getformCategoryList().subscribe(data => {
         this.FormCategory = data;
         this.spinner.hide();
    });
  }

  clickEdit(item: any) {

    this.spinner.show();
    this.ExternalData.name = item.externalDataTypeID;
    this.ExternalData.calculation = item.calculationField;
    this.ExternalData.calcVal = item.value;
    this.divOperator = true;
    this.isDisabled = true;
    

    this.divEdit =true;
    this.divAdd =false;

    this.ItemCalID = item.calculationID;
    if(item.externalDataTypeID  == 1){

      this.divFormCat = true;
      this.divImportTableName = false;
      this.divExternalTableDataName = false;
      this.divExternalDataName = false;

      this.divForm = true;
      this.divFormField = true;
      this.divColName = false;
      this.ExternalData.FormCategory = item.formCategoryID;


      this.service.GetFormCategoryId(item.formCategoryID).subscribe(data => {
        this.Form = data;
        this.ExternalData.FormName = item.formID;
        this.SelectedForm = this.Form.find(i => i.formID === item.formID);

        this.service.GetFormFieldsById(item.formID).subscribe(data => {
          this.FormFields = data;
        });
      });

    }else if(item.externalDataTypeID == 2){

      this.divFormCat = false;
      this.divForm = false;
      this.divFormField = false;
      this.divImportTableName = true;
      this.divExternalTableDataName = false;
      this.divExternalDataName = false;
      this.divForm = false;
      this.divFormField = false;
      this.ExternalData.uploadName = item.externalDataName.replace("_DataImport", "");

      let TableName = item.externalDataName;
      this.divColName = true;

      this.service.getTableColumns(TableName).subscribe(data => {
      this.TableColumns = data;         

    });

    } else if (item.externalDataTypeID == 3) {

      this.divFormCat = false;
      this.divForm = false;
      this.divFormField = false;
      this.divImportTableName = false;
      this.divExternalTableDataName = false;
      this.divExternalDataName = true;
      this.divForm = false;
      this.divFormField = false;
      this.divColName = true;

      this.ExternalData.connectString = item.connectString;
      this.ExternalData.tablE_NAME = item.externalDataName;

      this.divExternalTableDataName = true;
      this.service.getExternalTables(item.connectString).subscribe(data => {
        this.ExternalDataTableName = data;
        this.spinner.hide();
      });

      this.service.getExternalTableColumns(this.ExternalData.connectString, item.externalDataName).subscribe(data => {
        this.TableColumns = data;
      });

    }
    this.spinner.hide();

  }


  clickDelete(item: any) {
    Swal.fire({
      title: 'Are you sure you want to delete ' + item.externalDataName + ' calculation?',
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

        this.service.DeleteExternalCalculation(item.calculationID).subscribe(data => {
          this.spinner.hide();
          this.service.getExternalCalculationByNodeID(this.nodeID);
          this.showNotification('top','center','Calculation deleted succesfully!','','success');
          this.service.getExternalTotalCalculationByNodeID(this.nodeID).subscribe(data => {
            this.TotalVal = data;
            this.CalTotalVal = {
              total:  this.TotalVal[0].totalValue   
            }  
          });    

          this.divNotForm = false;
          this.isDisabled = false;
          this.ExternalData.name = "";

        });
      }
    })
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
