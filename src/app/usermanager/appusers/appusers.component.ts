import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { __assign } from 'tslib';
import { User } from 'src/app/shared/user.model'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserProfileComponent } from 'src/app/userprofile/userprofile.component';
import {MatTableModule} from '@angular/material/table';
declare var $: any;


@Component({
  selector: 'app-appusers',
  templateUrl: './appusers.component.html',
  styleUrls: []
})
export class AppusersComponent implements OnInit {

  constructor(public service: UserService, public dialog: MatDialog) { }

  
  formAdd: any;
  public displayedColumns = ['userName', 'email', 'role', 'update' ];
  //public userList = new MatTableDataSource<any>();
  public userList: any[];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    //this.userList.paginator = this.paginator;
  }


  ngOnInit(): void {
    console.log('before');
    this.service.getUsers(); 
    
    this.service.getAllUsers().subscribe(data => {
      //this.userList.data = data;
      this.userList = data;
    });
        
  }

  clickEdit(item: any) {    
    this.formAdd = item;
    let obj = {ParentName:'Users',data:this.formAdd};
    const dialogRef = this.dialog.open(UserProfileComponent 
    , {
      width: '60%',
      height: '90%',
      data: obj,
      disableClose:false
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');      
    });
  }

  public doFilter = (event: any) => {
    this.userList.filter = event.target.value.trim();
  }

}
