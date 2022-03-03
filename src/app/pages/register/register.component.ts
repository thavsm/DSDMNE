import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy, NgModule } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../../shared/user.service';
import {NgxSpinner, NgxSpinnerService} from 'ngx-spinner';
import { role } from '../../shared/lookup.model';

declare var $: any;

@Component({
    selector: 'app-register-cmp',
    templateUrl: './register.component.html'    
})

export class RegisterComponent implements OnInit, OnDestroy {
    test: Date = new Date();

    
    selectedValue: string;
    currentCity: string[];

    selectTheme = 'primary';
    // cities = [
    //   {value: '7', viewValue: 'Western Cape'},
    //   {value: '1', viewValue: 'Eastern Cape'},
    //   {value: '2', viewValue: 'Northern Cape'},
    //   {value: '3', viewValue: 'Kwa-ZuluNatal'},
    //   {value: '4', viewValue: 'Free State'},
    //   {value: '5', viewValue: 'Gauteng'},
    //   {value: '6', viewValue: 'North West'},
    //   {value: '8', viewValue: 'Mphumulanga'},
    //   {value: '9', viewValue: 'Limpopo'},
    // ];

    // locationType = [
    //   {value: '1', viewValue: 'National'},
    //   {value: '2', viewValue: 'Provincial'},    
    //   {value: '3', viewValue: 'District'},
    //   {value: '4', viewValue: 'Service Point'},
    //   {value: '5', viewValue: 'NPO/Facility'},
    // ];

    // roles = [
    //   {value: 'Data Capturer', viewValue: 'Data Capturer'},
    //   {value: 'Verifier/Approver', viewValue: 'Verifier/Approver'},    
    //   {value: 'Viewer', viewValue: 'Viewer'},
    //   {value: 'System Admin', viewValue: 'System Admin'},
    // ];
  
    // branch = [
    //   {value: '1', viewValue: 'Community Development'},
    //   {value: '2', viewValue: 'Social Welfare Services'},    
    //   {value: '3', viewValue: 'Strategy Organization Transformation'},
    //   {value: '4', viewValue: 'Social Security'},
    //   {value: '5', viewValue: 'National'},
    // ];

  

  
    locationType: any[];
    roleTypes: any[];
    cities: any[];
    branch: any[];
    roles: role[];
    
    formModel = this.fb.group({
      Email: ['',[Validators.required,Validators.email]],
      FullName: ['', Validators.required],
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['',Validators.required],
      Location: ['',Validators.required],
      Role: ['',Validators.required],
      PhoneNumber: ['',Validators.required],
      EmployeeNo: [''],
      ServicePoint: [''],
      Address: [''],
      Surname: [''],
      LocationType: [''],
      Designation: [''],
      Branch: [''],
    }, { validators: this.comparePasswords 
    });

    constructor(private fb: FormBuilder, private service: UserService, private spinner: NgxSpinnerService) {
        
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

      this.service.getRoles().subscribe(
        res => {
          this.roles = res;
        },
        err => {
          console.log(err);
        },
      );

      this.service.getLevels(4082).subscribe(
        res => {
          this.locationType = res;
        },
        err => {
          console.log(err);
        },
      );
      
      this.service.getBranches().subscribe(
        res => {
          this.branch = res;
        },
        err => {
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
      //this.saving = true;
      this.spinner.show();
      var body = {
        Email: this.formModel.value.Email,
        FullName: this.formModel.value.FullName,
        Password: this.formModel.value.Password,
        Location: this.formModel.value.Location,
        Role: this.formModel.value.Role,
        PhoneNumber: this.formModel.value.PhoneNumber,
        EmployeeNo: this.formModel.value.EmployeeNo,
        ServicePoint: this.formModel.value.ServicePoint,
        Address: this.formModel.value.Address,
        Branch: this.formModel.value.Branch,
        Surname: this.formModel.value.Surname,
        LocationType: this.formModel.value.LocationType,
        RoleType: this.formModel.value.RoleType
        
      };
      //let bd ={Email: this.formModel.Email, Password: this.formModel.Password, FullName: this.formModel.FullName};
      this.service.register(body).subscribe(
        (res: any) => {
          this.spinner.hide();
          if (res.succeeded) {
            this.formModel.reset();
            this.showNotification('top','right','New user created!', 'Registration successful.','success');
          } 
          else {  
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
          this.spinner.hide();
          console.log(err);
        }
      );

  }

  loadLocation(loctype:any)
  {
     console.log(loctype.value);
     this.service.getNodes(loctype.value).subscribe(
      res => {
        this.cities = res;
      },
      err => {
        console.log(err);
      },
    );
  }

}
