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
import { UserService } from '../shared/user.service';

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
  divHide: boolean  = true; 
  divDeleteHide: boolean  = false; 
  userData: any;

  constructor(public userService: UserService ,public service: HierarchyManagementService, private route: Router, public dialog: MatDialog, private spinner: NgxSpinnerService, private Aroute: ActivatedRoute) {
     
    this.Aroute.queryParamMap.subscribe(params => this.TreeCategoryID = params.get('TreeCategoryID'));
  }

  p: number = 1;


  ngOnInit(): void {
    this.service.refreshhlist(this.TreeCategoryID);

    if(this.TreeCategoryID == "2"){
      this.divHide = false;
      this.divDeleteHide = false;
    }

    this.userService.getUserProfile().subscribe(data => {
      this.userData = data['formData'];

      if (this.userData["role"] != "1")
        this.divDeleteHide = false;
      else
        this.divDeleteHide = true;
    });

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
      ViewEdit: 1,
      TreeCategoryID: this.TreeCategoryID
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

    const dialogRef = this.dialog.open(TreeAddComponent, { width: '40%', data: this.treeAdd, disableClose: true }

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
          this.showNotification('top','center','Tree deleted succesfully!','','success');
          this.service.refreshhlist(this.TreeCategoryID);
        });
      }
    })
  }

  clickEdit(item: any) {

    let myObj = {
      treeID: item.treeID,
      ViewEdit: 0,
      TreeCategoryID: this.TreeCategoryID
    };
    localStorage.setItem('treeData', JSON.stringify(myObj));

    this.treeAdd = item;
    const dialogRef = this.dialog.open(TreeAddComponent, {
      width: '40%',
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
      this._snackBar.open('Record updated successfully!', 'Close', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
    else if (isUpdate == 1) {
      this._snackBar.open('Record saved successfully!', 'Close', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
    else if (isUpdate == 2) {
      this._snackBar.open('Record deleted successfully!', 'Close', {
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

