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
    programVisible: boolean;
    roleSelected:number;
    isNational:boolean;
    isProvince:boolean;
    isDistrict:boolean;
    isSP:boolean;
    isFac:boolean;
    isBranch:boolean;
    isSPMultiple:boolean;
    isSPSingle:boolean;

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

    // programmes = [
    //   {value: '1', viewValue: 'Programme 1: Administration'},
    //   {value: '2', viewValue: 'Programme 2: Social Welfare Services'},
    //   {value: '3', viewValue: 'Programme 3: Children and Failies'},
    //   {value: '4', viewValue: 'Programme 4: Restorative Services'},
    //   {value: '5', viewValue: 'Programme 5: Development and Research'}
    // ];

  

  
    locationType: any[];
    roleTypes: any[];
    cities: any[];
    branch: any[];
    roles: role[];
    provinces: any[];
    districts: any[];
    servicePoints: any[];
    facilities: any[];
    
    formModel = this.fb.group({
      Email: ['',[Validators.required,Validators.email]],
      FullName: ['', Validators.required],
      Password: [''],
      ConfirmPassword: [''],
      Location: ['',Validators.required],
      Role: ['',Validators.required],
      PhoneNumber: ['',Validators.required, Validators.pattern(new RegExp("[0-9 ]{10}"))],
      EmployeeNo: [''],
      ServicePoint: [''],
      Address: [''],
      Surname: ['', Validators.required],
      LocationType: ['', Validators.required],
      Designation: [''],
      Branch: [''],
      RoleType:['3'],
      ProvinceID:[''],
      DistrictID:[''],
      ServicePointID:[''],
      ServicePointID2:[''],
      FacilityID:[''],
      //,     Programme:['']
    }, 
    { validators: this.comparePasswords 
    });

    constructor(private fb: FormBuilder, private service: UserService, private spinner: NgxSpinnerService) {
        this.programVisible=false;
        this.isBranch=false;
        this.isProvince=false;
        this.isDistrict=false;
        this.isSP=false;
        this.isFac=false;
    }

    comparePasswords(fb: FormGroup) {
      let confirmPswrdCtrl = fb.get('ConfirmPassword');

      confirmPswrdCtrl.setErrors(null);
      // //passwordMismatch
      // //confirmPswrdCtrl.errors={passwordMismatch:true}
      // if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      //   if (fb.get('Password').value != confirmPswrdCtrl.value)
      //     confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      //   else
      //     confirmPswrdCtrl.setErrors(null);
      // }
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
      console.log(this.formModel.value);
      if(this.formModel.value.FullName =='' || this.formModel.value.Surname =='' || this.formModel.value.Email =='' || this.formModel.value.PhoneNumber =='' || this.formModel.value.Role =='' || this.formModel.value.RoleType =='' || this.formModel.value.LocationType ==''){
        this.showNotification('top','right','Please complete all fields.','Error', 'info');
      }    
      else{  
        var locBranch = 0;
        var locProvince = 0;
        var locDistrict = 0;
        var locSPoint = 0;
        var locSPoints = [];
        var locFacility = 0;
        var loc = 0;
        if(this.formModel.value.Branch!='') {
          locBranch = this.formModel.value.Branch;
          loc = 8658;
        }
        if(this.formModel.value.ProvinceID!='') {
          locProvince = this.formModel.value.ProvinceID;
          loc = this.formModel.value.ProvinceID;
        }
        if(this.formModel.value.DistrictID!='') {
          locDistrict = this.formModel.value.DistrictID;
          loc = this.formModel.value.DistrictID;
        }
        if(this.formModel.value.ServicePointID!='') {
          locSPoint = this.formModel.value.ServicePointID;
          loc = this.formModel.value.ServicePointID;
        }
        if(this.formModel.value.FacilityID!='') {
          locFacility = this.formModel.value.FacilityID;
          loc = this.formModel.value.FacilityID;
        }
        if(this.formModel.value.ServicePointID2!='') {
          locSPoints = this.formModel.value.ServicePointID2;
          loc = locSPoints[0];
          locSPoint = locSPoints[0];
        }

        var locSelected = true;
        console.log('fac: ' + locFacility + ' sp: ' + locSPoint + ' sp2: ' + locSPoints + ' d: ' + locDistrict + ' p: ' + locProvince);
        switch(this.formModel.value.LocationType)
        {
          case 4264:{
              if(locFacility==0 || locSPoint==0 || locDistrict==0 || locProvince==0)
              {locSelected = false;}
              break;
          }
          case 4263:{
            if(locSPoint==0 || locDistrict==0 || locProvince==0)
            {locSelected = false;}
            break;
          }
          case 4262:{
            if(locDistrict==0 || locProvince==0)
            {locSelected = false;}
            break;
          }
          case 4261:{
            if(locProvince==0)
            {locSelected = false;}
            break;
          }

          case 4260:{
            if(locBranch==0)
            {locSelected = false;}
            break;
          }
        }

        console.log('location: ' + loc + ' - ' + locSelected);
        if(loc==0 || !locSelected){
          this.showNotification('top','right','Please complete all fields.','Error', 'info');
        }
        else{
          this.spinner.show();
          var body = {
            Email: this.formModel.value.Email,
            FullName: this.formModel.value.FullName,
            Password: this.formModel.value.Password,
            Location: loc ,
            Role: this.formModel.value.Role,
            PhoneNumber: this.formModel.value.PhoneNumber,
            EmployeeNo: this.formModel.value.EmployeeNo,
            ServicePoint: this.formModel.value.ServicePoint,
            Address: this.formModel.value.Address,
            Branch: locBranch,
            Surname: this.formModel.value.Surname,
            LocationType: this.formModel.value.LocationType,
            RoleType: this.formModel.value.RoleType,
            ProvinceID: locProvince,
            DistrictID: locDistrict,
            ServicePointID: locSPoint,
            ServicePointIDs: locSPoints,
            FacilityID: locFacility
          };
          //let bd ={Email: this.formModel.Email, Password: this.formModel.Password, FullName: this.formModel.FullName};
          this.service.register(body).subscribe(
            (res: any) => {
              this.spinner.hide();
              if (res.succeeded) {
                this.formModel.reset();
                this.showNotification('top','right','User registered successfully', '','success');
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
      }
  }

  loadLocation(loctype:any)
  {
     console.log(loctype.value);
     this.provinces =[];
     this.districts = [];
     this.servicePoints = [];
     this.facilities = [];
     this.isSPMultiple=false;
     this.isSPSingle=true;

     this.formModel.value.FacilityID = '';
     this.formModel.value.ServicePointID = '';
     this.formModel.value.DistrictID = '';
     this.formModel.value.ProvinceID = '';

     switch(loctype.value)
     {
       case 4260:
        this.isBranch=true;
        this.isProvince=false;
        this.isDistrict=false;
        this.isSP=false;
        this.isFac=false;
        break;
        case 4261:
        this.isBranch=false;
        this.isProvince=true;
        this.isDistrict=false;
        this.isSP=false;
        this.isFac=false;
        this.loadProvince();
        break;
        case 4262:
        this.isBranch=false;
        this.isProvince=true;
        this.isDistrict=true;
        this.isSP=false;
        this.isFac=false;
        this.loadProvince();
        break;
        case 4263:
        this.isBranch=false;
        this.isProvince=true;
        this.isDistrict=true;
        this.isSP=true;
        this.isFac=false;
        this.loadProvince();
        this.isSPMultiple=true;
        this.isSPSingle=false;
        break;
        case 4264:
        this.isBranch=false;
        this.isProvince=true;
        this.isDistrict=true;
        this.isSP=true;
        this.isFac=true;
        this.loadProvince();
        break;        
     }
     
    //  this.service.getNodes(loctype.value).subscribe(
    //   res => {
    //     this.cities = res;
    //   },
    //   err => {
    //     console.log(err);
    //   },
    // );
  }

  loadProvince()
  {
     console.log('LoadProvinces');
     this.service.getNodes(4261).subscribe(
      res => {
        this.provinces = res;
      },
      err => {
        console.log(err);
      },
    );
  }

  loadDistricts(province:any)
  {
     console.log(province.nodeID);
     this.service.getNodesByParent(province.nodeID).subscribe(
      res => {
        this.districts = res;
      },
      err => {
        console.log(err);
      },
    );
  }

  loadServicePoints(district:any)
  {
     console.log(district.nodeID);
     this.service.getNodesByParent(district.nodeID).subscribe(
      res => {
        this.servicePoints = res;
      },
      err => {
        console.log(err);
      },
    );
  }

  loadFacilities(sp:any)
  {
     console.log(sp.nodeID);
     this.service.getNodesByParent(sp.nodeID).subscribe(
      res => {
        this.facilities = res;
      },
      err => {
        console.log(err);
      },
    );
  }


  onLocChange(e)
  {
    let selectedLoc = e.value;

    
    this.isNational = false; 
    this.isProvince = false; 
    this.isDistrict = false; 
    this.isSP = false; 
    this.isFac = false;

    switch(selectedLoc)
    {
      case "National": this.isNational = true; break;
      case "Province": this.isProvince = true; break;
      case "District": this.isDistrict = true; break;
      case "Service Point": this.isSP = true; break;
      case "Facility": this.isFac = true; break;
    }

  }

  loadLocationType(role:any)
  {
     console.log(role.id);

     this.service.getLevels(4082).subscribe(
      res => {
        this.locationType = res;
      },
      err => {
        console.log(err);
      },
    );
     
     this.isBranch=false;
     this.isProvince=false;
     this.isDistrict=false;
     this.isSP=false;
     this.isFac=false;

     let locs = [];
     let l:any;

     switch(role.id)
     {
       case '46':
          case '6':
            case '7':
              case '8':
                case '18':
                  case '3':
            
        this.isBranch=true;
        this.isProvince=false;
        this.isDistrict=false;
        this.isSP=false;
        this.isFac=false;        
        l = this.locationType.find(loc => loc.value === 4260);
        locs.push(l);
        this.locationType = locs;                            
        break;
        
       case '4':
        case '42':
          case '44':
            case '45':
              case '47':
                case '9': 
        this.isBranch=false;
        this.isProvince=true;
        this.isDistrict=false;
        this.isSP=false;
        this.isFac=false;       
        l = this.locationType.find(loc => loc.value === 4261);
        locs.push(l);
        this.locationType = locs;
        this.loadProvince(); 
        break;
        case '10':
        this.isBranch=false;
        this.isProvince=true;
        this.isDistrict=true;
        this.isSP=false;
        this.isFac=false;
        this.loadProvince();
        l = this.locationType.find(loc => loc.value === 4262);
        locs.push(l);
        this.locationType = locs; 
        break;
        case '11':
        this.isBranch=false;
        this.isProvince=true;
        this.isDistrict=true;
        this.isSP=true;
        this.isFac=false;
        this.loadProvince();
        l = this.locationType.find(loc => loc.value === 4263);
        locs.push(l);
        this.locationType = locs; 
        break;
        
     }
     
  }

  onSPMultiSelect(sp:any)
  {
     console.log(sp.nodeID);
     console.log(this.formModel.value.ServicePointID2);
  }


  // onRoleChange(e)
  // {
  //   let selectedRole = e.value;

  //   if(selectedRole == 'Programme Manager')
  //   this.programVisible = true;
  //   else
  //   this.programVisible = false;

  // }


  // onProgChange(e)
  // {
  //   let selectedProg = e.value;
  //   console.log(selectedProg[0]);
  // }

}
