import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import {NgxSpinner, NgxSpinnerService} from 'ngx-spinner';

declare var $: any;

@Component({
    selector: 'app-login-cmp',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit, OnDestroy {
    test: Date = new Date();
    private toggleButton: any;
    private sidebarVisible: boolean;
    private nativeElement: Node;
    formModel = this.fb.group({
      UserName: ['',[Validators.required,Validators.email]],
      Password: ['', Validators.required]
     
    });

      

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
    
    onSubmit() {
        
        //let bd ={UserName: this.formModel.value.UserName, Password: this.formModel.value.Password};
        this.spinner.show();
        this.service.login(this.formModel.value).subscribe(
          (res: any) => {
            this.spinner.hide();
            localStorage.setItem('token', res.token);
            this.router.navigate(['/dashboard']);
          },
          err => {
            this.spinner.hide();
            if (err.status == 400) {
            this.showNotification('top','right',err.error.message, 'Authentication failed.','danger');
            }
            else
            {
              this.showNotification('top','right','Unable to login', 'Authentication failed.','danger');
              console.log(err);
            }
          }
        );

    }


}
