import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ElementRef, OnDestroy, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../../shared/user.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


declare var $: any;

@Component({
    selector: 'app-changepassword-cmp',
    templateUrl: './changepassword.component.html'
})


export class ChangePasswordComponent implements OnInit {

  currentPassword = '';
  newPassword= '';
  confirmPassword = '';
  //isValid= false;
  error= {currPassword: 'This field is mandatory.', newPassword: 'This field is mandatory.', confPassword: 'This field is mandatory.', isValid: false};

    constructor(private service: UserService, private router: Router) {

       
    }

    ngOnInit() {

    }

    validateControls() {
      
      this.error.isValid = true;
      if(this.currentPassword == '') {
        this.error.currPassword = 'This field is mandatory.';
        this.error.isValid = false;
      }
      else {
        this.error.currPassword = '';
      }

      if(this.newPassword == '') {
        this.error.newPassword = 'This field is mandatory.';
        this.error.isValid = false;
      }
      else {
        this.error.newPassword = '';
      }

      if(this.confirmPassword == '') {
        this.error.confPassword = 'This field is mandatory.';
        this.error.isValid = false;
      }
      
      else if(this.newPassword != this.confirmPassword) {
        this.error.confPassword = 'Confirm password does not match.';
        this.error.isValid = false;
      }
      else {
        this.error.confPassword = '';
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
    
    onSubmit() {
      //this.saving = true;
      //this.spinner.show();
      var body = {
        
        Password: this.currentPassword,
        NewPassword: this.newPassword,
      };
      //let bd ={UserName: this.formModel.value.UserName, Password: this.formModel.value.Password};
      this.service.changePassword(body).subscribe(
        (res: any) => {
          this.showNotification('top','right',res.message, '','success');
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        },
        err => {
          if (err.status == 400)
          this.showNotification('top','right',err.error.message[0].description, '','danger');
          else
            console.log(err);
        }
      );
  }
    
}