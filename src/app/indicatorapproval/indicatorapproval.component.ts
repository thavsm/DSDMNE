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
import { FacilitydataComponent } from './facilitydata/facilitydata.component';


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


  constructor(private element: ElementRef, private fb: FormBuilder, private service: TreediagramService, private spinner: NgxSpinnerService, public dialog: MatDialog,  @Inject(MAT_DIALOG_DATA) public data: any, private userService:UserService) {
    
  }
  public pageSize = 300;
  public pageSizes: Array<number | PageSizeItem> = [5, 10, 20, {
    text: 'All',
    value: 'all'
     }];

  public gridView: any[];
  public gridViewProvince: any[];
  public gridViewNational: any[];
  public isNational = false;  

  public locationTypeID =0;
  public locationID =0;
  public monthID =0;
  public year=0;
  public wfid = 0;
  public taskID=0;
  public monthName='';
  indicatorData:any;

  public processName='';
  public taskName='';
  public endDate='';
  public roleID=0;
  public userID=0;

  public groups: GroupDescriptor[] = [{ field: "programme" }, {field: "subProgram"}];
  public groupsNational: GroupDescriptor[] = [{ field: "chiefdirectorate" }, {field: "directorate"}];
  
  ngOnInit(): void {

    this.wfid = Number(new URLSearchParams(window.location.search).get('workflowid'));
    this.taskID = Number(new URLSearchParams(window.location.search).get('taskid'));
    
    console.log(this.wfid);
    console.log(this.taskID);
    
    if(Object.keys(this.data).length ==0) {
      this.userService.getUserProfile().subscribe(
        res => {
          
          this.formData = res['formData'];
          console.log(this.formData);

          this.userID = this.formData['userID'];

          this.roleID = this.formData["role"];
          console.log(this.roleID);
          if(!isNaN(Number(this.formData["location"]))){
            this.locationID = Number(this.formData["location"]);
          } else{
              this.locationID = 0;
          }

          if(!isNaN(Number(this.formData["locationType"]))){
            this.locationTypeID = Number(this.formData["locationType"]);
          } else{
              this.locationTypeID = 0;
          }

          this.getTaskDetails();
          // this.monthID = 5;
          // this.monthName = 'May';
          // this.year = 2022;
          
          
          
        },
        err => {
          console.log(err);
        },
      );
    }


  }

  public onPageChange(state: any): void {
    this.pageSize = state.take;
  }

  refreshFormsList() {
    this.spinner.show();
    
    //this.service.getIndicatorsDataApproval_PS(this.locationTypeID, this.locationID, this.monthID, this.year, this.roleID, this.wfid).subscribe(data => {
    this.service.getIndicatorsDataApproval_PS_User(this.locationTypeID, this.locationID, this.monthID, this.year, this.roleID, this.wfid, this.userID).subscribe(data => {
      this.gridView=data;
      switch(this.locationTypeID)
      {
        case 4260: this.gridViewNational=data;
        this.isNational = true;
        break;
        case 4261: 
        case 4262: 
        case 4263: this.gridViewProvince=data;
        this.isNational = false;
        break;
        
      }
      
      this.spinner.hide();
    });
  }

  openFormDesign(item: any,index:any): void {
    console.log(item);

    this.indicatorData = {  
      indicator: item["indicator"],    
      indicatorID: item["indicatorID"],
      locationTypeID: this.locationTypeID,
      locationID: this.locationID,
      year: this.year,
      month: this.monthID,
      indLocation: item["indicatorLocation"],
      userID: this.userID
    }
    
    const dialogRef = this.dialog.open(FacilitydataComponent, {
      width: '85%',
      height: '85%',
      disableClose:true,
      data: this.indicatorData,      
    }).afterClosed().subscribe(() => { this.refreshFormsList(); });
  }

  getTaskDetails() {
    this.spinner.show();
    this.service.getTaskDetails(this.taskID).subscribe(data => {

      console.log(data);
      this.formData = data['0'];
      this.processName = this.formData["process"];
      this.taskName = this.formData["task"];
      this.endDate = this.formData["endDate"];
      this.year = this.formData["year"];
      this.monthID = this.formData["month"];

      switch(this.monthID)
      {
        case 1: this.monthName = 'January'; break;
        case 2: this.monthName = 'February'; break;
        case 3: this.monthName = 'March'; break;
        case 4: this.monthName = 'April'; break;
        case 5: this.monthName = 'May'; break;
        case 6: this.monthName = 'June'; break;
        case 7: this.monthName = 'July'; break;
        case 8: this.monthName = 'August'; break;
        case 9: this.monthName = 'September'; break;
        case 10: this.monthName = 'October'; break;
        case 11: this.monthName = 'November'; break;
        case 12: this.monthName = 'December'; break;
        
      }
      this.refreshFormsList();
      
    });

    this.spinner.hide();
  }

  
}
