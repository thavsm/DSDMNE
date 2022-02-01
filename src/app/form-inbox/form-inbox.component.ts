import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FormbuilderService } from '../shared/formbuilder.service';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2'
import { merge } from 'jquery';
import { AddFormComponent } from '../form-capture/add-form/add-form.component';
declare var $: any;

@Component({
  selector: 'app-form-inbox',
  templateUrl: './form-inbox.component.html',
  styleUrls: ['./form-inbox.component.css']
})

export class FormInboxComponent implements OnInit {

  constructor(public dialog: MatDialog, private route: Router, private service: FormbuilderService, private spinner: NgxSpinnerService) { }

  formCapture: any;
  public displayedColumns = ['formTemplateName','formID','formcaptureID','formName','dateSent','timeSent','displayOne','displayTwo','geography', 'sentBy','stage','step','delete','file','photo','comments'];
  public formList = new MatTableDataSource<any>();
  PhotoCount:number=0;
  FileCount:number=0;
  CommentCount:number=0;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.formList.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.refreshFormsList();
    this.formList.filterPredicate = function(data, filter: string): boolean {
      return data.formName.toLowerCase().includes(filter);
    };
  }

  openFormDesign(item: any,index:any): void {
    let formCaptureObj = {
      formID: item.formID,
      formName:item.formName,
      formCaptureID:item.formCaptureID,
      state:'edit'
    };
    localStorage.setItem('formCaptureDetails', JSON.stringify(formCaptureObj));
    localStorage.setItem('tabIndex', index);
    const dialogRef = this.dialog.open(AddFormComponent, {
      width: '85%',
      height: '85%',
      disableClose:true
    });
    dialogRef.afterClosed().subscribe(result => {
      this.refreshFormsList();
      this.formList.filterPredicate = function(data, filter: string): boolean {
        return data.formName.toLowerCase().includes(filter);
      };
    });
  }

  refreshFormsList() {
    this.spinner.show();
    this.service.getCapturedForms().subscribe(data => {
      this.formList.data = data;
      this.spinner.hide();
    });
  }

  applyFilter(data: any) {
    let filterValue:string=data.target.value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.formList.filter = filterValue;
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

clickDelete(item: any) {
  Swal.fire({
    title: 'Are you sure you want to delete this form ?',
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
      this.service.deleteCapturedForm(item.formCaptureID).subscribe(data => {
        this.spinner.hide();
        this.refreshFormsList();
         this.showNotification('top','center','Form Deleted Successfully!','Success.','success');
      });
    }
  })
}

}
