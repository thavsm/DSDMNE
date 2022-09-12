import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HolidayService } from '../holiday.service';
import {NgxSpinner, NgxSpinnerService} from 'ngx-spinner';

import { DatePipe } from '@angular/common';

import { DateAdapter } from '@angular/material/core';

import { merge } from 'jquery';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-holiday-add',
  templateUrl: './holiday-add.component.html',
  styleUrls: ['./holiday-add.component.css']
})
export class HolidayAddComponent implements OnInit {

  submitted = false;
  holidayAdd: any;


  constructor(public dialogRef: MatDialogRef<HolidayAddComponent>,
    @Inject(MAT_DIALOG_DATA) data, private service: HolidayService, public formBuilder: FormBuilder,private spinner: NgxSpinnerService, public datepipe: DatePipe, private dateAdapter: DateAdapter<Date>)  
    { 
      this.holidayAdd = data; 
      this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy 
    }

    holidayId: number = 0;
  name: string = "";
  year: number = 2022;
  date: string = "";
 
  
  ngOnInit(): void {
    this.holidayId = this.holidayAdd.holidayId;
    this.name = this.holidayAdd.name;
    this.year = this.holidayAdd.year;
    this.date = this.holidayAdd.date;

  }

  closePopup() {
    this.dialogRef.close();
  }

  addHoliday() {
    if (this.holidayAdd.name != "") {
      //adding form
      this.submitted = true;
      let dateEx = new Date(this.holidayAdd.date);
      //We use dayCorrector to remove the timezone. We want brut date without any timezone
let dayCorrector = (dateEx.getHours()>12) ? (1) : (dateEx.getHours()<=12) ? (+1) : (0);
dateEx.setDate(dateEx.getDate()+dayCorrector);
let dateFinal = (String(dateEx.getFullYear()) +'-'+ String(dateEx.getMonth()+1) +'-'+ String(dateEx.getDate())+' 00:00:00Z');

      
var val = {
  holidayId : 0,
  name : this.holidayAdd.name,
  date: dateEx,
  year : dateEx.getFullYear()//this.holidayAdd.year
};
      
      this.spinner.show();
      this.service.addHoliday(val).subscribe(res => {
        this.dialogRef.close();
        this.spinner.hide();
        this.showNotification('top', 'center', 'Holiday Added Successfully!', '', 'success');          
        this.service.refreshhlist();
      });
      this.holidayId = this.holidayAdd.holidayId;
      this.name = this.holidayAdd.name;
      this.year = this.holidayAdd.year;
      this.date = this.holidayAdd.date;      

    }
    else {
      this.showNotification('top', 'center', 'Please add a Holiday name before saving!', '', 'danger');
    }
  }

  updateHoliday() {
    if (this.holidayAdd.Name != "") {
      //updating form
      this.submitted = true;
      // stop here if form is invalid

      let dateEx = new Date(this.holidayAdd.date);
//We use dayCorrector to remove the timezone. We want brut date without any timezone
let dayCorrector = (dateEx.getHours()>12) ? (1) : (dateEx.getHours()<=12) ? (+1) : (0);
dateEx.setDate(dateEx.getDate()+dayCorrector);
let dateFinal = (String(dateEx.getFullYear()) +'-'+ String(dateEx.getMonth()+1) +'-'+ String(dateEx.getDate())+' 00:00:00Z');

      var val = {
        holidayId : this.holidayAdd.id,
        name : this.holidayAdd.name,
        date: dateEx,
        year : dateEx.getFullYear()//this.holidayAdd.year
      };
      this.spinner.show();
      this.service.updateHoliday(this.holidayAdd.id, val).subscribe(res => {
        this.dialogRef.close();
        this.spinner.hide();
        this.showNotification('top','center','Holiday Updated Successfully!','','success');
        this.service.refreshhlist();
      });
    }
    else {
      this.showNotification('top','center','Please add a Holiday name before saving!','','danger');
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
  

