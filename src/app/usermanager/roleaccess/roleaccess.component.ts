import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/shared/user.service';
import { TypeRole } from '../typerole.model';
import { FormRole } from '../formrole.model';
import { MenuRole } from '../menurole.model';
import { MenurolesComponent } from '../menuroles/menuroles.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormbuilderService } from 'src/app/shared/formbuilder.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HierarchyManagementService } from 'src/app/hierarchy-management.service';
import { MatStepper } from '@angular/material/stepper';
import { ReportRole } from '../reportrole.model';


declare var $: any;

export interface roleItem {
  id: number;
  name: string;
}

export interface Item {
  reportID: number;
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

  Reportrole: ReportRole;
  Reportroles:any = [];

  formID: number = 0;
  frole: FormRole;
  fvrole: FormRole;
  fcrole: FormRole;
  froles:any = [];
  cvrole: roleItem;

  trole: TypeRole;
  typeroles:any = [];

  checksloaded = false;

  constructor(private service: UserService, @Inject(MAT_DIALOG_DATA) data,public dialogRef: MatDialogRef<MenurolesComponent>,private fbservice: FormbuilderService, private spinner: NgxSpinnerService, private _formBuilder: FormBuilder,private treeService:HierarchyManagementService) { 
    this.roleAdd = data;
  }
  public displayedReportsColumns = ['report', 'select'];
  public displayedColumns = ['menu', 'select'];
  public displayedFormColumns = ['form', 'capture', 'view'];
  public displayedRoleColumns = ['role', 'select'];
  public menuList = new MatTableDataSource<any>();
  public reportList = new MatTableDataSource<any>();
  public formList = new MatTableDataSource<any>();
  public roleList = new MatTableDataSource<any>();
  selection = new SelectionModel<roleItem>(true, []);
  selectionForms = new SelectionModel<roleItem>(true, []);
  selectionRole = new SelectionModel<roleItem>(true, []);
  selectionReport = new SelectionModel<Item>(true, []);

  selectionCaptureForms = new SelectionModel<roleItem>(true, []);
  selectionViewForms = new SelectionModel<roleItem>(true, []);
  format = {
    add: 'Assign Indicator', remove: 'Unassign Indicator', all: 'Select All', none: 'Deselect All',
    direction: 'left-to-right', draggable: true, locale: 'undefined'
  };
  userRoles: any;
  IndicatorList:any;
  key: string;
  station: string;
  treeList:any;
  treeID:any;
  searchTreeID:any;
  firstFormGroup: FormGroup;
  IndicatorRoleList:any[];
  assigned=[];
  source=[];
  // userData: any;
  // provID: any;

  @ViewChild('menuPaginator', {read:MatPaginator}) paginator: MatPaginator;
  @ViewChild('reportPaginator', {read:MatPaginator}) paginatorReports: MatPaginator;
  @ViewChild('formPaginator', {read:MatPaginator}) paginatorForms: MatPaginator;
  @ViewChild('rolePaginator', {read:MatPaginator}) paginatorRoles: MatPaginator;
  @ViewChild('stepper') private myStepper: MatStepper;

  ngAfterViewInit() {
    this.menuList.paginator = this.paginator;
    this.formList.paginator = this.paginatorForms;
    this.roleList.paginator = this.paginatorRoles;
    this.reportList.paginator = this.paginatorReports;
  }
  
  ngOnInit(): void {
    //this.roleID = this.roleAdd.roleID;
    this.roleID = this.roleAdd;
    this.getRoles();
    this.getTrees();
    this.firstFormGroup = this._formBuilder.group({
      tree: ['', Validators.required],
    });
  }

  closePopup(){
    this.dialogRef.close();
  }

  ngDoCheck(): void{
    if(!this.checksloaded)
      this.checkAll();
    else
      this.checksloaded = true;
  }

  getTrees() {
    this.treeService.getTreeByCatergory(1).subscribe(res => {
      this.treeList = res;
    });
  };

  //Returns all indicators that belong to a roles and a tree
  // getAllIndicators() {
  //   this.service.getUserProfile().subscribe(data => {
      
  //     this.userData = data['formData'];
  //     this.provID = this.userData["provinceID"]; 

