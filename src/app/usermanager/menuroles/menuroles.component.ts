import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/shared/user.service';
import { MenuRole } from '../menurole.model';

declare var $: any;

export interface Menu {
  id: number;
  name: string;
}

@Component({
  selector: 'app-menuroles',
  templateUrl: './menuroles.component.html',
  styleUrls: []
})
export class MenurolesComponent implements OnInit {

  
  roleAdd : any;
  roleID: number = 0;
  mrole: MenuRole;
  mroles:any = [];

  
  constructor( private service: UserService, @Inject(MAT_DIALOG_DATA) data) {
    this.roleAdd = data;
   }

  public displayedColumns = ['menu', 'select'];
  public menuList = new MatTableDataSource<any>();
  selection = new SelectionModel<Menu>(true, []);
  

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.menuList.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.roleID = this.roleAdd.roleID;
    this.getRoles();    
  }

  ngDoCheck(): void{
    this.checkAll();
  }

  
  getRoles() {    
    

    this.service.getMenusRole(this.roleID).subscribe(data => {
      this.menuList.data = data;
    });
    
  }

  checkAll(){
    
    this.menuList.data.forEach(row => {
      if(row.checked)
      this.selection.select(row);
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.menuList.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.menuList.data.forEach(row => this.selection.select(row));
  }

  addMenusRole() {    

    this.mroles = [];
    this.selection.selected.forEach(row => {
      this.mrole = new MenuRole();      
      this.mrole.roleID = this.roleID;
      this.mrole.menuID = row.id;
      this.mrole.uid = 0;
      this.mroles.push(this.mrole);
    });

      this.service.addMenusRole(this.mroles,this.roleID).subscribe(
        (res: any) => {
          if (res.message == 'Menu added successfully') {
          this.showNotification('top','right','Menus role added!', 'Role successful.','success');
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
