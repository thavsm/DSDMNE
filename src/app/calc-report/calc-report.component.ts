import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { MatPaginator } from '@angular/material/paginator';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { TreediagramService } from 'src/app/treediagram.service';
import { AddFormComponent } from '../form-capture/add-form/add-form.component';
import { PageSizeItem } from "@progress/kendo-angular-grid";
import { GroupDescriptor } from '@progress/kendo-data-query';

import { ApprovalFormComponent } from './approval-form/approval-form.component';
declare var $: any;

@Component({
  selector: 'app-calc-report',
  templateUrl: './calc-report.component.html',
  styleUrls: ['./calc-report.component.css']
})
export class CalcReportComponent implements OnInit {
  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public dialog: MatDialog, private route: Router, private service: TreediagramService, private spinner: NgxSpinnerService) { }

  public pageSize = 10;
  public pageSizes: Array<number | PageSizeItem> = [5, 10, 20, {
    text: 'All',
    value: 'all'
     }];

  public gridView: any[];

  public groups: GroupDescriptor[] = [{ field: "provincialProgram" }, {field: "provincialSubProgram"}];
  
  ngOnInit(): void {

    this.refreshFormsList();
  }

  public onPageChange(state: any): void {
    this.pageSize = state.take;
  }

  refreshFormsList() {
    this.spinner.show();
    this.service.getCalculationsReport().subscribe(data => {
      this.gridView=data;
      this.spinner.hide();
    });
  }

  openFormDesign(item: any,index:any): void {
    const dialogRef = this.dialog.open(ApprovalFormComponent, {
      width: '85%',
      height: '85%',
      disableClose:true
    });
  }

}
