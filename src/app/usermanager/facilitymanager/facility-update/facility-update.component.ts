import { Component, Inject, Input,  OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormbuilderService } from 'src/app/shared/formbuilder.service';
import {NgxSpinner, NgxSpinnerService} from 'ngx-spinner';
import Swal from 'sweetalert2';
import { merge } from 'jquery';
import { UserService } from 'src/app/shared/user.service';
declare var $: any;

@Component({
  selector: 'app-facility-update',
  templateUrl: './facility-update.component.html',
  styleUrls: ['./facility-update.component.css']
})
export class FacilityUpdateComponent implements OnInit {
  submitted = false;
  FacilityAdd: any;

  constructor(
    public dialogRef: MatDialogRef<FacilityUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private service: UserService, public formBuilder: FormBuilder,private spinner: NgxSpinnerService
  ) {
    this.FacilityAdd = data;
   }

   ID:any= 0;
   facilityType:string= "";

  ngOnInit(): void {
    this.ID = this.FacilityAdd.id;
    this.facilityType = this.FacilityAdd.facilityType;
  }
  
  updateFacility() {
    if (this.FacilityAdd.facilityType != "") {
      this.submitted = true;
      var val = {
      ID : this.FacilityAdd.id,
      facilityType : this.FacilityAdd.facilityType
      };
      this.spinner.show();
      this.service.UpdateFacilities(this.FacilityAdd.id, val).subscribe(res => {
      });
      this.dialogRef.close();
      this.spinner.hide();
      this.showNotification('top','center','Facility updated successfully!','','success');
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
