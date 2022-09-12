import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { HierarchyManagementService } from 'src/app/hierarchy-management.service';
import { UserService } from '../../shared/user.service';
declare var $: any;

@Component({
  selector: 'app-newrole',
  templateUrl: './newrole.component.html',
  styleUrls: ['./newrole.component.css']
})
export class NewroleComponent implements OnInit {


  data:any;
  name:any='';
  facilityType:any='-1';
  isActive:boolean=true;
  facilityTypes:any=[];
  formRole = this.fb.group({
    RoleName: ['',[Validators.required]]
  },{});

 secondFormGroup = this.fb.group({
  facilityType: ['', Validators.required],
  });

  constructor(
    public dialogRef: MatDialogRef<NewroleComponent>,
    private service: UserService, public formBuilder: FormBuilder, private spinner: NgxSpinnerService,
    private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) d,private treeService:HierarchyManagementService) {
    this.data = d;
  }


  ngOnInit(): void {
    this.getFacilityTypes();
    if(this.data.state=="edit"){
      this.facilityType=this.data.data.facilityTypeID;
      this.name=this.data.data.role;
      if(this.data.data.concurrencyStamp!=null){
        this.isActive=false;
      }
    }
    else{
      this.name='';
      if(this.data.data.concurrencyStamp!=null){
        this.isActive=false;
      }
    }
  }

  getFacilityTypes(){
    this.treeService.getFacilityType().subscribe(res=>{
      this.facilityTypes=res;
    })
  }

  addRole(){
    let body = this.name;
    let concurrency='';
    if(this.isActive==false){
      concurrency=new Date().toUTCString();
    }
    this.service.addNewRole(body,concurrency,-1,this.facilityType).subscribe(
      (res: any) => {
        this.showNotification('top','right',"Added role successfully", '','success');
        this.dialogRef.close();
      },
      err => {
        this.showNotification('top','right',err.error.message, '','danger');
      }
    );
  }

  editRole(){
    let body =this.name;
    let concurrency='';
    if(this.isActive==false){
      concurrency= new Date().toUTCString();
    }
    this.service.addNewRole(body,concurrency,this.data.data.roleID,this.facilityType).subscribe(
      (res: any) => {
        this.showNotification('top','right',"Updated role successfully", '','success');
        this.dialogRef.close();
      },
      err => {
        this.showNotification('top','right',err.error.message, '','danger');
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
  
  closePopup() {
    this.dialogRef.close();
  }
}
