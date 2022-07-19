import { Component, Inject, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { HierarchyManagementService } from 'src/app/hierarchy-management.service';
import { __assign } from 'tslib';
import { Router } from '@angular/router';
import { Observable, Subscription } from "rxjs";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';  
import Swal from 'sweetalert2'
import { PageSizeItem } from "@progress/kendo-angular-grid";
import { GroupDescriptor } from '@progress/kendo-data-query';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { IndicatorAddComponent } from './indicator-add/indicator-add.component';
import { IndicatorEditComponent } from './indicator-edit/indicator-edit.component';
import { ExternaldataAddComponent } from '../externaldata-add/externaldata-add.component';
import { TreediagramService } from 'src/app/treediagram.service';

declare var $: any;

@Component({
  selector: 'app-indicator-management',
  templateUrl: './indicator-management.component.html',
  styleUrls: ['./indicator-management.component.css']
})
export class IndicatorManagementComponent implements OnInit {
  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
  constructor(public service: HierarchyManagementService, public treeservice: TreediagramService, private route: Router, public dialog: MatDialog, private spinner: NgxSpinnerService, private Aroute: ActivatedRoute) { }

  Indicators: any;
  IndicatorAdd: any;
  OpnExternalData: any;

  ngOnInit(): void {

    this.getIndicators();
  }

  getIndicators(){
    this.spinner.show();   
    this.service.getAllIndicatorNodes().subscribe(data => {
         this.Indicators = data;
         this.spinner.hide();
    });
  }

  openDialogAdd(): void {

    this.IndicatorAdd = {
      indicatorID : 0,
      indicatorName : "",
      indicatorDescription : "",
      status : 1
    }

    const dialogRef = this.dialog.open(IndicatorAddComponent, { width: '40%', data: this.IndicatorAdd, disableClose: true }

    );
    
    dialogRef.afterClosed().subscribe(result => {
      this.getIndicators();
      console.log('The dialog was closed');
    });
  }



  
  clickEdit(item: any) {
    this.IndicatorAdd = item;
    const dialogRef = this.dialog.open(IndicatorEditComponent, {
      width: '70%',
      data: this.IndicatorAdd ,
      disableClose:true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getIndicators();
    });
  }

  clickDelete(item: any) {
    Swal.fire({
      title: 'Are you sure you want to delete ' + item.indicatorName + '?',
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
        this.service.DeleteIndiactorByID(item.indicatorID).subscribe(data => {
          this.treeservice.getExternalCalculationByNodeID(item.indicatorID);
          this.treeservice.DeleteLinkByIndicatorID(item.indicatorID);
          this.spinner.hide();
          this.showNotification('top','center','Indicator Deleted Succesfully!','Success.','success');
          this.getIndicators();
        });
      }
    })
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
