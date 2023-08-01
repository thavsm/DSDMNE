import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FormbuilderService } from 'src/app/shared/formbuilder.service'
import { FormAddComponent } from 'src/app/form-list/form-add/form-add.component';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2'
import { merge } from 'jquery';
import { AddformrolesComponent } from '../addformroles/addformroles.component';
declare var $: any;

export interface FormData {
  name: string;
  description: string;
}
@Component({
  selector: 'app-formroles',
  templateUrl: './formroles.component.html',
  styleUrls: []
})
export class FormrolesComponent implements OnInit {

  constructor(public dialog: MatDialog, private route: Router, private service: FormbuilderService, private spinner: NgxSpinnerService) { }
  userDetail: any;
  formAdd: any;
  public displayedColumns = ['formName', 'formDescription','formCategory', 'roles'];
  //public formList = new MatTableDataSource<any>();
  public formList: any[];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    //this.formList.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.refreshFormsList();
    // this.formList.filterPredicate = function(data, filter: string): boolean {
    //   return data.formName.toLowerCase().includes(filter) || data.formDescription.toLowerCase().includes(filter) || data.formCategory.toString().includes(filter) === filter;
    // };
  }


  openFormDesign(item: any): void {
    // Create item:
    let myObj = {
      formID: item.formID,
      formTypeID: item.formTypeID,
      formCategoryID: item.formCategoryID,
      formName: item.formName,
      formDescription: item.formDescription,
      dateCreated: item.dateCreated,
      createdByUserID: item.createdByUserID,
      isLocked: item.isLocked,
      lockedByUserID: item.lockedByUserID,
      isDeleted: item.isDeleted,
      dateLocked: item.dateLocked,
      dateLastModified: item.dateLastModified,
      lastModifiedByUserID: item.lastModifiedByUserID
    };
    localStorage.setItem('formDesignInfo', JSON.stringify(myObj));
    this.route.navigate(['formDesign']);
  }

  clickEdit(item: any) {
    this.formAdd = item;
    const dialogRef = this.dialog.open(AddformrolesComponent, {
      width: '60%',
      height: '60%',
      data: this.formAdd,
      disableClose:false
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.refreshFormsList();
    });
  }


  refreshFormsList() {
    this.spinner.show();
    this.service.getDynamicFormList(this.userDetail.formData.location).subscribe(data => {
      //this.formList.data = data;
      this.formList = data;
      this.spinner.hide();
    });
  }

  // applyFilter(data: any) {
  //   let filterValue:string=data.target.value;
  //   filterValue = filterValue.trim(); // Remove whitespace
  //   filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
  //   this.formList.filter = filterValue;
  // }

  public doFilter = (event: any) => {
    this.formList.filter = event.target.value.trim();
  }
 
}
