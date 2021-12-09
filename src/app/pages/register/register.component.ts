import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy, NgModule } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';

declare var $: any;

@Component({
    selector: 'app-register-cmp',
    templateUrl: './register.component.html'    
})

export class RegisterComponent implements OnInit, OnDestroy {
    test: Date = new Date();

    
    selectedValue: string;
    currentCity: string[];
    saving = false;

    selectTheme = 'primary';
    cities = [
      {value: '7', viewValue: 'Western Cape'},
      {value: '1', viewValue: 'Eastern Cape'},
      {value: '2', viewValue: 'Northern Cape'},
      {value: '3', viewValue: 'Kwa-ZuluNatal'},
      {value: '4', viewValue: 'Free State'},
      {value: '5', viewValue: 'Gauteng'},
      {value: '6', viewValue: 'North West'},
      {value: '8', viewValue: 'Mphumulanga'},
      {value: '9', viewValue: 'Limpopo'},
    ];
    
    roles = [
      {value: 'Admin', viewValue: 'Admin'},
      {value: 'Customer', viewValue: 'Customer'},      
    ];
    
    
    formModel = this.fb.group({
      Email: ['',[Validators.required,Validators.email]],
      FullName: ['', Validators.required],
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['',Validators.required],
      Location: ['',Validators.required],
      Role: ['',Validators.required]
    }, { validators: this.comparePasswords 
    });

    constructor(private fb: FormBuilder, private service: UserService) {
        
    }

    comparePasswords(fb: FormGroup) {
      let confirmPswrdCtrl = fb.get('ConfirmPassword');
      //passwordMismatch
      //confirmPswrdCtrl.errors={passwordMismatch:true}
      if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
        if (fb.get('Password').value != confirmPswrdCtrl.value)
          confirmPswrdCtrl.setErrors({ passwordMismatch: true });
        else
          confirmPswrdCtrl.setErrors(null);
      }
    }

    ngOnInit() {
      const body = document.getElementsByTagName('body')[0];
      body.classList.add('register-page');
      body.classList.add('off-canvas-sidebar');
      
    }

    ngOnDestroy(){
      const body = document.getElementsByTagName('body')[0];
      body.classList.remove('register-page');
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
      this.saving = true;
      
      var body = {
        Email: this.formModel.value.Email,
        FullName: this.formModel.value.FullName,
        Password: this.formModel.value.Password,
        Location: this.formModel.value.Location,
        Role: this.formModel.value.Role
      };
      //let bd ={Email: this.formModel.Email, Password: this.formModel.Password, FullName: this.formModel.FullName};
      this.service.register(body).subscribe(
        (res: any) => {
          if (res.succeeded) {
            this.saving = false;
            this.formModel.reset();
            this.showNotification('top','right','New user created!', 'Registration successful.','success');
          } else {
            this.saving = false;
            res.errors.forEach(element => {
              switch (element.code) {
                case 'DuplicateUserName':
                  this.showNotification('top','right','Email is already taken','Registration failed.','danger');
                  break;
  
                default:
                  this.showNotification('top','right',element.description,'Registration failed.','danger');
                  break;
              }
            });
          }
        },
        err => {
          this.saving = false;
          console.log(err);
        }
      );

  }

}
