import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { FormbuilderService } from '../shared/formbuilder.service';
import { AddEditCategoryComponent } from './add-edit-category/add-edit-category.component';

@Component({
  selector: 'app-form-category',
  templateUrl: './form-category.component.html',
  styleUrls: ['./form-category.component.css'],
})
export class FormCategoryComponent implements OnInit {

  constructor(public dialog: MatDialog, private route: Router, private service: FormbuilderService, private spinner: NgxSpinnerService) { }

  formCategory: any;
  public displayedColumns = ['name', 'description', 'update'];
  public formCategoryList: any[];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    // this.formCategoryList.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.refreshFormsList();
  }

  clickEdit(item: any) {
    this.formCategory = item;
    const dialogRef = this.dialog.open(AddEditCategoryComponent, {
      width: '500px',
      height: '400px',
      data: this.formCategory,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.refreshFormsList();
    });
  }

  openDialogAdd(): void {
    this.formCategory = {
      formCategoryID: 0,
      name: "",
      description: "",
      dateCreated: "",
      createdByUserID: 0,
      dateLastModified: "",
      lastModifiedByUserID: 0
    }
    const dialogRef = this.dialog.open(AddEditCategoryComponent, {
      width: '500px',
      height: '400px',
      data: this.formCategory,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.refreshFormsList();
    });
  }

  refreshFormsList() {
    this.spinner.show();
    this.service.getformCategoryList().subscribe(data => {
      this.formCategoryList = data;
      this.spinner.hide();
    });
  }

  public doFilter = (event: any) => {
    this.formCategoryList.filter = event.target.value.trim();
  }
}
