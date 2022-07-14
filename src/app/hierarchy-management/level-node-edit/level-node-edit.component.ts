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
import { HierarchyManagementService } from 'src/app/hierarchy-management.service';
import { HierarchyFormPreviewComponent } from 'src/app/hierarchy-management/hierarchy-form-preview/hierarchy-form-preview.component';

// './hierarchy-form-preview/hierarchy-form-preview.component';


declare var $: any;


@Component({
  selector: 'app-level-node-edit',
  templateUrl: './level-node-edit.component.html',
  styleUrls: ['./level-node-edit.component.css']
})
export class LevelNodeEditComponent implements OnInit {

  submitted = false;
  NodeData: any;
  Preview: any;
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
  divIsIndicator: boolean  = false; 
  Indicators:any=[];
  FormCategory: any=[];
  Form: any=[];
  divForm: boolean  = false;
  divFormField: boolean  = false;
  FormFields: any[];
  IndicatorFormFields: any[];
  ExternalDataType: any=[];
  IndicatorAdd: any;
  XMLname: string = "";
  XMLdataExportName: string = "";
  SelectedForm: any;
  FormFieldsByFieldID: any;
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
  nodeID: number = 0;
  TotalVal: any;
  CalTotalVal: any;
  isDisabled  : boolean  = false;
  isAddDisabled : boolean  = true;
  ItemCalID: any;
  divAdd: boolean  = true;
  divEdit: boolean  = false;
  divContorls : boolean  = true;
  divNotForm: boolean  = false;
  divIsForm: boolean  = false;
  divIsFormField: boolean = false;
  divIsFormD: boolean = false;
  isDisabledDrp  : boolean  = true;
  ExtData: any[];
  FacilityTypes: any = [];
  IsFacility: number;
  divIsFacility: boolean = false;
  FacilityTypeID: any;
  constructor(public dialog: MatDialog ,public dialogRef: MatDialogRef<LevelNodeEditComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    public service: TreediagramService, public Hierarchyservice: HierarchyManagementService, public formBuilder: FormBuilder, private spinner: NgxSpinnerService) {
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
  ParentNodeName: string = "";
  nodeName: string = "";
  nodeDescription: string = "";
  nodeParentD: number;
  divIsIndicatorButton: any;

  ngOnInit(): void {
        
    this.CalcAdd = {
      ViewEdit: 1
    }

    this.ExternalData = {
      name: "",
      formCategoryName : "",
      FormName : "",
      fName : "",
      calculation : "",
      SearchCriteria : "",
      selection : ""
   
    }


    this.Hierarchyservice.getNodeRoleFacilityType(this.NodeData.nodeID).subscribe(data => {
      this.FacilityTypeID = data;   

      if(typeof this.FacilityTypeID !== "undefined" && this.FacilityTypeID.length != 0){
        this.NodeData.FaciltyID = this.FacilityTypeID[0].facilityTypeID; 
      }
    });

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
    this.NodeData.indicatorID = this.NodeData.indicatorID;

    this.Hierarchyservice.getFacilityTypes().subscribe(data => {
      this.spinner.show();
      this.FacilityTypes = data;
      this.spinner.hide();
    });
    
    this.getNodeAttributesData(this.NodeData.nodeID);
    // this.getRoles();
    this.getUserfieldTypes();
    this.getLevels();
    this.getNodes();
    this.getNodeAttributes(this.NodeData.levelID);
    this.service.getLevelMetadata(this.NodeData.levelID);
    this.hideEditButtons();
    this.getIndicators();
    this.getFormCategory();
    this.EXThideEditButtons();
    this.setExternalData();

    this.getExternalDataType();

    // this.NodeData = {
    //   indicatorID : 0
    // } 
    this.getFormCategory();
    //this.getIndicatorAttributesData(this.NodeData.indicatorID);
    //this.getIndicatorAttributes();
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
    this.nodeID = this.NodeData.indicatorID;


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
    //this.setIndicatorFileds();

    if (this.NodeData.IsFacilityLevel == 1) {
      this.divIsFacility = true;
      this.IsFacility = 1;
    } else {
      this.divIsFacility = false;
      this.IsFacility = 0;
    }


    if(this.NodeData.IsIndicatorLevel == 1){
      this.divIsIndicator = true;
      this.btnSave = false;
      this.setIndicatorFileds();
    }else{
      this.divIsIndicator = false;

      if(this.NodeData.ViewEdit != 0){
        this.btnSave = true;
      }
      
    }

  }

  public filteredIndicators;
  public filteredFormFields;
  
 
  getIndicators(){
    this.spinner.show();   
    this.Hierarchyservice.getIndicatorNodes().subscribe(data => {
         this.Indicators = data;
         this.filteredIndicators = this.Indicators.slice();
         this.spinner.hide();
    });
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
      this.service.UpdateExternalCalculation(this.ItemCalID,this.CalcAdd.nodeID,Tname, this.ExternalData.name,this.ExternalData.calculation.replaceAll('+', '*plus*').replaceAll('/', '*divide*'), this.ExternalData.calcVal).subscribe(res => {       
        
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
        this.showNotification('top', 'center', 'Calculation updated successfully!', 'Success', 'success');
      });
    }
    else {
      this.showNotification('top', 'center', 'Please enter all required(*) fields before saving!', '', 'danger');
    }
  }