  //     this.spinner.show();
  //     this.treeService.getIndicatorNodesByUserProvinceID(this.provID).subscribe(res => {
  //       this.source = res;
  //       this.treeService.getAssignedIndicatorNodesByTreeRoleID(this.roleID, this.treeID).subscribe(val => {
  //         this.assigned = val;
  //         this.spinner.hide();
  //       });
  //     });
  //   });
  // }

    //Returns all indicators that belong to a roles and a tree
    getAllIndicators():void{
      this.spinner.show();
      this.treeService.getIndicatorNodes().subscribe(res => {
        this.source = res;
        this.treeService.getAssignedIndicatorNodesByTreeRoleID(this.roleID, this.treeID).subscribe(val => {
          this.assigned = val;
          this.spinner.hide();
        });
      });
    }

   //Assigns indicator/s to a role
   assign():void{
    if(this.assigned.length==0){
      alert("Please select some indicators first");
    }
    else{
      this.treeService.assignIndicators(this.assigned,this.roleID,this.treeID).subscribe(res=>{
        this.showNotification('top', 'center', 'Indicators asaigned successfully!', '', 'success');
        this.myStepper.previous();
        this.myStepper.previous();
      });
    }
  }
  
  getRoles() {    
    this.service.getMenusRole(this.roleID).subscribe(data => {
      this.menuList.data = data;
      console.log( this.menuList.data)
    });

    this.service.getFormsRole(this.roleID).subscribe(data => {
      this.formList.data = data;
    });
    
    
    this.service.getTypeRoles(this.roleID).subscribe(data => {
      this.roleList.data = data;
    });

    this.service.getReportsRole(this.roleID).subscribe(data => {
      this.reportList.data = data;
      console.log( this.reportList.data)
    });
    //this.checkAll();
    
  }

