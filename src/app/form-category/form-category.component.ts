import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PageSizeItem } from '@progress/kendo-angular-grid';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { FormbuilderService } from '../shared/formbuilder.service';
import { AddEditCategoryComponent } from './add-edit-category/add-edit-category.component';
declare var $: any;

@Component({
  selector: 'app-form-category',
  templateUrl: './form-category.component.html',
  styleUrls: ['./form-category.component.css'],
})


export class FormCategoryComponent implements OnInit {

  constructor(public dialog: MatDialog, private route: Router, private service: FormbuilderService, private spinner: NgxSpinnerService) { }

  public pageSize = 10;
  public pageSizes: Array<number | PageSizeItem> = [5, 10, 20, {
    text: 'All',
    value: 'all'
     }];
     

  formCategory: any;
  public displayedColumns = ['name', 'description', 'update'];
  public formCategoryList: any[];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    // this.formCategoryList.paginator = this.paginator;
  }

  public onPageChange(state: any): void {
    this.pageSize = state.take;
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

  clickDelete(item:any){
    Swal.fire({
      title: "<h5 style='color:white;font-weight:400'> Are you sure want to remove this form category? </h5>",
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      toast: true,
      position: 'top',
      allowOutsideClick: false,
      confirmButtonColor: '#000000',
      cancelButtonColor: '#000000'
      ,background:'#CA0B00'
    }).then((result) => {
      if (result.value) {
        this.spinner.show();
        this.service.DeleteFormCategory(item.formCategoryID).subscribe(data => {
          this.spinner.hide();
          this.refreshFormsList();
           this.showNotification('top','center','Form Category Deleted Successfully!','','success');
        });
      }
    })
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
