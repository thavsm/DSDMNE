//libraries
import { Component, OnInit, ViewChild, Inject, HostListener } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataManagementService } from '../DataManagementService.service';
import { MatAccordion } from '@angular/material/expansion';
import { FormControl, Validators } from '@angular/forms';
import { ViewInternalDataImportComponent } from './view-internal-data-import/view-internal-data-import.component';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HierarchyManagementService } from 'src/app/hierarchy-management.service';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import * as XLSX from 'xlsx';
import { utils } from 'xlsx';
import { merge } from 'jquery';
import * as moment from 'moment';
import { MatSelectionListChange } from '@angular/material/list';
import { SliderTicksComponent } from '@progress/kendo-angular-inputs';
import { ItemTemplateDirective } from '@progress/kendo-angular-dropdowns';
import * as FileSaver from 'file-saver';
import { toODataString } from '@progress/kendo-data-query';
import { ConstantPool, ThisReceiver } from '@angular/compiler';
import { Byte } from '@angular/compiler/src/util';

import { MatGridTileHeaderCssMatStyler } from '@angular/material/grid-list';
import Swal from 'sweetalert2';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
declare var $: any;
interface DataTypes {
  value: string;
  viewValue: string;
}
class Imports {
  uploadName: string;
}

@Component({
  selector: 'app-internal-data-import',
  templateUrl: './internal-data-import.component.html',
  styleUrls: ['./internal-data-import.component.css']
})

export class InternalDataImportComponent implements OnInit {
  lockQuestions: boolean = false;
  divUsername: boolean = false;
  divPassword: boolean = false;
  xpandStatus: boolean = false;
  saveBool: boolean = false;
  updateBool: boolean = false;
  setType: boolean = false;
  FormState: string;
  varchat: boolean = false;
  fieldDatatype: string;
  key: string;
  display: string;
  filter = true;
  sourceLeft = true;
  keepSorted = true;
  abc: string[];
  abcValue: string;
  htmlTag: HTMLElement = document.getElementsByTagName('html')[0];
  private sourceStations: Array<any>;
  private confirmedStations: Array<any>;
  fieldNameId: number;
  countrows: number;
  fieldName: string;
  uploadName: string;
  treeUploadID: number;
  rowCount: number;
  count: number;
  dataTypeId: string;
  uploadTypeId: string;
  uploadTableStructureId: string;
  username: string;
  password: string;
  Maxlength: string;
  remove: Byte;
  createTableBool: boolean = false;
  updateTableBool: boolean = false;

  closed: boolean = true;
  name = new FormControl('', [
    Validators.required,
  ]);
  constructor(
    public dialog: MatDialog, private service: DataManagementService, private route: Router, private spinner: NgxSpinnerService) { }
  public pageSize = 5;
  public skip = 0;
  public internalDataList: any[];
  public ImportAdd: any = [];
  public DataSelection: any = [];
  public EditField: any = [];
  public DataType: any = [];
  public ImportType: any = [];
  public TableStructure: any = [];
  public target: any = [];
  public source: any = [];
  public datatypeonly: any = [];
  public fieldonly: any = [];
  public fieldanddatatype: any = [];
  public fields: any = [];
  public datatypes: any = [];
  public extractdataArray: any = [];
  public excelData: any = [];
  public excelDataSave: any = [];
  public newdtype: any = [];
  public array: any = [];
  public arrayexcel: any = [];

  @ViewChild(MatAccordion) accordion: MatAccordion;
  formInternal: any;
  formPatientInfo: any;
  dataToExtract: any = [];
  injection: any = [];
  arrayBuffer: any;
  file: File;
  internalData: Array<any>;
  selectedValue: string;
  columns: string;
  dataTypes: DataTypes[] = [
    { value: 'VARCHAR(50)', viewValue: 'Text' },
    { value: 'INT', viewValue: 'Integer' },
    { value: 'DATE', viewValue: 'Date' },
    { value: 'DECIMAL', viewValue: 'Decimal' }
  ];
  ngOnInit(): void {
    this.intlDataList();
    this.bindControls();
  }
  //#region Data setup for duallist
  doReset() {
    this.sourceStations = JSON.parse(JSON.stringify(this.source));
    this.confirmedStations = new Array<any>();
    this.confirmedStations.push(this.source);
    this.useStations();
  }

