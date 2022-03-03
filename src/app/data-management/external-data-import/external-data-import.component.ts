//libraries
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Router } from '@angular/router';
import { DataBindingDirective } from '@progress/kendo-angular-grid';

import { NgxSpinnerService } from 'ngx-spinner';

import { DataManagementService } from '../DataManagementService.service';
import { AddEditExternalDataComponent } from './add-edit-external-data/add-edit-external-data.component';

@Component({
  selector: 'app-external-data-import',
  templateUrl: './external-data-import.component.html',
  styleUrls: ['./external-data-import.component.css']
})
export class ExternalDataImportComponent implements OnInit {

  constructor(public dialog: MatDialog,private service: DataManagementService ,private route: Router,private spinner: NgxSpinnerService) { 
  }
  public pageSize = 5;
  public skip = 0;


  public externalDataList:any=[];
  

  formExternal: any;
  dataServiceID:any;
  dataSource:string;
  initialCatalog: string;
  password: string;
  status:string;
  connectString:string;
  externalDataServiceTypeID:any;
  userID:string;
  dataSUrl:string;
  connectionName: string;

  
  ngOnInit(): void {
    this.extlDataList()
  }

  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;


    clickEdit(item: any) {
      this.formExternal = item;

      const dialogRef = this.dialog.open(AddEditExternalDataComponent, {
        width: '500px',
        height: '720px',
        data: this.formExternal,
        disableClose:true
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.extlDataList();
      });
    }
  
    openDialogAdd(): void {
      this.formExternal = {
        dataServiceID: 0,
        dataSource: this.dataSource,
        dataSUrl:this.dataSUrl,
        initialCatalog: this.initialCatalog,
        userID: this.userID,
        password: this.password,
        externalDataServiceTypeID: this.externalDataServiceTypeID,
        status: 0,
        connectString:this.connectString
      }
      const dialogRef = this.dialog.open(AddEditExternalDataComponent, {
        width: '500px',
        height: '720px',
        data: this.formExternal,
        disableClose:true
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.extlDataList();
      });
    }


  extlDataList() {
    this.spinner.show();
    this.service.getextlDataList().subscribe(data => {
      this.externalDataList = data;
      this.spinner.hide();
    });
  }

}
