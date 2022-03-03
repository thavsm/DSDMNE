import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { MatPaginator } from '@angular/material/paginator';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { TreediagramService } from 'src/app/treediagram.service';
import { AddFormComponent } from '../form-capture/add-form/add-form.component';

declare var $: any;

@Component({
  selector: 'app-calc-report',
  templateUrl: './calc-report.component.html',
  styleUrls: ['./calc-report.component.css']
})
export class CalcReportComponent implements OnInit {
  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public dialog: MatDialog, private route: Router, private service: TreediagramService, private spinner: NgxSpinnerService) { }

  public gridView: any[];

  ngOnInit(): void {

    this.refreshFormsList();
  }

  refreshFormsList() {
    this.spinner.show();
    this.service.getCalculationsReport().subscribe(data => {
      this.gridView=data;
      this.spinner.hide();
    });
  }

  
  openFormDesign(item: any,index:any): void {
    let formCaptureObj = {
      formID: 6,
      formName:'DevelopmentandResearch1',
      formCaptureID:10,
      state:'edit'
    };
    localStorage.setItem('formCaptureDetails', JSON.stringify(formCaptureObj));
    localStorage.setItem('tabIndex', index);
    const dialogRef = this.dialog.open(AddFormComponent, {
      width: '85%',
      height: '85%',
      disableClose:true
    });
  }

}