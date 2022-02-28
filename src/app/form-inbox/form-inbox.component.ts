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
import { DataResult, process, State } from "@progress/kendo-data-query";
import { groupBy } from '@progress/kendo-data-query';
import { DataBindingDirective } from '@progress/kendo-angular-grid';

declare var $: any;

@Component({
  selector: 'app-form-inbox',
  templateUrl: './form-inbox.component.html',
  styleUrls: ['./form-inbox.component.css']
})

export class FormInboxComponent implements OnInit {
  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
  
  constructor(public dialog: MatDialog, private route: Router, private service: FormbuilderService, private spinner: NgxSpinnerService) { }

  formCapture: any;
  PhotoCount:number=0;
  FileCount:number=0;
  CommentCount:number=0;

  DisplayOne:string="Display One";
  DisplayTwo:string="Display Two";

  public formList:any = [];
  
  public gridView: any[] ;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
  }

  ngOnInit(): void {
    this.DisplayOne="Display One";
    this.DisplayTwo="Display Two";
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
    this.formList=[
      {
        "formID": 0,
        "formTypeID": 2,
        "formCategoryID": 0,
        "formName": "",
        "displayName":"All Forms",
        "formDescription": "",
        "dateCreated": "2021-11-30T11:28:23.351Z",
        "createdByUserID": 0,
        "isLocked": false,
        "lockedByUserID": 0,
        "isDeleted": false,
        "dateLocked": "2021-11-30T11:28:23.351Z",
        "dateLastModified": "2021-11-30T11:28:23.351Z",
        "lastModifiedByUserID": 0
      }
    ];
    this.spinner.show();
    this.service.getCapturedForms().subscribe(data => {
      this.gridView=data;
      this.service.getPublishedListOfForms().subscribe(data => {
        merge(this.formList, data);
        this.spinner.hide();
      });
    });
  }

  filterForm(input:any,formID:any) {
    if(input==='All Forms'){
      this.spinner.show();
      this.service.getCapturedForms().subscribe(data => {
        this.gridView=data;
        this.service.getPublishedListOfForms().subscribe(data => {
          this.formList=[
            {
              "formID": 1,
              "formTypeID": 2,
              "formCategoryID": 0,
              "formName": "",
              "displayName":"All Forms",
              "formDescription": "",
              "dateCreated": "2021-11-30T11:28:23.351Z",
              "createdByUserID": 0,
              "isLocked": false,
              "lockedByUserID": 0,
              "isDeleted": false,
              "dateLocked": "2021-11-30T11:28:23.351Z",
              "dateLastModified": "2021-11-30T11:28:23.351Z",
              "lastModifiedByUserID": 0
            }
          ];
          merge(this.formList, data);
          this.dataBinding.skip = 0;
          this.DisplayOne="Display One";
         this.DisplayTwo="Display Two";
          this.spinner.hide();
        });
      });     
    }
    else{
      this.spinner.show();
      this.service.getCapturedForms().subscribe(data => {
        this.gridView=data;
        this.service.getPublishedListOfForms().subscribe(data => {
          this.gridView = process(this.gridView, {
            filter: {
              logic: "or",
              filters: [
                { field: "formTemplateName", operator: "eq", value:input}
              ]
            }
          }).data;
          this.dataBinding.skip = 0;
          this.service.GetDisplayables(formID).subscribe(res=>{
            this.DisplayOne=res[0].displayOne;
            this.DisplayTwo=res[0].displayTwo;
            this.spinner.hide();
          })
        });
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
    ,background:'#ffcccb'
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
