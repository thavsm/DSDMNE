import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { HierarchyManagementService } from '../hierarchy-management.service';
import { hierarchyManagement } from '../hierarchy-management/hierarchy-management.model';
import { FormbuilderService } from '../shared/formbuilder.service';
import { UserService } from '../shared/user.service';
import { TreediagramService } from '../treediagram.service';
declare var $: any;

@Component({
  selector: 'app-fieldrole',
  templateUrl: './fieldrole.component.html',
  styleUrls: ['./fieldrole.component.css']
})

export class FieldroleComponent implements OnInit {

  constructor(private userService: UserService, private service: FormbuilderService, private spinner: NgxSpinnerService, private _formBuilder: FormBuilder,private treeService:HierarchyManagementService) { }

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
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  assigned=[];

  source=[];

  @ViewChild('stepper') private myStepper: MatStepper;

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

  assign():void{
    if(this.assigned.length==0){
      alert("Please select some indicators first");
    }
    else{
      this.treeService.assignIndicators(this.assigned,this.roleID,this.treeID).subscribe(res=>{
        this.showNotification('top', 'center', 'Assigned Indicators Successfully!', '', 'success');
        this.myStepper.previous();
        this.myStepper.previous();
      });
    }
  }

  filterIndicatorsByRole():void{
   this.getAllIndicators();
  }

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

}
