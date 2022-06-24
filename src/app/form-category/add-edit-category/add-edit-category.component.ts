import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormbuilderService } from 'src/app/shared/formbuilder.service';
import {NgxSpinner, NgxSpinnerService} from 'ngx-spinner';
import Swal from 'sweetalert2';
import { merge } from 'jquery';
declare var $: any;

@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.css']
})
export class AddEditCategoryComponent implements OnInit {

  submitted = false;
  formCategoryAdd: any;

  constructor(
    public dialogRef: MatDialogRef<AddEditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private service: FormbuilderService, public formBuilder: FormBuilder,private spinner: NgxSpinnerService
  ) {
    this.formCategoryAdd = data;
  }


  formCategoryID:any= 0;
  name:string= "";
  description: string="";
  dateCreated: string="";
  createdByUserID:any= 0;
  dateLastModified:string= "";
  lastModifiedByUserID:any= 0;

  ngOnInit(): void {
    this.formCategoryID = this.formCategoryAdd.formCategoryID;
    this.name = this.formCategoryAdd.name;
    this.description = this.formCategoryAdd.description;
    this.dateCreated = this.formCategoryAdd.dateCreated;
    this.createdByUserID = this.formCategoryAdd.createdByUserID;
    this.dateLastModified = this.formCategoryAdd.dateLastModified;
    this.lastModifiedByUserID = this.formCategoryAdd.lastModifiedByUserID;
  }

  addFormCategory() {
    if(this.formCategoryAdd.name!=""){
    //adding form
    this.submitted = true;
      var val = {
        "formCategoryID": 0,
        "name":  this.formCategoryAdd.name,
        "description": this.formCategoryAdd.description,
        "dateCreated": "2021-12-16T10:17:15.570Z",
        "createdByUserID": 0,
        "dateLastModified": "2021-12-16T10:17:15.570Z",
        "lastModifiedByUserID": 0
      };
    
    this.service.addformcategories(val).subscribe(res => {  
      this.dialogRef.close();
      this.spinner.hide();
      this.showNotification('top','center','Form Category Added Succesfully!','','success');
    });
    this.formCategoryAdd.formCategoryID=0;
    this.formCategoryAdd.name="";
    this.formCategoryAdd.description="";
    this.formCategoryAdd.dateCreated="";
    this.formCategoryAdd.createdByUserID=0;
    this.formCategoryAdd.dateLastModified="";
    this.formCategoryAdd.lastModifiedByUserID=0;
    }
    else{
      this.showNotification('top','center','Please add a name before saving!','','danger');
    }
  }

  updateFormCategory() {
    if (this.formCategoryAdd.name != "") {
      this.submitted = true;
      var val = {
      formCategoryID : this.formCategoryAdd.formCategoryID,
      name : this.formCategoryAdd.name,
      description : this.formCategoryAdd.description,
      dateCreated : this.formCategoryAdd.dateCreated,
      createdByUserID : this.formCategoryAdd.createdByUserID,
      dateLastModified : this.formCategoryAdd.dateLastModified,
      lastModifiedByUserID : this.formCategoryAdd.lastModifiedByUserID,
      };
      this.spinner.show();
      this.service.updateformCategoryDetails(this.formCategoryAdd.formCategoryID, val).subscribe(res => {
        this.dialogRef.close();
        this.spinner.hide();
        this.showNotification('top','center','Form Category updated Successfully!','','success');
      });
    }
    else {
      this.showNotification('top','center','Please add a name before saving!','','danger');
    }
  }

  closePopup() {
    this.dialogRef.close();
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


