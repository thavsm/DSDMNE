import { Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { MatPaginator } from '@angular/material/paginator';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { TreediagramService } from 'src/app/treediagram.service';
import { PageSizeItem } from "@progress/kendo-angular-grid";
import { GroupDescriptor } from '@progress/kendo-data-query';

@Component({
  selector: 'app-indicatorhistory',
  templateUrl: './indicatorhistory.component.html',
  styleUrls: ['./indicatorhistory.component.css']
})
export class IndicatorhistoryComponent implements OnInit {
  @Input() formData?: any;


  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Output() newItemEvent = new EventEmitter<any>();

  title = 'Grid Grouping';

  constructor(public dialogRef: MatDialogRef<IndicatorhistoryComponent>, private element: ElementRef, private fb: FormBuilder, private service: TreediagramService, private spinner: NgxSpinnerService, public dialog: MatDialog,  @Inject(MAT_DIALOG_DATA) public data: any) {
    
  }

  public pageSize = 300;
  public pageSizes: Array<number | PageSizeItem> = [5, 10, 20, {  text: 'All',  value: 'all' }];
  public gridView: any[];
  public indicatorID = 0;
  public formcapturedID = 0;
  public locationTypeID =0;
  public locationID =0;
  public year=0;
  public month=0;
  public indicatorName='';

  ngOnInit(): void {

    console.log(this.data);
   
    if(!isNaN(Number(this.data["indicatorID"]))){
      this.indicatorID = Number(this.data["indicatorID"]);
    } else{
        this.indicatorID = 0;
    }

    if(!isNaN(Number(this.data["formcapturedID"]))){
      this.formcapturedID = Number(this.data["formcapturedID"]);
    } else{
        this.formcapturedID = 0;
    }

    this.refreshFormsList();
    
  }

  refreshFormsList() {
    this.spinner.show();
    this.service.getIndicatorsDataApprovalHistory(this.indicatorID, this.formcapturedID).subscribe(data => {
      console.log(data);
      this.gridView=data;
      
      this.spinner.hide();
    });
  }

  public onPageChange(state: any): void {
    this.pageSize = state.take;
  }

  closePopup() {
    this.dialogRef.close();
  }

}
