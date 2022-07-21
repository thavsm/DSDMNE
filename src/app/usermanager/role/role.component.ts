import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ElementRef, OnDestroy, AfterViewInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../../shared/user.service';
import { FormsModule } from '@angular/forms';
import { MenurolesComponent } from '../menuroles/menuroles.component';
import { MatDialog } from '@angular/material/dialog';
import { RoleaccessComponent } from '../roleaccess/roleaccess.component';
import { MatPaginator } from '@angular/material/paginator';
import { PageSizeItem } from '@progress/kendo-angular-grid';
import { NewroleComponent } from '../newrole/newrole.component';
import { NgxSpinnerService } from 'ngx-spinner';


declare var $: any;

@Component({
  selector: 'app-role-cmp',
  templateUrl: './role.component.html'
})

export class RoleComponent implements OnInit {
  public data: any[];
  roleName = '';
  errorMessage = '';
  isValid = false;
  menuAdd: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: UserService, public dialog: MatDialog,private spinner: NgxSpinnerService) {
  }

  public pageSize = 10;
  public pageSizes: Array<number | PageSizeItem> = [5, 10, 20, {
    text: 'All',
    value: 'all'
  }];

  public onPageChange(state: any): void {
    this.pageSize = state.take;
  }

  public ngOnInit() {

    this.loadUsers();
  }

  loadUsers() {
    this.spinner.show();
    this.service.roleUsersCount().subscribe(
      res => {
        this.data = res;
        this.spinner.hide();
      },
      err => {
        console.log(err);
        this.spinner.hide();
      },
    );
  }

  validateControl() {

    if (this.roleName.trim() == '') {
      this.errorMessage = 'This field is mandatory.';
      this.isValid = false;
    }
    else {
      this.errorMessage = '';
      this.isValid = true;
    }

  }

  showNotification(from: any, align: any, message: any, title: any, type: string) {
    //const type = ['', 'info', 'success', 'warning', 'danger', 'rose', 'primary'];

    //const color = Math.floor((Math.random() * 6) + 1);

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

  addRole() {

    //roleName
    let body = this.roleName;
    this.service.addRole(body).subscribe(
      (res: any) => {
        this.showNotification('top', 'right', res.message, '', 'success');
        this.data.push({ role: this.roleName, users: 0 });
        this.data.sort((a, b) => (a.role > b.role) ? 1 : ((b.role > a.role) ? -1 : 0));
      },
      err => {
        this.showNotification('top', 'right', err.error.message, 'Failed', 'danger');
      }
    );
  }

  clickEdit(item: any) {
    this.menuAdd = item;
    const dialogRef = this.dialog.open(MenurolesComponent, {
      width: '60%',
      height: '60%',
      data: this.menuAdd,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The menu dialog was closed');
      this.loadUsers();
    });
  }

  clickEditAccess(item: any) {
    this.menuAdd = item;
    const dialogRef = this.dialog.open(RoleaccessComponent, {
      width: '65%',
      height: '80%',
      data: item.roleID,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The menu dialog was closed');
      this.loadUsers();
    });
  }

  clickNewRole() {
    let obj={
      data:null,
      state:"add"
    }
    const dialogRef = this.dialog.open(NewroleComponent, {
      width: '60%',
      height: '70%',
      disableClose: true,
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadUsers();
    });
  }

  clickEditRole(data: any) {
    let obj={
      data:data,
      state:"edit"
    }
    const dialogRef = this.dialog.open(NewroleComponent, {
      width: '60%',
      height: '70%',
      disableClose: true,
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadUsers();
    });
  }
}