import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import {NgxSpinner, NgxSpinnerService} from 'ngx-spinner';

declare var $: any;

@Component({
    selector: 'app-resetpassword-cmp',
    templateUrl: './resetpassword.component.html'
})

export class ResetPasswordComponent implements OnInit, OnDestroy {
    test: Date = new Date();
    private toggleButton: any;
    private sidebarVisible: boolean;
    private nativeElement: Node;
    formModel = this.fb.group({
      UserName: ['',[Validators.required,Validators.email]],
      NewPassword: [''],
      Token: ['']
     
    });

    email = '';
    code = '';
    cardDesc = '';
    isControlVisible = true;

    constructor(private element: ElementRef, private fb: FormBuilder, private service: UserService, private router: Router, private spinner: NgxSpinnerService) {
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
        
    }

    ngOnInit() {
        var navbar : HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');
        body.classList.add('off-canvas-sidebar');
        const card = document.getElementsByClassName('card')[0];
        setTimeout(function() {
            // after 1000 ms we add the class animated to the login/register card
            card.classList.remove('card-hidden');
        }, 700);

        this.EnableContorols(null);
       //new URLSearchParams(window.location.search).get('email')
    }

    EnableContorols(emailv: string) {
      
      if( emailv != null) {
        this.email =emailv;
        this.cardDesc ='Please enter code and new password';
        this.isControlVisible =false;
      }
      else {
        this.cardDesc ='Please enter your email address to request a password reset.';
        this.isControlVisible =true;
      }
    }

    sidebarToggle() {
        var toggleButton = this.toggleButton;
        var body = document.getElementsByTagName('body')[0];
        var sidebar = document.getElementsByClassName('navbar-collapse')[0];
        if (this.sidebarVisible == false) {
            setTimeout(function() {
                toggleButton.classList.add('toggled');
            }, 500);
            body.classList.add('nav-open');
            this.sidebarVisible = true;
        } else {
            this.toggleButton.classList.remove('toggled');
            this.sidebarVisible = false;
            body.classList.remove('nav-open');
        }
    }
    ngOnDestroy(){
      const body = document.getElementsByTagName('body')[0];
      body.classList.remove('login-page');
      body.classList.remove('off-canvas-sidebar');
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
    
    this.spinner.show();
    if(this.isControlVisible) {
    this.service.getPasswordResetToken(this.formModel.value.UserName).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.showNotification('top','right',res.message, '','success');
        this.EnableContorols(this.formModel.value.UserName);
      },
      err => {
        this.spinner.hide();
        console.log(err);
        this.showNotification('top','right',err.error.message, '','danger');
      },
    );
    
  }
  else {
   
    let rmodel =this.formModel.value;
    this.service.resetPassword(rmodel).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.showNotification('top','right',res.message, '','success');
        this.router.navigate(['/login']);
      },
      err => {
        this.spinner.hide();
        console.log(err);
        this.showNotification('top','right',err.error.message[0].description, '','danger');
      },
    );

  }


    
  }



}
