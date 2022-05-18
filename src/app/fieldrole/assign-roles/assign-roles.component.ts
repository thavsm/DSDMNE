import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { HierarchyManagementService } from 'src/app/hierarchy-management.service';
import { FormbuilderService } from 'src/app/shared/formbuilder.service';
import { UserService } from 'src/app/shared/user.service';
import { FieldroleComponent } from '../fieldrole.component';
declare var $: any;

export interface lexdata {
  name: string;
  value: string;
} 

@Component({
  selector: 'app-assign-roles',
  templateUrl: './assign-roles.component.html',
  styleUrls: ['./assign-roles.component.css']
})
export class AssignRolesComponent implements OnInit {

  assignedRoles:any=[];
  roleAssignData:any=[];
  roleList:any=[];
  userRoles:any=[];

  constructor(private userService: UserService, private service: FormbuilderService, private spinner: NgxSpinnerService, private _formBuilder: FormBuilder,private treeService:HierarchyManagementService, public dialogRef: MatDialogRef<FieldroleComponent>) { }

  ngOnInit(): void {
    this.roleAssignData=JSON.parse(localStorage.getItem('roleAssignData')) || {};
    this.getUserRoles();
    this.getAssignedRoles();
  }

  //gets the roles that were assigned to the specific indicator
  getAssignedRoles(){;
    this.treeService.getAssignedRolesNodesByTreeIndicatorID(this.roleAssignData.indicatorID,this.roleAssignData.treeID).subscribe(res=>{
      let obj=[];
      let data=res;
      data.forEach(role=>{
        let r={
          name:JSON.parse(JSON.stringify(role)).name,
          value:JSON.parse(JSON.stringify(role)).Id
        }
        obj.push(r);
      });
      this.assignedRoles=obj;
    })
  }

  getUserRoles(): void {
    this.userService.getRoles().subscribe(res => {
      let obj=[];
      let data=res;
      data.forEach(role=>{
        let r={
          name:JSON.parse(JSON.stringify(role)).name,
          value:JSON.parse(JSON.stringify(role)).id
        }
        obj.push(r);
      });
      this.roleList = obj;
    });
  };
  
  //assigns roles to the indicator 
  assign():void{
    if(this.assignedRoles.length==0){
      alert("Please select some indicators first");
    }
    else{
      let obj=[];
      this.assignedRoles.forEach(role=>{
        obj.push(parseInt(role.value));
      });
      this.treeService.AssignRoles(this.roleAssignData.indicatorID,obj,this.roleAssignData.treeID).subscribe(res=>{
        this.showNotification('top', 'center', 'Assigned Roles Successfully!', '', 'success');
      });
    }
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

  compareFn(option1: lexdata, option2: lexdata) {
    return option1 && option2 ? option1.name === option2.name : option1 === option2;
  }

  closePopup() {
    this.dialogRef.close();
  }
}
