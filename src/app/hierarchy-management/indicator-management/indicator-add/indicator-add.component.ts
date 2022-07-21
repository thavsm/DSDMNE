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
  selector: 'app-indicator-add',
  templateUrl: './indicator-add.component.html',
  styleUrls: ['./indicator-add.component.css']
})
export class IndicatorAddComponent implements OnInit {

  IndicatorAdd: any;
  levels: any = [];
  constructor(public dialogRef: MatDialogRef<IndicatorAddComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private service: HierarchyManagementService, public formBuilder: FormBuilder,private spinner: NgxSpinnerService, public datepipe: DatePipe)  
    { 
      this.IndicatorAdd = data;  
    }


  ngOnInit(): void {

    this.getLevels();
  }


  closePopup() {
    this.dialogRef.close();
  }
  
  getLevels() {
    this.spinner.show();
    this.service.getLevelsList(4082).subscribe(data => {
      this.levels = data;
      this.spinner.hide();
    });
  }

  addIndicator() {
    if (this.IndicatorAdd.indicatorName != "") {

      var val = {
        "indicatorID": 0,
        "indicatorName": this.IndicatorAdd.indicatorName,
        "indicatorDescription": this.IndicatorAdd.indicatorDescription,       
        "status": this.IndicatorAdd.status,
        "locationID": this.IndicatorAdd.levelID
      };
      this.spinner.show();
      this.service.addIndicator(val).subscribe(res => {
        this.dialogRef.close();
        this.spinner.hide();
        // this.showNotification('top', 'center', 'Indicator Added Successfully!', '', 'success');          
      });

      this.showNotification('top', 'center', 'Indicator has been added successfully!', '', 'success');
      this.IndicatorAdd.indicatorID = 0,
      this.IndicatorAdd.indicatorName = "";
      this.IndicatorAdd.indicatorDescription = "";
      this.IndicatorAdd.status = 1;
     
    }
    else {
      this.showNotification('top', 'center', 'Please add a indicator name before saving!', '', 'danger');
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