  private useStations() {
    this.key = 'fieldName';
    this.display = 'fieldName';
    this.keepSorted = true;
    this.source = this.sourceStations;
    this.target = JSON.parse(JSON.stringify(this.source));
  }

  onDataTypeChange(ob) {
    if (ob.value == 3) {
      this.divUsername = true;
      this.divPassword = true;

    } else {
      this.divUsername = false;
      this.divPassword = false;
    }
  }

  bindControls() {
    this.spinner.show();
    this.service.getDataImportTypes().subscribe(data => {
      this.ImportType = data;
      this.spinner.hide();
    });

    this.spinner.show();
    this.service.getDataUploadType().subscribe(data => {
      this.DataType = data;
      this.spinner.hide();
    });

    this.spinner.show();
    this.service.getDatatableStructure().subscribe(data => {
      this.TableStructure = data;
      this.spinner.hide();
    });
  }

  intlDataList() {
    this.spinner.show();
    this.service.getintlDataList().subscribe(data => {
      this.internalDataList = data;
      this.internalDataList = [...this.internalDataList];
      this.spinner.hide();
    });
  }
  //#endregion

  typeSetTrue() {
    this.setType = true;
  }

  typeSetFalse() {
    this.setType = false;
  }

  clickView(item: any) {
    localStorage.setItem('ViewInfo', item.uploadName);
  }
  ViewPatientInfo(item: any): void {
    const viewdata = localStorage.getItem('ViewInfo');
    this.service.getDataImport(viewdata).subscribe((data) => {
      this.formPatientInfo = data;
    });

    const dialogRef = this.dialog.open(ViewInternalDataImportComponent, {
      width: "64%",
      data: this.formPatientInfo,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  //Extract excel document and upload
  incomingfile(event) {
    this.file = event.target.files[0];
  }

  Upload() {
    this.source = [];
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      console.log((this.file.name));
      this.dataToExtract = utils.sheet_to_json(worksheet, { raw: true });
      this.internalData = Object.keys(this.dataToExtract[0]);
    }
    fileReader.readAsArrayBuffer(this.file);
    this.internalData?.forEach(data => {
      data = data.replace(/\s/g, "");
      this.source.push({ "fieldName": (data) });
    });
  }

  //#endregion
  AddcolumnManually() {
    let x = {
      "fieldName": this.abcValue.replace(/\s/g, "")
    }
    if (x !== undefined && x !== null && this.abcValue !== "") {
      this.source.push(x);
    }
    this.abcValue = "";
  }
  clearAddImport() {
    this.FormState === "add"
    this.updateBool = false;
    this.saveBool = true;
    this.ImportAdd.uploadName = "";
    this.ImportAdd.uploadTableStructureId = "";
    this.ImportAdd.uploadTypeId = "";
    this.ImportAdd.dataTypeId = "";
    this.ImportAdd.remove = "";
    this.abcValue = "";
    this.target = [];
    this.source = [];
    this.fieldanddatatype = [];
    this.lockQuestions = false;

  }
  removeItem() {
    this.target.forEach((item, index) => {
      if (item.selected) {
        this.target.splice(index, 1);
      }
    })
    this.ImportAdd.fieldName = "";
    this.ImportAdd.databaseType = "";

  }
  removeBlankSpaceFieldName(blank: any) {
    blank.abcValue = blank.abcValue.replace(/\s/g, "");
  }
  //#region Save excel with information
  SaveExcelInformation(item: any) {
    localStorage.setItem('UploadName', item.uploadName);
    let fileReader = new FileReader();
    try {
      if (this.file != null)
        fileReader.onload = (e) => {
          this.arrayBuffer = fileReader.result;
          var data = new Uint8Array(this.arrayBuffer);
          var arr = new Array();
          for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
          var bstr = arr.join("");
          var workbook = XLSX.read(bstr, { type: "binary" });
          var first_sheet_name = workbook.SheetNames[0];
          var worksheet = workbook.Sheets[first_sheet_name];
          let count = (XLSX.utils.sheet_to_json(worksheet, { raw: true }));
          var rowCount = count.length;
          this.excelData.push(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
          let exceldataobj = this.excelData.pop();
          let excelkeys = Object.keys(exceldataobj[0]);
          let SQLString = '(';
          excelkeys.forEach(i => {
            i = i.replace(/\s/g, "");
            SQLString += i + ','
          });
          SQLString = SQLString.slice(0, SQLString.length - 1);
          SQLString += ") values (";
          if (rowCount == 1) {
            let excelValues = Object.values(exceldataobj[0]);
            excelValues.forEach(y => {
              if (y !== "") {
                SQLString += "'" + y + "',"
              }
            });
            SQLString = SQLString.slice(0, SQLString.length - 1);
            SQLString += ")";
          }
          else if (rowCount > 1) {
            exceldataobj.forEach((x, i) => {
              let excelValues = Object.values(exceldataobj[i]);
              excelValues.forEach(y => {
                if (y !== "") {
                  SQLString += "'" + y + "',"
                }
              });
              SQLString = SQLString.slice(0, SQLString.length - 1);
              SQLString += "),("
            });
            SQLString = SQLString.slice(0, SQLString.length - 2);
          }
          let excelobj = {
            data: SQLString,
            "tableName": localStorage.getItem('UploadName')
          }
          this.spinner.show();
          var sqlstring;
          if (SQLString.includes('values )')) {
            sqlstring = false;
          }
          else {
            sqlstring = true;
          }
          if (sqlstring) {
            this.service.SaveExcelInfo(excelobj).subscribe(data => {
              this.spinner.hide();
              this.showNotification('top', 'center', 'Data saved successfully', '', 'success');
              this.excelData = [];
              exceldataobj = [];
            }, error => {
              this.spinner.hide();
              this.showNotification('top', 'center', 'Error saving import, please check data if filled in correctly and try again', '', 'danger');
            });
          } else {
            this.spinner.hide();
            this.showNotification('top', 'center', 'Error:There is no data to upload', '', 'danger');
          }
        }
      else {
        this.showNotification('top', 'center', 'Please select file', '', 'warning');
      }
    }
    catch (e) {
      this.showNotification('top', 'center', 'There is no data to upload', '', 'warning');
    }
    fileReader.readAsArrayBuffer(this.file);
  }
  //#endregion

  //save, update and delete importdata
  CreateColumns() {
    this.fieldanddatatype=[];
    let fieldo = "";
    let dtypeonly = "";
    let columns = '';
    this.spinner.show();
    fieldo = this.ImportAdd.fieldName + ' '
    this.fieldonly.push(fieldo);
    dtypeonly = this.ImportAdd.databaseType;
    this.datatypeonly.push(dtypeonly);
    this.fieldonly.forEach((fields, index) => {
      const datatypes = this.datatypeonly[index];
      if (fields !== undefined && datatypes !== undefined) {
        columns = fields + datatypes;
        console.log(columns)
      }
      this.fieldanddatatype.push(columns);
      console.log(this.fieldanddatatype)
      this.spinner.hide();
    });
  }

  SaveExternalImport() {
    let fieldonly = "";
    let datatypeOnly = "";
    let folder = '';
    fieldonly = this.ImportAdd.fieldName + ' '
    this.fieldonly.push(fieldonly);
    datatypeOnly = this.ImportAdd.databaseType;
    this.datatypeonly.push(datatypeOnly);
    this.fieldonly.forEach((fields, index) => {
      const datatypes = this.datatypeonly[index];
      this.fields.push(fields);
      this.datatypes.push(datatypes);
    });
    let field = [...new Set(this.fields)].toString();
    let datatyp = this.datatypes.toString();
    let columns = [...new Set(this.fieldanddatatype)];
    let column = columns.toString();
    folder = "C:\\temp\\Files\\" + this.ImportAdd.uploadName.replace(/\s/g, "");
    let treeupload = {
      "treeID": 0,
      "uploadStatusId": 1,
      "uploadName": this.ImportAdd.uploadName.replace(/\s/g, ""),
      "uploadTypeId": this.ImportAdd.uploadTypeId,
      "folderLocation": folder,
      "dataTypeId": this.ImportAdd.dataTypeId,
      "uploadTableStructureId": this.ImportAdd.uploadTableStructureId,
      "columns": column,
      "prefix": this.ImportAdd.Prefix,
      "suffix": this.ImportAdd.Suffix,
      "username": this.ImportAdd.username,
      "password": this.ImportAdd.password
    }
    this.spinner.show();
    this.service.CreateTableandColumns(treeupload).subscribe(data => {
      this.spinner.hide();
      this.createTableBool = true;
      if (this.createTableBool == true) {
        let treeUID = 0;
        this.spinner.show();
        this.service.addDataToTreeUpload(treeupload).subscribe(data => {
          treeUID = parseInt(data);
          let lookupfieldname = {
            "description": field,
            "fieldName": field,
            "uniqueIdentifier": 0,
            "dataTypeId": datatyp,
            "treeUploadID": treeUID
          }
          this.spinner.show();
          this.service.addDataToLookupFieldName(lookupfieldname).subscribe(data => {
            this.intlDataList();
          }
          );
          this.intlDataList();
          this.spinner.hide();
        }, error => {
          this.spinner.hide();
          this.showNotification('top', 'center', 'Error please try again', '', 'danger');
        });
        this.spinner.hide();
        this.showNotification('top', 'center', 'Tree uploaded successfully', '', 'success');
        this.clearAddImport();
        this.intlDataList();
      }
    }, error => {
      this.spinner.hide();
      this.showNotification('top', 'center', 'Error: Import name already exists, please change import name and try again', '', 'warning');
    });
  }

  clickEdit(item: any) {
    this.xpandStatus = true;
    this.saveBool = false;
    this.updateBool = true;
    this.closed = false;
    this.ImportAdd.uploadName = item.uploadName;
    this.ImportAdd.dataTypeId = item.dataTypeId;
    this.ImportAdd.uploadTypeId = item.uploadTypeId;
    this.ImportAdd.uploadTableStructureId = item.tableStructureID;
    this.ImportAdd.username = item.username;
    this.ImportAdd.password = item.password;
    if (item.dataTypeId == 3) {
      this.divUsername = true;
      this.divPassword = true;
    } else {
      this.divUsername = false;
      this.divPassword = false;
    }
    this.spinner.show();
    this.service.getLookupFieldNameByUploadId(item.treeUploadID).subscribe(data => {
      this.source = data;
      this.doReset();
      this.spinner.hide();
      this.source = [];
    });
    localStorage.setItem('TreeUploadID', item.treeUploadID);
  }

  clickDelete(item: any) {
    localStorage.setItem('TreeID', item.treeUploadID);
    localStorage.setItem('Treename', item.uploadName);
  }

  archiveTree(treeUploadID: number) {
    Swal.fire({
      title: "<h5 style='color:white;font-weight:400'> Are you sure you want to delete this tree?</h5>",
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
        const treeuploadid = localStorage.getItem('TreeID');
        const treename = localStorage.getItem('Treename');
        this.service.DeleteTreeUpload(parseInt(treeuploadid)).subscribe(data => {
          this.service.archiveLookUp(parseInt(treeuploadid)).subscribe(data => { }
          );
          this.service.dropTable(treename).subscribe(data => { }
          );
          this.spinner.hide();
          this.showNotification('top', 'center', 'Tree has been deleted successfully!', '', 'success');
          this.intlDataList();
        },
          error => {
            this.showNotification('top', 'center', 'Error deleting tree, please try again', '', 'danger');
            this.spinner.hide();
          });
      }
    })
  }

  updateTreeUpload(treeUploadID: number) {
    let fieldonly = "";
    let datatypeOnly = "";
    fieldonly = this.ImportAdd.fieldName + '';
    this.fieldonly.push(fieldonly);
    datatypeOnly = this.ImportAdd.databaseType;
    this.datatypeonly.push(datatypeOnly);
    this.fieldonly.forEach((fields, index) => {
      const datatypes = this.datatypeonly[index];
      this.fields.push(fields);
      this.datatypes.push(datatypes);
    });
    let field = [...new Set(this.fields)].toString();
    let datatyp = this.datatypes.toString();
    let columns = [...new Set(this.fieldanddatatype)];
    let column = columns.toString();
    const treeuploadid = localStorage.getItem('TreeUploadID');
    const treeuploadidupdate = localStorage.getItem('TreeUploadID');
    let treeuploadcreate = {
      uploadName: this.ImportAdd.uploadName.replace(/\s/g, ""),
      columns: column
    }
    let treeupload = {
      treeID: 0,
      treeUploadID: parseInt(treeuploadid),
      uploadStatusId: 1,
      uploadName: this.ImportAdd.uploadName.replace(/\s/g, ""),
      uploadTypeId: this.ImportAdd.uploadTypeId,
      folderLocation: "C:\\temp\\Files\\" + this.ImportAdd.uploadName.replace(/\s/g, ""),
      dataTypeId: this.ImportAdd.dataTypeId,
      uploadTableStructureId: this.ImportAdd.uploadTableStructureId,
      prefix: this.ImportAdd.Prefix,
      suffix: this.ImportAdd.Suffix,
      username: this.ImportAdd.username,
      password: this.ImportAdd.password
    }
    let lookupfieldname = {
      "description": field,
      "fieldName": field,
      "uniqueIdentifier": 0,
      "dataTypeId": datatyp,
      "treeUploadID": parseInt(treeuploadid)
    }
    this.service.CreateTableandColumns(treeuploadcreate).subscribe(data => {
      this.spinner.hide();
      this.updateTableBool = true;
      if (this.updateTableBool == true) {
        this.spinner.show();
        this.service.archiveLookUp(parseInt(treeuploadid)).subscribe(data => { }
        );
        this.service.updateTreeUpload(parseInt(treeuploadidupdate), treeupload).subscribe(data => {
          this.intlDataList();
          this.spinner.hide();
        });
        this.service.addDataToLookupFieldName(lookupfieldname).subscribe(data => {
          this.intlDataList();
        }
        );
        this.spinner.hide();
      }
      this.intlDataList();
      this.showNotification('top', 'center', 'Table data updated successfully', '', 'success');
    }, error => {
      this.spinner.hide();
      this.showNotification('top', 'center', 'Import not updated, please try again', '', 'danger');
    });
  }
  //#endregion

  //download excel
  public extractColumns(item: any) {
    this.spinner.show();
    this.service.getLookupFieldNameByUploadId(item.treeUploadID).subscribe(data => {
      var arr = data;
      var object = arr.reduce(
        (obj, item) => Object.assign(obj, { [item.fieldName]: "" }), {});
      this.extractdataArray.push(object);
      this.exportAsExcelFile(this.extractdataArray, "Data");
      this.spinner.hide();
      this.extractdataArray = [];
    });
  }
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    console.log('worksheet', worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
  //#endregion

  //#regionDualListControlData
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

  onKeyUp(boxInput: HTMLInputElement, e: KeyboardEvent) {
    let length = boxInput.value.length;
    let isnumber = isNaN(parseInt(boxInput.value));
    if (length > 0 && isnumber == false) {
      console.log("error");
      boxInput.value = "";
      this.showNotification('top', 'center', 'Import name cannot start with a number', '', 'danger');
    }
  }

  onKeyUpColumn(boxInput: HTMLInputElement, e: KeyboardEvent) {
    let length = boxInput.value.length;
    let isnumber = isNaN(parseInt(boxInput.value));
    if (length > 0 && isnumber == false) {
      console.log("error");
      boxInput.value = "";
      this.showNotification('top', 'center', 'Field name cannot start with a number', '', 'danger');
    }
  }

  onKeyUpField(boxInput: HTMLInputElement, e: KeyboardEvent) {
    let length = boxInput.value.length;
    let isnumber = isNaN(parseInt(boxInput.value));
    if (length > 0 && isnumber == false) {
      console.log("error");
      boxInput.value = "";
      this.showNotification('top', 'center', 'Field name cannot start with a number', '', 'danger');
    }
  }
  optionWasClickedright(optionClicked) {
    this.target.forEach((option) =>
      option.selected = (optionClicked == option) ? true : false)
  }

  optionWasClickedleft(optionClicked) {
    this.source.forEach((option) => option.selected = (optionClicked == option) ? true : false)
  }

  public selectById(e: any) {
    this.lockQuestions = true;
    this.target.forEach(item => {
      if (item.selected) {
        this.ImportAdd.fieldName = item.fieldName;
        this.ImportAdd.databaseType = item.databaseType;
      }
    });
  }

  public moveSelected(direction) {
    if (direction === 'left') {
      this.target.forEach(item => {
        if (item.selected) {
          this.source.push(item);
          item.selected == false;
        }
      });
      this.target = this.target.filter(i => !i.selected);
    } else {
      this.source.forEach(item => {
        if (item.selected) {
          this.target.push(item);
          item.selected == false;
        }
      });
      this.source = this.source.filter(i => !i.selected);
    }
  }

  public moveAll(direction) {
    if (direction === 'left') {
      this.source = [...this.source, ...this.target];
      this.target = [];
    } else {
      this.target = [...this.target, ...this.source];
      this.source = [];
    }
  }
  //#endregion
}