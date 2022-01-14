import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ElementRef, OnDestroy, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../../shared/user.service';
import { FormsModule } from '@angular/forms';



declare var $: any;

@Component({
    selector: 'app-role-cmp',
    templateUrl: './role.component.html'
})

export class RoleComponent implements OnInit {
  
    data: any;
    roleName = '';
    errorMessage = '';
    isValid = false;
    
    constructor(private service: UserService) {
      
    }

    public ngOnInit() {
      
        this.service.roleUsersCount().subscribe(
            res => {
              this.data = res;
            },
            err => {
              console.log(err);
            },
          );
    }

    validateControl() {

   if(this.roleName.trim() == '') {
      this.errorMessage = 'This field is mandatory.';
      this.isValid =false;
   }
   else {
    this.errorMessage = '';
    this.isValid=true;
   }

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

    addRole() {
      
      //roleName
      let body = this.roleName;
      this.service.addRole(body).subscribe(
        (res: any) => {
          this.showNotification('top','right',res.message, 'Success','success');
          this.data.push({role: this.roleName, users: 0});
          this.data.sort((a,b) => (a.role > b.role) ? 1 : ((b.role > a.role) ? -1 : 0));
        },
        err => {
          this.showNotification('top','right',err.error.message, 'Failed','danger');
        }
      );
    }

}