import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Observable, Subscription } from "rxjs";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';  
import Swal from 'sweetalert2'
import { PageSizeItem } from "@progress/kendo-angular-grid";
import { GroupDescriptor } from '@progress/kendo-data-query';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { HolidayService } from './holiday.service';
import { HolidayAddComponent } from './holiday-add/holiday-add.component';

declare var $: any;

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.css']
})
export class HolidayComponent implements OnInit {

  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
  dataSaved = false;
  HolidayForm: any;

  holiday: any;
  private _snackBar: any;
  verticalPosition: any;
  horizontalPosition: any;
  holidayId: number;
  holidayAdd: any;
 
  public holYears: Number[];
  
  constructor(public service: HolidayService, private route: Router, public dialog: MatDialog, private spinner: NgxSpinnerService, private Aroute: ActivatedRoute) { 
    
  }

  ngOnInit(): void {
    
    this.service.refreshhlist();
     this.service.refreshHYears().toPromise().then(res=> this.holYears = res as Number[]);;
  }

  RefreshHolist(yr:Number){   
    this.service.refreshhlistbyYear(yr);
  }

  openViewHoliday(item: any): void {
    // Create item:
    let myObj = {
      holidayId: item.id,
      ViewEdit: 0
    };
    localStorage.setItem('holidayData', JSON.stringify(myObj));
    this.route.navigate(['holidaydiagram']);
  }

  openEditHoliday(item: any): void {
    // Create item:
    console.log(item);
    let myObj = {
      holidayId: item.id,
      ViewEdit: 1
    };
    localStorage.setItem('holidayData', JSON.stringify(myObj));
  //  this.route.navigate(['holidaydiagram']);
  }
  public edit = (dataItem, rowIndex): void => {
    console.log(dataItem, rowIndex);
  }
  @ViewChild('buttonTemplate')
  public buttonTemplate: TemplateRef<any>;

  public gridData: any = this.service.refreshhlist();

  openDialogAdd(): void {

    this.holidayAdd = {
      holidayId : 0,
      name : "",
      year : 0,
      date : ""
    }

    const dialogRef = this.dialog.open(HolidayAddComponent, { width: '40%', height: '55%', data: this.holidayAdd, disableClose: true }

    );

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  clickDelete(item: any) {
    Swal.fire({
      title: 'Are you sure you want to delete ' + item.name + ' holiday?',
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
        this.service.deleteHoliday(item.id).subscribe(data => {
          this.spinner.hide();
          this.showNotification('top','center','Holiday Deleted Succesfully!','Success.','success');
          this.service.refreshhlist();
        });
      }
    })
  }

  clickEdit(item: any) {
    this.holidayAdd = item;
    const dialogRef = this.dialog.open(HolidayAddComponent, {
      width: '40%',
      height: '50%',
      data: this.holidayAdd,
      disableClose:true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.service.refreshhlist();
    });
  }

  SavedSuccessful(isUpdate) {
    if (isUpdate == 0) {
      this._snackBar.open('Record Updated Successfully!', 'Close', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
    else if (isUpdate == 1) {
      this._snackBar.open('Record Saved Successfully!', 'Close', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
    else if (isUpdate == 2) {
      this._snackBar.open('Record Deleted Successfully!', 'Close', {
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
