import { Component, Inject, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { HierarchyManagementService } from '../hierarchy-management.service';
import { __assign } from 'tslib';
import { Router } from '@angular/router';
import { Observable, Subscription } from "rxjs";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TreeAddComponent } from './tree-add/tree-add.component';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';  
import Swal from 'sweetalert2'
import { PageSizeItem } from "@progress/kendo-angular-grid";
import { GroupDescriptor } from '@progress/kendo-data-query';
import { DataBindingDirective } from '@progress/kendo-angular-grid';

declare var $: any;

export interface FormData {
  name: string;
  description: string;
}

@Component({
  selector: 'app-hierarchy-management',
  templateUrl: './hierarchy-management.component.html',
  styleUrls: ['./hierarchy-management.component.css']
})


export class HierarchyManagementComponent implements OnInit {
  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
  dataSaved = false;
  TreeForm: any;

  tree: any;
  private _snackBar: any;
  verticalPosition: any;
  horizontalPosition: any;
  treeID: number;
  treeAdd: any;
  TreeCategoryID = "0";

  constructor(public service: HierarchyManagementService, private route: Router, public dialog: MatDialog, private spinner: NgxSpinnerService, private Aroute: ActivatedRoute) {
     
    this.Aroute.queryParamMap.subscribe(params => this.TreeCategoryID = params.get('TreeCategoryID'));
  }

  p: number = 1;


  ngOnInit(): void {
    this.service.refreshhlist(this.TreeCategoryID);
  }

  openViewTree(item: any): void {
    // Create item:
    let myObj = {
      treeID: item.treeID,
      ViewEdit: 0
    };
    localStorage.setItem('treeData', JSON.stringify(myObj));
    this.route.navigate(['treediagram']);
  }

  openEditTree(item: any): void {
    // Create item:
    let myObj = {
      treeID: item.treeID,
      ViewEdit: 1
    };
    localStorage.setItem('treeData', JSON.stringify(myObj));
    this.route.navigate(['treediagram']);
  }
  public edit = (dataItem, rowIndex): void => {
    console.log(dataItem, rowIndex);
  }
  @ViewChild('buttonTemplate')
  public buttonTemplate: TemplateRef<any>;

  public gridData: any = this.service.refreshhlist(this.TreeCategoryID);

  openDialogAdd(): void {

    this.treeAdd = {
      treeID : 0,
      name : "",
      description : "",
      dateCreated : "",
      treeCategoryID : this.TreeCategoryID
    }

    const dialogRef = this.dialog.open(TreeAddComponent, { width: '40%', height: '50%', data: this.treeAdd, disableClose: true }

    );

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  clickDelete(item: any) {
    Swal.fire({
      title: 'Are you sure you want to delete ' + item.name + ' tree?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      toast: true,
      position: 'top',
      allowOutsideClick: false,
      confirmButtonColor: '#000000',
      cancelButtonColor: '#000000'
    }).then((result) => {
      if (result.value) {
        this.spinner.show();
        this.service.archiveTree(item.treeID).subscribe(data => {
          this.spinner.hide();
          this.showNotification('top','center','Tree Deleted Succesfully!','Success.','success');
          this.service.refreshhlist(this.TreeCategoryID);
        });
      }
    })
  }

  clickEdit(item: any) {
    this.treeAdd = item;
    const dialogRef = this.dialog.open(TreeAddComponent, {
      width: '40%',
      height: '50%',
      data: this.treeAdd,
      disableClose:true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.service.refreshhlist(this.TreeCategoryID);
    });
  }

  SavedSuccessful(isUpdate) {
    if (isUpdate == 0) {
      this._snackBar.open('Record Updated Successfully!', 'Close', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
    else if (isUpdate == 1) {
      this._snackBar.open('Record Saved Successfully!', 'Close', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
    else if (isUpdate == 2) {
      this._snackBar.open('Record Deleted Successfully!', 'Close', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
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
}

