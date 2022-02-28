import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FormbuilderService } from '../shared/formbuilder.service';
import { FormAddComponent } from './form-add/form-add.component';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2'
import { merge } from 'jquery';
import { UserService } from '../shared/user.service';
declare var $: any;

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.css']
})
export class FormListComponent implements OnInit {

  constructor(public dialog: MatDialog, private route: Router, private service: FormbuilderService, private spinner: NgxSpinnerService,public userService: UserService) { }

  formAdd: any;
  userDetail:any;
  public displayedColumns = ['displayName', 'formDescription', 'formCategory', 'formDetails', 'update', 'delete'];
  public formList :any[];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    //this.formList.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.refreshFormsList();
    // this.formList.filterPredicate = function (data, filter: string): boolean {
    //   return data.formName.toLowerCase().includes(filter) || data.formDescription.toLowerCase().includes(filter) || data.formCategory.toString().includes(filter) === filter;
    // };
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetail = res;
      },
      err => {
        console.log(err);
      },
    );
  }


  clickDelete(item: any) {
    Swal.fire({
      title: 'Are you sure you want to delete ' + item.formName + ' form?',
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
        this.service.archiveDynamicForm(item.formID).subscribe(data => {
          this.spinner.hide();
          this.refreshFormsList();
          this.showNotification('top', 'center', 'Form Deleted Successfully!', 'Success.', 'success');
        });
      }
    })
  }


  openFormDesign(item: any): void {
    if (item.isLocked === true) {
      this.service.getLockedByUserName(item.lockedByUserID).subscribe(res=>{
        this.showNotification('top', 'center', 'This form is locked and being edited by '+res, '', 'danger');
      });
    }
    else {
      item.lockedByUserID=this.userDetail.formData.userID;
      this.service.lockForm(item.formID,item).subscribe(res => {
        let myObj = {
          formID: item.formID,
          formTypeID: item.formTypeID,
          formCategoryID: item.formCategoryID,
          formName: item.formName,
          displayName:item.displayName,
          formDescription: item.formDescription,
          dateCreated: item.dateCreated,
          createdByUserID: item.createdByUserID,
          isLocked: true,
          lockedByUserID: this.userDetail.formData.userID,
          isDeleted: item.isDeleted,
          dateLocked: item.dateLocked,
          dateLastModified: item.dateLastModified,
          lastModifiedByUserID: item.lastModifiedByUserID,
          publishStatus:item.publishStatus
        };
        localStorage.setItem('formDesignInfo', JSON.stringify(myObj));
        this.userService.setMenuShow(false);
        this.route.navigate(['formDesign']);
      });
    }
  }

  clickEdit(item: any) {
    this.formAdd = item;
    const dialogRef = this.dialog.open(FormAddComponent, {
      width: '75%',
      height: '75%',
      data: this.formAdd,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.refreshFormsList();
    });
  }

  openDialogAdd(): void {
    this.formAdd = {
      formID: 0,
      formTypeID: 0,
      formCategoryID: 0,
      formName: "",
      displayName:"",
      formDescription: "",
      dateCreated: "",
      createdByUserID: 0,
      isLocked: "",
      lockedByUserID: 0,
      isDeleted: "",
      dateLocked: "",
      dateLastModified: "",
      lastModifiedByUserID: 0,
      publishStatus:0
    }
    const dialogRef = this.dialog.open(FormAddComponent, {
      width: '75%',
      height: '75%',
      data: this.formAdd,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.refreshFormsList();
    });
  }

  refreshFormsList() {
    this.spinner.show();
    this.service.getDynamicFormList().subscribe(data => {
      this.formList = data;
      this.spinner.hide();
    });
  }

  applyFilter(data: any) {
    let filterValue: string = data.target.value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
   // this.formList.filter = filterValue;
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
