//libraries
import { Component, OnInit, ViewChild,Inject  } from '@angular/core';
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
import {NgxSpinner, NgxSpinnerService} from 'ngx-spinner';

import { DatePipe } from '@angular/common';

import { merge } from 'jquery';
import * as moment from 'moment';
@Component({
  selector: 'app-internal-data-import',
  templateUrl: './internal-data-import.component.html',
  styleUrls: ['./internal-data-import.component.css']
})
export class InternalDataImportComponent implements OnInit {

  divUsername: boolean  = false;
  divPassword: boolean  = false;
  xpandStatus: boolean  = false;
	fieldNameId: string;
	fieldName: string;
  source = [];
	target = [];
  
  name = new FormControl('', [
    Validators.required,
  ]);

  constructor(
    
    public dialog: MatDialog,private service: DataManagementService ,private route: Router,private spinner: NgxSpinnerService) { }

  public pageSize = 5;
  public skip = 0;

  public internalDataList : any[];
  public ImportAdd:any=[];
  public DataType:any=[];
  public ImportType:any=[];
  public TableStructure:any=[];
  public LookupFieldName:any=[];

  public displayedColumns = ['uploadName', 'folderLocation','timestamp','update','intrldetails'];
  @ViewChild(MatAccordion) accordion: MatAccordion;
  
  formInternal: any;
  formPatientInfo:any;


  ngOnInit(): void {
    this.intlDataList();
    this.bindControls();
  }

  onDataTypeChange(ob) {

  if(ob.value == 3){
      
      this.divUsername = true;
      this.divPassword = true;

    }else{
      
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
      this.spinner.hide();
    });
  }

  list1 = [
    { text: 'item 1', selected: false },
    { text: 'item 2', selected: false },
    { text: 'item 3', selected: false },
    { text: 'item 4', selected: false },
    { text: 'item 5', selected: false }
  ];
  list2 = [
    { text: 'item 6', selected: false },
    { text: 'item 7', selected: false }
  ];

  public toggleSelection(item, list) {
    item.selected = !item.selected;
  }

  public moveSelected(direction) {
    if (direction === 'left') {
      this.list2.forEach(item => {
        if (item.selected) {
          this.list1.push(item);
        }
      });
      this.list2 = this.list2.filter(i => !i.selected);
    } else {
      this.list1.forEach(item => {
        if (item.selected) {
          this.list2.push(item);
        }
      });
      this.list1 = this.list1.filter(i => !i.selected);
    }
  }

  public moveAll(direction) {
    if (direction === 'left') {
      this.list1 = [...this.list1, ...this.list2];
      this.list2 = [];
    } else {
      this.list2 = [...this.list2, ...this.list1];
      this.list1 = [];
    }
  }

  ViewPatientInfo(): void {
    
    const dialogRef = this.dialog.open(ViewInternalDataImportComponent, {
      width:"60%",
      data: this.formPatientInfo,
      disableClose:true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.intlDataList();
    });
  }

  
  clickEdit(item: any) {

    this.xpandStatus = true;
    this.ImportAdd.uploadName = item.uploadName;
    this.ImportAdd.dataTypeId = item.dataTypeId;
    this.ImportAdd.uploadTypeId = item.uploadTypeId;
    this.ImportAdd.uploadTableStructureId = item.tableStructureID;
    this.ImportAdd.username = item.username;
    this.ImportAdd.password = item.password;

    if(item.dataTypeId == 3){
      
      this.divUsername = true;
      this.divPassword = true;

    }else{
      
      this.divUsername = false;
      this.divPassword = false;
    }

    // this.source  = [ 'Pawn', 'Rook', 'Knight', 'Bishop', 'Queen', 'King' ];
    
    this.spinner.show();
    this.service.getLookupFieldNameByUploadId(item.treeUploadID).subscribe(data => {
      this.source = data;
      this.target = data;
      this.spinner.hide();
    });


  }
}
