//* <summary>
//* Gives the ability to the user to be able to assigns indicators to roles and vice versa
//* </summary>
//* <author>Katelyn Govender</author>
//* <dateLastModified>May 2022</dateLastModified>
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { PageSizeItem } from '@progress/kendo-angular-grid';
import { NgxSpinnerService } from 'ngx-spinner';
import { HierarchyManagementService } from '../hierarchy-management.service';
import { FormbuilderService } from '../shared/formbuilder.service';
import { UserService } from '../shared/user.service';
import { AssignRolesComponent } from './assign-roles/assign-roles.component';
declare var $: any;

@Component({
  selector: 'app-fieldrole',
  templateUrl: './fieldrole.component.html',
  styleUrls: ['./fieldrole.component.css']
})

export class FieldroleComponent implements OnInit {

  constructor(public dialog: MatDialog,private userService: UserService, private service: FormbuilderService, private spinner: NgxSpinnerService, private _formBuilder: FormBuilder,private treeService:HierarchyManagementService) { }

  //#region Variables
  format = {
    add: 'Assign Indicator', remove: 'Unassign Indicator', all: 'Select All', none: 'Deselect All',
    direction: 'left-to-right', draggable: true, locale: 'undefined'
  };
  userRoles: any;
  IndicatorList:any;
  key: string;
  station: string;
  roleID:any;
  treeList:any;
  treeID:any;
  searchTreeID:any;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  IndicatorRoleList:any[];
  assigned=[];
  source=[];
  public pageSize = 10;
  public pageSizes: Array<number | PageSizeItem> = [5, 10, 20, {text: 'All', value: 'all' }];
  @ViewChild('stepper') private myStepper: MatStepper; //allows to move to next/previous step programmatically
  //#endregion

  ngOnInit(): void {
    this.getUserRoles();
    this.getTrees();
    this.firstFormGroup = this._formBuilder.group({
      tree: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      roleName: ['', Validators.required],
    });
  }

  refreshList(){
    this.spinner.show();
    this.service.GetIndicatorRoleView(this.searchTreeID).subscribe(data => {
      this.IndicatorRoleList = data;
      this.spinner.hide();
    });
  }

  getUserRoles(): void {
    this.userService.getRoles().subscribe(res => {
      this.userRoles = res;
    });
  };

  getTrees() {
    this.treeService.getTreeByCatergory(1).subscribe(res => {
      this.treeList = res;
    });
  };

  //Assigns indicator/s to a role
  assign():void{
    if(this.assigned.length==0){
      alert("Please select some indicators first");
    }
    else{
      this.treeService.assignIndicators(this.assigned,this.roleID,this.treeID).subscribe(res=>{
        this.showNotification('top', 'center', 'Indicators assigned successfully!', '', 'success');
        this.myStepper.previous();
        this.myStepper.previous();
      });
    }
  }

  //Returns all indicators that belong to a roles and a tree
  getAllIndicators():void{
    this.spinner.show();
    this.treeService.getIndicatorNodes().subscribe(res => {
      this.source = res;
      this.treeService.getAssignedIndicatorNodesByTreeRoleID(this.roleID, this.treeID).subscribe(val => {
        this.assigned = val;
        this.spinner.hide();
      });
    });
  }

  onPageChange(state: any): void {
    this.pageSize = state.take;
  }

  //Filters Grid to show all indicators that belong to a tree that have roles assigned to them 
  Search(){
    if(this.searchTreeID!=null || this.searchTreeID!==undefined){
      this.refreshList();
    } 
  }

  //Opens a pop-up for user to assign role/s to the indicators
  assignRoles(data:any){
    console.log(data.indicatorID)
    let item={
      indicatorID:data.indicatorID,
      treeID:this.searchTreeID
    }
    localStorage.setItem('roleAssignData', JSON.stringify(item));
    const dialogRef = this.dialog.open(AssignRolesComponent, {
      width: '35%',
      height: '45%',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      this.Search();
    });
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
