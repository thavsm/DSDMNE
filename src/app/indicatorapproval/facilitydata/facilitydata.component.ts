import { Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { MatPaginator } from '@angular/material/paginator';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { TreediagramService } from 'src/app/treediagram.service';
import { PageSizeItem } from "@progress/kendo-angular-grid";
import { GroupDescriptor } from '@progress/kendo-data-query';
import { ApprovalFormComponent } from 'src/app/calc-report/approval-form/approval-form.component'

@Component({
  selector: 'app-facilitydata',
  templateUrl: './facilitydata.component.html',
  styleUrls: ['./facilitydata.component.css']
})
export class FacilitydataComponent implements OnInit {
  @Input() formData?: any;


  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Output() newItemEvent = new EventEmitter<any>();

  title = 'Grid Grouping';

  
  constructor(public dialogRef: MatDialogRef<FacilitydataComponent>, private element: ElementRef, private fb: FormBuilder, private service: TreediagramService, private spinner: NgxSpinnerService, public dialog: MatDialog,  @Inject(MAT_DIALOG_DATA) public data: any) {
    
  }
  public pageSize = 300;
  public pageSizes: Array<number | PageSizeItem> = [5, 10, 20, {
    text: 'All',
    value: 'all'
     }];

  public gridView: any[];
  public gridViewProvince: any[];
  public isNational = false;
  public isProvince = false;
  public isDistrict = false;
  public isServicePoint = false;

  public indicatorID = 0;
  public locationTypeID =0;
  public locationID =0;
  public year=0;
  public month=0;
  public indicatorName='';
  public indicatorLocation=0;

  public facIndicator = false;
  public spIndicator = false;
  public provIndicator = false;

  //public groupsServicePoint: GroupDescriptor[] = [{ }];
  public groupsDistrict: GroupDescriptor[] = [{ field: "servicePoint" }]; //, {field: "facilityID"}, {field: "facilityName"}];
  public groupsProvince: GroupDescriptor[] = [{ field: "district" }, { field: "servicePoint" }]; //, {field: "facilityID"}, {field: "facilityName"}];
  public groupsNational: GroupDescriptor[] = [{ field: "province" }, { field: "district" }, { field: "servicePoint" }]; //, {field: "facilityID"}, {field: "facilityName"}];
    
  ngOnInit(): void {
    
    console.log(this.data);

    this.indicatorName = this.data["indicator"];
    
    if(!isNaN(Number(this.data["indicatorID"]))){
      this.indicatorID = Number(this.data["indicatorID"]);
    } else{
        this.indicatorID = 0;
    }

    if(!isNaN(Number(this.data["locationID"]))){
      this.locationID = Number(this.data["locationID"]);
    } else{
        this.locationID = 0;
    }

    if(!isNaN(Number(this.data["locationTypeID"]))){
      this.locationTypeID = Number(this.data["locationTypeID"]);
    } else{
        this.locationTypeID = 0;
    }

    if(!isNaN(Number(this.data["month"]))){
      this.month = Number(this.data["month"]);
    } else{
        this.month = 0;
    }

    if(!isNaN(Number(this.data["year"]))){
      this.year = Number(this.data["year"]);
    } else{
        this.year = 0;
    }

    if(!isNaN(Number(this.data["indLocation"]))){
      this.indicatorLocation = Number(this.data["indLocation"]);
    } else{
        this.indicatorID = 0;
    }

    
    this.provIndicator = false;
    this.spIndicator = false;
    this.facIndicator = false;

    switch (this.indicatorLocation)
    {
      case 4261: this.provIndicator = true; break;
      case 4263: this.spIndicator = true; break;
      case 4264: this.facIndicator = true; break;
    }
    //this.locationTypeID=4260;
    this.isNational = false;
    this.isProvince = false;
    this.isDistrict = false; 
    this.isServicePoint = false; 

    switch(this.locationTypeID)
      {
        case 4260: this.isNational = true; break;
        case 4261: this.isProvince = true; break;
        case 4262: this.isDistrict = true; break;
        case 4263: this.isServicePoint = true; break;
        break;
        
      }
      

    // this.month = 4;
    // this.year = 2022;

    this.refreshFormsList();
  }

  public onPageChange(state: any): void {
    this.pageSize = state.take;
  }

  refreshFormsList() {
    this.spinner.show();
    this.service.getFacilityIndicatorsDataApproval(this.indicatorID, this.locationTypeID, this.locationID, this.year, this.month).subscribe(data => {
      console.log(data);
      this.gridView=data;
      
      this.spinner.hide();
    });
  }

  openFormDesign(item: any,index:any): void {
    console.log(item);
    const dialogRef = this.dialog.open(ApprovalFormComponent, {
      width: '85%',
      height: '85%',
      disableClose:true,
      data:item
    }).afterClosed().subscribe(() => { this.refreshFormsList(); });
  }
  
  closePopup() {
    this.dialogRef.close();
  }


}
