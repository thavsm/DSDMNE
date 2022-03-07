import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/shared/user.service';
import { TypeRole } from '../typerole.model';
import { FormRole } from '../formrole.model';
import { MenuRole } from '../menurole.model';


declare var $: any;

export interface roleItem {
  id: number;
  name: string;
}

@Component({
  selector: 'app-roleaccess',
  templateUrl: './roleaccess.component.html',
  styleUrls: []
})
export class RoleaccessComponent implements OnInit {

  
  roleAdd : any;
  roleID: number = 0;
  mrole: MenuRole;
  mroles:any = [];

  formID: number = 0;
  frole: FormRole;
  froles:any = [];

  trole: TypeRole;
  typeroles:any = [];

  constructor(private service: UserService, @Inject(MAT_DIALOG_DATA) data) { 
    this.roleAdd = data;
  }

  public displayedColumns = ['menu', 'select'];
  public displayedFormColumns = ['form', 'select'];
  public displayedRoleColumns = ['role', 'select'];
  public menuList = new MatTableDataSource<any>();
  public formList = new MatTableDataSource<any>();
  public roleList = new MatTableDataSource<any>();
  selection = new SelectionModel<roleItem>(true, []);
  selectionForms = new SelectionModel<roleItem>(true, []);
  selectionRole = new SelectionModel<roleItem>(true, []);
  

  @ViewChild('menuPaginator', {read:MatPaginator}) paginator: MatPaginator;
  @ViewChild('formPaginator', {read:MatPaginator}) paginatorForms: MatPaginator;
  @ViewChild('rolePaginator', {read:MatPaginator}) paginatorRoles: MatPaginator;

  ngAfterViewInit() {
    this.menuList.paginator = this.paginator;
    this.formList.paginator = this.paginatorForms;
    this.roleList.paginator = this.paginatorRoles;
  }
  
  ngOnInit(): void {
    //this.roleID = this.roleAdd.roleID;
    this.roleID = this.roleAdd;
    this.getRoles();
    console.log(this.roleList);
  }

  ngDoCheck(): void{
    this.checkAll();
  }

  
  getRoles() {    
    

    this.service.getMenusRole(this.roleID).subscribe(data => {
      this.menuList.data = data;
    });

    this.service.getFormsRole(this.roleID).subscribe(data => {
      this.formList.data = data;
    });
    
    
    this.service.getTypeRoles(this.roleID).subscribe(data => {
      this.roleList.data = data;
    });
    
  }

  checkAll(){
    
    this.menuList.data.forEach(row => {
      if(row.checked)
      this.selection.select(row);
    });

    this.formList.data.forEach(row => {
      if(row.checked)
      this.selectionForms.select(row);
    });

    
    this.roleList.data.forEach(row => {
      if(row.checked)
      this.selectionRole.select(row);
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



  addRoleAccess()
  {

    this.froles = [];
    this.selectionForms.selected.forEach(row => {
      this.frole = new FormRole();      
      this.frole.formID = row.id;
      this.frole.roleID = this.roleID;
      this.frole.uid = 0;
      this.froles.push(this.frole);
    });

    this.service.addFormRoles(this.froles).subscribe(
      (res: any) => {
        if (res.message == 'Role added successfully') {
        this.showNotification('top','right','Form roles added!', 'Roles successful.','success');
        }
        else{}
      },
      err => {
        console.log(err);
        if (err.status == 400) {
        
        }          
      }
    );

    this.mroles = [];
    this.selection.selected.forEach(row => {
      this.mrole = new MenuRole();      
      this.mrole.roleID = this.roleID;
      this.mrole.menuID = row.id;
      this.mrole.uid = 0;
      this.mroles.push(this.mrole);
    });

    this.service.addMenusRole(this.mroles).subscribe(
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

    this.typeroles = [];
    this.selectionRole.selected.forEach(row => {
      this.trole = new TypeRole();      
      this.trole.roleID = this.roleID;
      this.trole.typeID = row.id;
      this.trole.uid = 0;
      this.typeroles.push(this.trole);
    });

    this.service.addTypeRoles(this.typeroles).subscribe(
      (res: any) => {
        if (res.message == 'Role Types added successfully') {
        this.showNotification('top','right','Role types role added!', 'Role Type successful.','success');
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

}
