import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ElementRef, OnDestroy, AfterViewInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { NgxSpinnerService } from 'ngx-spinner';
import { role } from '../shared/lookup.model';
import { listitem } from '../userprofile/listitem.model';
import { RoleaccessComponent } from '../usermanager/roleaccess/roleaccess.component';
import { AppusersComponent } from '../usermanager/appusers/appusers.component';

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
  isButtonVisibleAccess = false;
  cities: [listitem];
  levels: [listitem];
  roles: [listitem];
  userroles: role[];
  uRole: listitem;
  locationType: [listitem];
  roleTypes: [listitem];
  branch: [listitem];  
  provinces: any[];
  districts: any[];
  servicePoints: any[];
  facilities: any[];

  roleSelected:number;
  isNational:boolean;
  isProvince:boolean;
  isDistrict:boolean;
  isSP:boolean;
  isFac:boolean;
  isBranch:boolean;

  active = 'InActive';

  @Output() newItemEvent = new EventEmitter<any>();
  

  
    constructor(private element: ElementRef, private fb: FormBuilder, private service: UserService, @Inject(MAT_DIALOG_DATA) public data: any, private spinner: NgxSpinnerService, public dialog: MatDialog) {
      //this.passData.isChild = false;
      this.isBranch=false;
      this.isProvince=false;
      this.isDistrict=false;
      this.isSP=false;
      this.isFac=false;
    }

    // closePopup(){
    //   this.dialogRef.close();
    // }

    public ngOnInit() {
      this.loadLookups();
      if(this.isParent == undefined)
      {
          this.isParent = true;
      }
      
      //this.isParent = true;
      console.log(this.isParent);
      if(this.isParent) {
        if(Object.keys(this.data).length ==0) {
            this.service.getUserProfile().subscribe(
              res => {
                this.formData = res['formData'];
                console.log(this.formData);
                console.log(this.formData["active"]);
                if(this.formData["active"])
                  this.active = "Active";
                else
                  this.active = "InActive";
              },
              err => {
                console.log(err);
              },
            );
        }      
        else{
          this.formData = this.data.data;
          console.log(this.formData);
          if(this.formData["active"])
                this.active = "Active";
              else
                this.active = "InActive";
          this.isButtonVisible = true;
        }      
        
      } 
      else{
        this.service.getUserByID(this.formData["userID"]).subscribe(
          res => {
            res.forEach(element => {
              this.formData["provinceID"] = element.provinceID;
            this.formData["districtID"] = element.districtID;
            this.formData["servicePointID"] = element.servicePointID;
            this.formData["facilityID"] = element.facilityID;
            this.formData["active"] = element.active;
            if(this.formData["active"])
            this.active = "Active";
          else
            this.active = "InActive";
            });
            
          },
          err => {
            this.spinner.hide();
            console.log(err);
          },
        );
          console.log(this.formData);
          if(this.formData["active"])
                this.active = "Active";
              else
                this.active = "InActive";
      } 

      switch(this.formData["locationType"])
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
          break;
          case 4262:
          this.isBranch=false;
          this.isProvince=true;
          this.isDistrict=true;
          this.isSP=false;
          this.isFac=false;
          break;
          case 4263:
          this.isBranch=false;
          this.isProvince=true;
          this.isDistrict=true;
          this.isSP=true;
          this.isFac=false;
          break;
          case 4264:
          this.isBranch=false;
          this.isProvince=true;
          this.isDistrict=true;
          this.isSP=true;
          this.isFac=true;
          break;
        }
    }       

    updateFormData() {

      if(this.formData["active"])
      {
        this.active = "Active";
      }
      else
      {
        this.active = "In-Active";
      }
      
      this.newItemEvent.emit(this.formData);

    }


    updateUser(){

      this.spinner.show();

      
      switch(this.formData["locationType"])
      {
        case 4260: this.formData["provinceID"] = "0";
        this.formData["districtID"] = "0";
        this.formData["servicePointID"] = "0";
        this.formData["facilityID"] = "0";
        this.formData["location"] = "8658";
        break;
        case 4261: this.formData["districtID"] = "0";
        this.formData["servicePointID"] = "0";
        this.formData["facilityID"] = "0";
        this.formData["location"] = this.formData["provinceID"];
        break;
        case 4262: this.formData["servicePointID"] = "0";
        this.formData["facilityID"] = "0";
        this.formData["location"] = this.formData["districtID"];
        break;
        case 4263: this.formData["facilityID"] = "0";
        this.formData["location"] = this.formData["servicePointID"];
        break;
        case 4264: this.formData["location"] = this.formData["facilityID"];
        break;               
        
      }
      this.service.UpdateUserProfile(this.formData).subscribe(
        res => {          
          //this.data1 = res;
          //window.location.replace("/dashboard");
          this.showNotification('top','right','', 'User details has been updated successfully.','success');
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


     this.service.getNodes(4261).subscribe(
      res => {
        this.provinces = res;
      },
      err => {
        console.log(err);
      },
    );
  
    this.service.getNodes(4262).subscribe(
      res => {
        this.districts = res;
      },
      err => {
        console.log(err);
      },
    );
  
    this.service.getNodes(4263).subscribe(
      res => {
        this.servicePoints = res;
      },
      err => {
        console.log(err);
      },
    );
  
    this.service.getNodes(4264).subscribe(
      res => {
        this.facilities = res;
      },
      err => {
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

  loadLocation(loctype:any)
  {
     console.log(loctype.value);
     this.provinces =[];
     this.districts = [];
     this.servicePoints = [];
     this.facilities = [];

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



}
