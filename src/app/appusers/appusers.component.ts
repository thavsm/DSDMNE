import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../shared/user.service';
import { __assign } from 'tslib';
import { User } from 'src/app/shared/user.model'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserProfileComponent } from '../userprofile/userprofile.component';
import {MatTableModule} from '@angular/material/table';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

declare var $: any;


@Component({
  selector: 'app-appusers',
  templateUrl: './appusers.component.html',
  styleUrls: ['./appusers.component.css']
})
export class UsersComponent implements OnInit {

  public dataTable: DataTable;
  users: string[][];
  ulist: any;
  usr: string[];

  constructor(public service: UserService, public dialog: MatDialog) { }

  
  formAdd: any;
  public displayedColumns = ['userid', 'userName', 'email', 'province','update' ];
  public userList = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.userList.paginator = this.paginator;
  }


  ngOnInit(): void {
    console.log('before');
    this.service.getUsers(); 

    this.refreshUsers();
    
  }

  clickEdit(item: any) {
    this.formAdd = item;
    const dialogRef = this.dialog.open(UserProfileComponent 
    , {
      width: '60%',
      height: '60%',
      data: this.formAdd,
      disableClose:false
    });

    dialogRef.afterClosed().subscribe(result => {
      this.refreshUsers();
      console.log('The dialog was closed');      
    });
  }
   
  refreshUsers(){
    // this.service.getAllUsers().subscribe(data => {
    //   this.userList.data = data;
    // });

    this.service.getAllUsers().subscribe(data => {
      
      this.userList = data.filter((value, index, self) =>
          self.findIndex(item => item.fullName === value.fullName && item.email === value.email && item.provinceName === value.provinceName && item.roleName === value.roleName) === index
        );
    });
  }
}
