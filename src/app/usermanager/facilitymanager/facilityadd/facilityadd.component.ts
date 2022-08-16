import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormbuilderService } from 'src/app/shared/formbuilder.service';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { merge } from 'jquery';
import { UserService } from 'src/app/shared/user.service';
declare var $: any;

@Component({
  selector: 'app-facilityadd',
  templateUrl: './facilityadd.component.html',
  styleUrls: ['./facilityadd.component.css']
})
export class FacilityaddComponent implements OnInit {
  submitted = false;
  FacilityAdd: any;

  constructor(
    public dialogRef: MatDialogRef<FacilityaddComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private service: UserService, public formBuilder: FormBuilder, private spinner: NgxSpinnerService
   ){
    this.FacilityAdd = data;
  }
  ID: any = 0;
  facilityType: string = "";
  ngOnInit(): void {
    this.ID = this.FacilityAdd.ID;
    this.facilityType = this.FacilityAdd.facilityType;
  }
  getFacilities(){
    this.service.getAllFacilities().subscribe(val=>{
      let n:any[];
      n=val;
      console.log("haha"+JSON.stringify(n));
    })
  }
  addFacility() {
    if (this.FacilityAdd.facilityType != "") {
      this.submitted = true;
      var val = {
        "ID": 0,
        "facilityType": this.FacilityAdd.facilityType,
      };
      this.service.addFacility(val).subscribe(res => {
      });
      this.spinner.hide();
      this.showNotification('top','center','Facility saved Successfully!','','success'); 
      this.FacilityAdd.ID = 0;
      this.FacilityAdd.facilityType = "";
      this.closePopup();
    }
    else {
      this.showNotification('top', 'center', 'Please add a name before saving!', '', 'danger');
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