  checkAll(){
    
    this.menuList.data.forEach(row => {
      if(row.checked)
      this.selection.select(row);
    });

    this.reportList.data.forEach(row => {
      if(row.checked)
      this.selectionReport.select(row);
    });


    this.formList.data.forEach(row => {
      // if(row.checked)
      // this.selectionForms.select(row);
      if(row.capture)
      this.selectionCaptureForms.select(row);

      if(row.view)
      this.selectionViewForms.select(row);
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

  isAllReportsSelected() {
    const numSelected = this.selectionReport.selected.length;
    const numRows = this.reportList.data.length;
    return numSelected === numRows;
  }

  isAllFormsSelected() {
    const numSelected = this.selectionForms.selected.length;
    const numRows = this.formList.data.length;
    return numSelected === numRows;
  }

  isAllRoleTypesSelected() {
    const numSelected = this.selectionRole.selected.length;
    const numRows = this.roleList.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.menuList.data.forEach(row => this.selection.select(row));
  }

  masterToggleReports() {
    this.isAllReportsSelected()  ?
        this.selectionReport.clear() :
        this.reportList.data.forEach(row => this.selectionReport.select(row));
  }

  masterToggleForms() {
    this.isAllFormsSelected() ?
        this.selectionForms.clear() :
        this.formList.data.forEach(row => this.selectionForms.select(row));
  }

  masterToggleRoles() {
    this.isAllRoleTypesSelected() ?
        this.selectionRole.clear():
        this.roleList.data.forEach(row => this.selectionRole.select(row));
  }

  masterToggleRoles2() {
    if(this.isAllRoleTypesSelected()) {
        this.selectionRole.clear();
        this.roleList.data.forEach(row => row.checked = false);
      }
        else
        {
        this.roleList.data.forEach(row => this.selectionRole.select(row));
        }
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



addRoleAccess()
  {
    this.froles = [];
    this.selectionCaptureForms.selected.forEach(row => {
      this.frole = new FormRole();      
      this.frole.formID = row.id;
      this.frole.roleID = this.roleID;
      this.frole.uid = 0;
      this.frole.capture = true;
      this.frole.view = false;
      this.froles.push(this.frole);
    });

    this.selectionViewForms.selected.forEach(row => {
      this.fcrole = new FormRole();
      this.fcrole = this.froles.find(element => element.formID == row.id);
          
      if(this.fcrole != null){
        this.froles.find(element => element.formID == row.id).view = true;
      }
      else{
        this.fvrole = new FormRole();
        this.fvrole.formID = row.id;
        this.fvrole.roleID = this.roleID;
        this.fvrole.uid = 0;
        this.fvrole.view = true;
        this.fvrole.capture = false;
        this.froles.push(this.fvrole);
      }      
    });
    this.service.addFormRoles(this.froles,this.roleID).subscribe(
      (res: any) => {
        if (res.message == 'Forms') {
        //this.showNotification('top','right','', 'Form access updated successfully.','success');
        }
        else{}
      },
      err => {
        console.log(err);
        if (err.status == 400) {
          this.showNotification('top','right','Form access updated failed. Please try again', '','danger');
        }          
      }
    );

    this.Reportroles = [];
    this.selectionReport.selected.forEach(row => {
      this.Reportrole = new ReportRole();  
      this.Reportrole.Id = 0;  
      this.Reportrole.reportID = row.reportID;
      this.Reportrole.roleID = this.roleID;
      this.Reportroles.push(this.Reportrole);
    });

    this.service.addReportsRole(this.Reportroles,this.roleID).subscribe(
      (res: any) => {
        if (res.message == 'Reports') {
        //this.showNotification('top','right','', 'Menu access updated successfully.','success');
        }
        else{}
      },
      err => {
        console.log(err);
        if (err.status == 400) {
          this.showNotification('top','right','Menu access updated failed. Please try again', '','danger');
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
    this.service.addTypeRoles(this.typeroles,this.roleID).subscribe(
      (res: any) => {
        if (res.message == 'Role Types added successfully' ) {
        this.showNotification('top','right','Access updated successfully', '','success');
        }
        else{}
      },
      err => {
        console.log(err);
        if (err.status == 400) {
          this.showNotification('top','right','Role type access updated failed. Please try again', '','danger');
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

    this.service.addMenusRole(this.mroles,this.roleID).subscribe(
      (res: any) => {
        if (res.message == 'Menus') {
        //this.showNotification('top','right','', 'Menu access updated successfully.','success');
        }
        else{}
      },
      err => {
        console.log(err);
        if (err.status == 400) {
          this.showNotification('top','right','Menu access updated failed. Please try again', '','danger');
        }          
      }
    );
  }

onToggleChangeCaptureForms(row:any,event:any){
    if(event.checked==false){
    this.selectionCaptureForms.deselect(row);
    this.formList.data.forEach(r=>{
      if(r==row){
        r.capture=false;
      }
    });
  }
  else{
    this.selectionCaptureForms.select(row);
    this.formList.data.forEach(r=>{
      if(r==row){
        r.capture=true;
      }
    });
  }
}

onToggleChangeViewForms(row:any,event:any){
  if(event.checked==false){
  this.selectionViewForms.deselect(row);
  this.formList.data.forEach(r=>{
    if(r==row){
      r.view=false;
    }
  });
}
else{
  this.selectionViewForms.select(row);
  this.formList.data.forEach(r=>{
    if(r==row){
      r.view=true;
    }
  });
}
}

onToggleChangeReport(row:any,event:any){
  if(event.checked==false){
  this.selectionReport.deselect(row);
  this.reportList.data.forEach(r=>{
    if(r==row){
      r.checked=0;
    }
  });
}
else{
  this.selectionReport.select(row);
  this.reportList.data.forEach(r=>{
    if(r==row){
      r.checked=1;
    }
  });
}
}

onToggleChangeMenu(row:any,event:any){
  if(event.checked==false){
  this.selection.deselect(row);
  this.menuList.data.forEach(r=>{
    if(r==row){
      r.checked=0;
    }
  });
}
else{
  this.selection.select(row);
  this.menuList.data.forEach(r=>{
    if(r==row){
      r.checked=1;
    }
  });
}
}

onToggleChangeTypes(row:any,event:any){
  if(event.checked==false){
  this.selectionRole.deselect(row);
  this.roleList.data.forEach(r=>{
    if(r==row){
      r.checked=0;
    }
  });
}
else{
  this.selectionRole.select(row);
  this.roleList.data.forEach(r=>{
    if(r==row){
      r.checked=1;
    }
  });
}
}

}
