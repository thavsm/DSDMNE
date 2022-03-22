import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ElementRef, OnDestroy, AfterViewInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { FormsModule } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { NgxSpinnerService } from 'ngx-spinner';
import { role } from '../shared/lookup.model';
import { listitem } from '../userprofile/listitem.model';
import { RoleaccessComponent } from '../usermanager/roleaccess/roleaccess.component';

declare var $: any;

@Component({
    selector: 'app-userprofile-cmp',
    templateUrl: './userprofile.component.html'
})

export class UserProfileComponent implements OnInit {
  @Input() formData?: any;
  @Input() isParent?: boolean;
  userDetail: any;
  isButtonVisible = false;
  cities: [listitem];
  levels: [listitem];
  roles: [listitem];
  userroles: role[];
  uRole: listitem;
  locationType: [listitem];
  roleTypes: [listitem];
  branch: [listitem];

  @Output() newItemEvent = new EventEmitter<any>();
  

  // roles = [
  //   {value: '1', viewValue: 'Admin'},
  //   {value: '3', viewValue: 'System Administrator'},
  //   {value: '4', viewValue: 'Head of M&E'},
  //   {value: '5', viewValue: 'Head Of Department'},
  //   {value: '6', viewValue: 'Chief Director'},
  //   {value: '7', viewValue: 'Director'},
  //   {value: '8', viewValue: 'Assistant Director'},
  //   {value: '9', viewValue: 'Programme Manager'},
  //   {value: '10', viewValue: 'District Manager'},
  //   {value: '11', viewValue: 'Service Point Manager'},
  //   {value: '12', viewValue: 'Social Worker/CDP'},
  //   {value: '13', viewValue: 'Facility Manager'},
  //   {value: '14', viewValue: 'M&E Coordinator'},
  //   {value: '15', viewValue: 'Social Worker Manager'}
  // ];

  // cities = [
  //   {value: '7', viewValue: 'Western Cape'},
  //   {value: '1', viewValue: 'Eastern Cape'},
  //   {value: '2', viewValue: 'Northern Cape'},
  //   {value: '3', viewValue: 'Kwa-ZuluNatal'},
  //   {value: '4', viewValue: 'Free State'},
  //   {value: '5', viewValue: 'Gauteng'},
  //   {value: '6', viewValue: 'North West'},
  //   {value: '8', viewValue: 'Mphumulanga'},
  //   {value: '9', viewValue: 'Limpopo'}
  // ];
  
    constructor(private element: ElementRef, private fb: FormBuilder, private service: UserService, @Inject(MAT_DIALOG_DATA) public data: any, private spinner: NgxSpinnerService, public dialog: MatDialog) {
      //this.passData.isChild = false;
    }

    public ngOnInit() {
      this.loadLookups();
      if(this.isParent == undefined)
      {
          this.isParent = true;
      }
      
      if(this.isParent) {
        if(Object.keys(this.data).length ==0) {
        this.service.getUserProfile().subscribe(
          res => {
            this.formData = res['formData'];
          },
          err => {
            console.log(err);
          },
        );
      }
      else{
        this.formData = this.data.data;
        this.isButtonVisible = true;
      }
    }
     
    }

    updateFormData() {
      
      this.newItemEvent.emit(this.formData);

    }

    updateUser(){

      this.spinner.show();
      this.service.UpdateUserProfile(this.formData).subscribe(
        res => {          
          //this.data1 = res;
          //window.location.replace("/dashboard");
          this.showNotification('top','right','User updated', 'Updated successfull.','success');
          this.spinner.hide();
        },
        err => {
          this.spinner.hide();
          console.log(err);
        },
      );

    }

    loadLookups(){
      this.spinner.show();

      this.service.getLocations(1038).subscribe(
        res => {
          this.spinner.hide();
          this.cities = res; 
        },
        err => {
          this.spinner.hide();
          console.log(err);
        },
      );

      this.roles = [new listitem()];
      this.service.getRoles().subscribe(
        res => {
          this.spinner.hide();      
          //this.userroles = res;  

            res.forEach(element => {
            this.uRole = new listitem();
            this.uRole.value = element.id;
            this.uRole.viewValue = element.name;
            this.roles.push(this.uRole);
          });
        },
        err => {
          this.spinner.hide();
          console.log(err);
        },
      );

      this.service.getLevels(4082).subscribe(
        res => {
          this.spinner.hide();
          this.locationType = res; 
        },
        err => {
          this.spinner.hide();
          console.log(err);
        },
      );

      this.service.getBranches().subscribe(
        res => {
          this.spinner.hide();
          this.branch = res;
        },
        err => {
          this.spinner.hide();
          console.log(err);
        },
      );

      this.service.getRoleTypes().subscribe(
        res => {
          this.roleTypes = res;
        },
        err => {
          console.log(err);
        },
      );


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

  
  menuAdd: any;

  clickEditAccess(item: any) {
    var body = {
      roleID: item.role
      
    };
    this.menuAdd = body;
    const dialogRef = this.dialog.open(RoleaccessComponent, {
      width: '50%',
      height: '70%',
      data: item.role,
      disableClose:false
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The menu dialog was closed');
    });
  }

  

}
