import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../../shared/user.service';
declare var $: any;

@Component({
  selector: 'app-newrole',
  templateUrl: './newrole.component.html',
  styleUrls: ['./newrole.component.css']
})
export class NewroleComponent implements OnInit {


  formRole = this.fb.group({
    RoleName: ['',[Validators.required]]
  },{});

  constructor(
    public dialogRef: MatDialogRef<NewroleComponent>,
    private service: UserService, public formBuilder: FormBuilder,private spinner: NgxSpinnerService,
    private fb: FormBuilder
  ) {
    
  }


  ngOnInit(): void {
  }

  addRole(){

    //roleName
    let body = this.formRole.value.RoleName;
    console.log(body);
    this.service.addNewRole(body).subscribe(
      (res: any) => {
        this.showNotification('top','right',res.message, 'Success','success');
      },
      err => {
        this.showNotification('top','right',err.error.message, 'Failed','danger');
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
  
  closePopup() {
    this.dialogRef.close();
  }
}
