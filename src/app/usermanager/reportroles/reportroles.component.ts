import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ReportRole } from '../reportrole.model';
import { UserService } from 'src/app/shared/user.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';

declare var $: any;

export interface Report {
  id: number;
  name: string;
}

@Component({
  selector: 'app-reportroles',
  templateUrl: './reportroles.component.html',
  styleUrls: ['./reportroles.component.css']
})
export class ReportrolesComponent implements OnInit {

  roleAdd : any;
  roleID: number = 0;
  reportrole: ReportRole;

  
  reportroles:any = [];

  
  constructor( private service: UserService, @Inject(MAT_DIALOG_DATA) data) {
    this.roleAdd = data;
   }

  public displayedColumns = ['report', 'select'];
  public reportList = new MatTableDataSource<any>();
  selection = new SelectionModel<Report>(true, []);
  

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.reportList.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.roleID = this.roleAdd.roleID;
    this.getRoles();    
  }

  ngDoCheck(): void{
    this.checkAll();
  }

  
  getRoles() {    
    

    this.service.getReportsRole(this.roleID).subscribe(data => {
      this.reportList.data = data;
    });
    
  }

  checkAll(){
    
    this.reportList.data.forEach(row => {
      if(row.checked)
      this.selection.select(row);
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.reportList.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.reportList.data.forEach(row => this.selection.select(row));
  }

  addReportRole() {    

    this.reportroles = [];
    this.selection.selected.forEach(row => {
      this.reportrole = new ReportRole();      
      this.reportrole.roleID = this.roleID;
      this.reportrole.reportID = row.id;
      this.reportrole.Id = 0;
      this.reportroles.push(this.reportrole);
    });

      this.service.addReportsRole(this.reportroles,this.roleID).subscribe(
        (res: any) => {
          if (res.message == 'Report added successfully') {
          this.showNotification('top','right','Reports role added!', 'Role successful.','success');
          }
          else{}
        },
        err => {
          console.log(err);
          if (err.status == 400) {
          
          }          
        }
      );

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
