import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HierarchyManagementService } from 'src/app/hierarchy-management.service';
import {NgxSpinner, NgxSpinnerService} from 'ngx-spinner';

import { DatePipe } from '@angular/common';

import { merge } from 'jquery';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-tree-add',
  templateUrl: './tree-add.component.html',
  styleUrls: ['./tree-add.component.css']
})
export class TreeAddComponent implements OnInit {

  submitted = false;
  treeAdd: any;

  
  constructor(public dialogRef: MatDialogRef<TreeAddComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private service: HierarchyManagementService, public formBuilder: FormBuilder,private spinner: NgxSpinnerService, public datepipe: DatePipe)  
    { 
      this.treeAdd = data;  
    }

  treeID: number = 0;
  name: string = "";
  description: string = "";
  dateCreated: string = "";
  status: string = "";
  currentDate : any;
  treeCategoryID: number = 1;
  
  ngOnInit(): void {
    this.treeID = this.treeAdd.treeID;
    this.name = this.treeAdd.name;
    this.description = this.treeAdd.description;
    this.dateCreated = this.treeAdd.dateCreated;

  }

  closePopup() {
    this.dialogRef.close();
  }
  
  addTree() {
    if (this.treeAdd.name != "") {
      //adding form
      this.submitted = true;
      this.currentDate = new Date();
      var val = {
        "treeID": 0,
        "name": this.treeAdd.name,
        "description": this.treeAdd.description,
        "dateCreated": this.datepipe.transform(this.currentDate, 'yyyy-MM-dd') + "T"+ this.datepipe.transform(this.currentDate, 'HH:mm:ss.SSS') +"Z",        
        //this.datepipe.transform((new Date), 'yyyy-mm-dd hh:mm:ss.SSS'),
        "status": "1",
        "treeCategoryID" : this.treeAdd.treeCategoryID
      };
      this.spinner.show();
      this.service.addTree(val).subscribe(res => {
        this.dialogRef.close();
        this.spinner.hide();
        this.showNotification('top', 'center', 'Tree added successfully!', '', 'success');          
        this.service.refreshhlist(this.treeAdd.treeCategoryID);
      });
      this.treeID = this.treeAdd.treeID;
      this.name = this.treeAdd.name;
      this.description = this.treeAdd.description;
      this.dateCreated = this.treeAdd.dateCreated;
      this.status = "1";
      this.treeCategoryID = this.treeAdd.treeCategoryID;

    }
    else {
      this.showNotification('top', 'center', 'Please add a tree name before saving!', '', 'danger');
    }
  }

  updateTree() {
    if (this.treeAdd.Name != "") {
      //updating form
      this.submitted = true;
      // stop here if form is invalid
      var val = {
        treeID : this.treeAdd.treeID,
        name : this.treeAdd.name,
        description : this.treeAdd.description,
        dateCreated : this.treeAdd.dateCreated,
        status : "1",
        treeCategoryID : this.treeAdd.treeCategoryID
      };
      this.spinner.show();
      this.service.updateTreeDetails(this.treeAdd.treeID, val).subscribe(res => {
        this.dialogRef.close();
        this.spinner.hide();
        this.showNotification('top','center','Tree updated successfully!','','success');
        this.service.refreshhlist(this.treeAdd.treeCategoryID);
      });
    }
    else {
      this.showNotification('top','center','Please add a tree name before saving!','','danger');
    }
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