  Clear() {

    this.ExternalData.name = "";
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
    this.isDisabled = false;
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
      this.service.insertExternalCalculation(this.CalcAdd.nodeID,Tname, this.ExternalData.name," ", " ",this.ExternalData.calculation.replaceAll('+', '*plus*').replaceAll('/', '*divide*'), this.ExternalData.calcVal).subscribe(res => {       
        
        if(this.ExternalData.name == 3){
          this.service.insertExternalConnection(this.dataServiceID).subscribe(data => {});            
        }
        
        this.service.addNodeVal(this.CalcAdd.nodeID,Tname, " "," ",this.ExternalData.calculation.replaceAll('+', '*plus*').replaceAll('/', '*divide*'),this.ExternalData.calcVal,this.ExternalData.name,this.ExternalData.calculation.replaceAll('+', '*plus*').replaceAll('/', '*divide*')).subscribe(res => {
          this.service.getExternalTotalCalculationByNodeID(this.nodeID).subscribe(data => {
            this.TotalVal = data;
            this.CalTotalVal = {
              total:  this.TotalVal[0].totalValue   
            }  
          });     
          this.spinner.hide();
          this.service.getExternalCalculationByNodeID(this.nodeID);
          this.Clear();
          this.showNotification('top', 'center', 'Calculation added successfully!', 'Success', 'success');
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

      this.showNotification('top', 'center', 'Please choose Operation', 'Danger', 'danger');

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
        this.showNotification('top', 'center', 'Please choose all required(*) fields', 'Danger', 'danger');
      }
  
    }

  }

  addCalculationImportData() {

    if(this.ExternalData.calculation != "" && this.ExternalData.selection == ""){

      this.showNotification('top', 'center', 'Please choose Operation', 'Danger', 'danger');

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
        this.showNotification('top', 'center', 'Please choose all required(*) fields', 'Danger', 'danger');
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
      this.showNotification('top','center','Calcualtion Refreshed Succesfully!','Success.','success');
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
  //     this.showNotification('top','center','Calcualtion Refreshed Succesfully!','Success.','success');
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
  //     this.showNotification('top','center','Calcualtion Refreshed Succesfully!','Success.','success');
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

      this.showNotification('top', 'center', 'Please choose Operation', 'Danger', 'danger');

    } else {

      if (this.selectedFieldName != undefined) {

        if (this.ExternalData.SearchCriteria == "" && this.ExternalData.ArraySearchCriteria == "") {

          this.showNotification('top', 'center', 'Please choose all required(*) fields', 'Danger', 'danger');

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
        this.showNotification('top', 'center', 'Please choose all required(*) fields', 'Danger', 'danger');
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


  EXTclickEdit(item: any) {

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


  CalclickDelete(item: any) {
    Swal.fire({
      title: 'Are you sure you want to delete ' + item.externalDataName + ' Calcualtion?',
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
          this.showNotification('top','center','Calcualtion Deleted Succesfully!','Success.','success');
          this.service.getExternalTotalCalculationByNodeID(this.nodeID).subscribe(data => {
            this.TotalVal = data;
            this.CalTotalVal = {
              total:  this.TotalVal[0].totalValue   
            }  
          });    

        });
      }
    })
  }

 

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
      this.showNotification('top', 'center', 'Please select a Form and Form Field before preview!', '', 'danger');
      return;
    }

  }

  getFormCategory(){
    this.spinner.show();   
    this.service.getformCategoryList().subscribe(data => {
         this.FormCategory = data;       
         this.spinner.hide();
    });
  }

  onformCategoryChange(ob) {

    this.spinner.show();
    this.service.GetFormCategoryId(ob.value).subscribe(data => {   
      this.Form = data;     
      this.spinner.hide();
      this.divForm = true; 
    });
  }

  onformChange(ob) {  
    this.spinner.show();
    this.service.GetFormFieldsByFormId(ob.value).subscribe(data => {
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
    });
  }

  closePopup() {
    this.dialogRef.close();
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
        name: listV.trim(),
        value: listV.trim()
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

  getLevels() {
    this.service.getLevelsList(this.treeData.treeID).subscribe(data => {
      this.levels = data;
    });
  }

  getNodeAttributesData(NodeID: any) {

    this.service.getNodeAttributesData(NodeID).subscribe(data => {
      this.spinner.show();
      this.formDesignData = data;
      this.getNodeAttributes(this.NodeData.levelID);
      this.spinner.hide();
    });
  }

  
  getNodeAttributes(NodelevelID: any) {
    // this.formDesignData = this.getNodeAttributesData(this.NodeID); 

    this.service.getNodeAttributes(NodelevelID).subscribe(data => {
      this.formDesign = data;

      //this.getNodeAttributesData(this.NodeData.nodeID);

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
      this.spinner.hide();
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

  DisableEditandDelete(item: any): Boolean {

    if (item.friendlyname == "Name" || item.friendlyname == "Description") {
      return false
    }
    else {
      return true
    }
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

    // if(this.NodeData.indicatorID != 0){

    //   if (this.NodeData.FormName != "" && this.NodeData.fName) {

    //     var Indicatorvalues = {
    //       "treeID": this.treeData.treeID,
    //       "NodeID": this.NodeData.nodeID,
    //       "indicatorID": this.NodeData.indicatorID,
    //       "tableName": 'Data_' + this.SelectedForm.formName + "_" + this.FormFieldsByFieldID[0].formPage.name.replace(/\s/g, ""),
    //       "fieldID": this.NodeData.fName,
    //       "formID": this.NodeData.FormName        
    //     };

    //     this.service.addupdateIndicatorNode(Indicatorvalues).subscribe(data => {
   
    //     }); 

    //   }else {
    //     this.showNotification('top', 'center', 'Please select a Form and Form Field before saving!', '', 'danger');
    //     return;
    //   }
      
    // }

    if(this.IsFacility == 1){
      var values = {
        "nodeID": this.NodeData.nodeID,
        "facilityTypeID": this.NodeData.FaciltyID
      }
      this.spinner.show();
      this.Hierarchyservice.InsertUpdateNodeRoleFacilityType(values).subscribe(res => {
      });
    }

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

  setExternalData() {

    //this.service.getExternalCalculationByNodeID(this.IndicatorAdd.indicatorID);
    this.service.getExternalCalculationByIndicatorID(this.NodeData.indicatorID).subscribe(data => {
      this.ExtData = data;
      if (typeof data !== 'undefined' && data.length > 0) {

        this.divIsForm = false;
        this.divNotForm = true;    
        this.isDisabled = true;    
        this.ExternalData.name = this.ExtData[0].externalDataTypeID ;
      }  

    });      
  }
  

  
  setIndicatorFileds(){
    this.spinner.show();    
    this.service.getIndicatorNode(this.NodeData.indicatorID).subscribe(data => {

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
            this.SelectedForm = this.Form.find(i => i.formID === this.IndicatorFormFields[0].formID);
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

        this.spinner.hide();
        this.NodeData.indicatorID = this.IndicatorFormFields[0].indicatorID;
        this.NodeData.FormCategory = this.IndicatorFormFields[0].formCategoryID;     
        this.NodeData.FormName = this.IndicatorFormFields[0].formID;
        this.NodeData.fName = this.IndicatorFormFields[0].fieldID;
      }  

    }); 
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
    });
  }
  onIsformCategoryChange(ob) {

    this.spinner.show();
    this.service.GetFormCategoryId(ob.value).subscribe(data => {   
      this.Form = data;     
      this.spinner.hide();
      this.divIsFormD = true;
    });
  }



  EXThideEditButtons(){


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
  public gridEXTData: any = this.service.getExternalCalculationByNodeID(this.nodeID);

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
  


}
