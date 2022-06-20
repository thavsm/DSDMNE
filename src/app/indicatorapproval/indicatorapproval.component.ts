import { Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../shared/user.service';

import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { MatPaginator } from '@angular/material/paginator';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { TreediagramService } from 'src/app/treediagram.service';
import { AddFormComponent } from '../form-capture/add-form/add-form.component';
import { PageSizeItem } from "@progress/kendo-angular-grid";
import { GroupDescriptor } from '@progress/kendo-data-query';

import { ApprovalFormComponent } from '../calc-report/approval-form/approval-form.component'



@Component({
  selector: 'app-indicatorapproval',
  templateUrl: './indicatorapproval.component.html',
  styleUrls: []
})
export class IndicatorapprovalComponent implements OnInit {
  @Input() formData?: any;
  @Input() isParent?: boolean;

  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Output() newItemEvent = new EventEmitter<any>();

  title = 'Grid Grouping';


  constructor(private element: ElementRef, private fb: FormBuilder, private service: TreediagramService, @Inject(MAT_DIALOG_DATA) public data: any, private spinner: NgxSpinnerService, public dialog: MatDialog) {
    
  }
  public pageSize = 300;
  public pageSizes: Array<number | PageSizeItem> = [5, 10, 20, {
    text: 'All',
    value: 'all'
     }];

  public gridView: any[];

  public groups: GroupDescriptor[] = [{ field: "programme" }, {field: "subProgram"}, {field: "indicator"}, {field: "district"}];
  
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
