import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/shared/user.service';
import { FormRole } from '../formrole.model';

declare var $: any;

export interface Role {
  id: number;
  name: string;
}


@Component({
  selector: 'app-addformroles',
  templateUrl: './addformroles.component.html',
  styleUrls: []
})
export class AddformrolesComponent implements OnInit {

  formAdd : any;
  formID: number = 0;
  frole: FormRole;
  froles:any = [];

  constructor( private service: UserService, @Inject(MAT_DIALOG_DATA) data) {
    this.formAdd = data;
   }

  public displayedColumns = ['role', 'select'];
  public roleList = new MatTableDataSource<any>();
  selection = new SelectionModel<Role>(true, []);
  

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.roleList.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.formID = this.formAdd.formID;
    this.getRoles();    
  }

  ngDoCheck(): void{
    this.checkAll();
  }

  
  getRoles() {    
    // this.service.getRoles().subscribe(data => {
    //   this.roleList.data = data;
    // });

    this.service.getFormRoles(this.formID).subscribe(data => {
      this.roleList.data = data;
    });
    
  }

  checkAll(){
    
    this.roleList.data.forEach(row => {
      if(row.checked)
      this.selection.select(row);
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.roleList.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.roleList.data.forEach(row => this.selection.select(row));
  }

  addFormRoles() {
    //this.service.deleteFormRoles(this.formID); 
    // this.service.deleteFormRoles(this.formID).subscribe(
    //   (res: any) => {
              
    //   },
    //   err => {
    //     console.log(err);
    //     if (err.status == 400) {
        
    //     }          
    //   }
    // );


    this.froles = [];
    this.selection.selected.forEach(row => {
      this.frole = new FormRole();      
      this.frole.formID = this.formID;
      this.frole.roleID = row.id;
      this.frole.uid = 0;
      this.froles.push(this.frole);
      //this.service.addFormRole(this.frole);   
    });

      this.service.addFormRoles(this.froles,this.formID).subscribe(
        (res: any) => {
          if (res.message == 'Role added successfully') {
          this.showNotification('top','right','', 'Role added successfully','success');
          }
          else{}
        },
        err => {
          console.log(err);
          if (err.status == 400) {
          
          }          
        }
      );

    //   console.log(row.id);
    // });
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


}
