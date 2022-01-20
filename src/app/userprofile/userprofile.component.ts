import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ElementRef, OnDestroy, AfterViewInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

declare var $: any;

@Component({
    selector: 'app-userprofile-cmp',
    templateUrl: './userprofile.component.html'
})

export class UserProfileComponent implements OnInit {
  @Input() formData?: any;
  @Input() isParent?: boolean;
  userDetail: any;
  
  @Output() newItemEvent = new EventEmitter<any>();
  

  roles = [
    {value: '1', viewValue: 'Admin'},
    {value: '3', viewValue: 'System Administrator'},
    {value: '4', viewValue: 'Head of M&E'},
    {value: '5', viewValue: 'Head Of Department'},
    {value: '6', viewValue: 'Chief Director'},
    {value: '7', viewValue: 'Director'},
    {value: '8', viewValue: 'Assistant Director'},
    {value: '9', viewValue: 'Programme Manager'},
    {value: '10', viewValue: 'District Manager'},
    {value: '11', viewValue: 'Service Point Manager'},
    {value: '12', viewValue: 'Social Worker/CDP'},
    {value: '13', viewValue: 'Facility Manager'},
    {value: '14', viewValue: 'M&E Coordinator'},
    {value: '15', viewValue: 'Social Worker Manager'}
  ];

  cities = [
    {value: '7', viewValue: 'Western Cape'},
    {value: '1', viewValue: 'Eastern Cape'},
    {value: '2', viewValue: 'Northern Cape'},
    {value: '3', viewValue: 'Kwa-ZuluNatal'},
    {value: '4', viewValue: 'Free State'},
    {value: '5', viewValue: 'Gauteng'},
    {value: '6', viewValue: 'North West'},
    {value: '8', viewValue: 'Mphumulanga'},
    {value: '9', viewValue: 'Limpopo'}
  ];
  
    constructor(private element: ElementRef, private fb: FormBuilder, private service: UserService, @Inject(MAT_DIALOG_DATA) public data: any) {
      //this.passData.isChild = false;
    }

    public ngOnInit() {
      if(this.isParent == undefined)
      {
          this.isParent = true;
      }
      
      if(this.isParent) {
        if(Object.keys(this.data).length ==0) {
        this.service.getUserProfile().subscribe(
          res => {
            this.formData = res['formData'];
          },
          err => {
            console.log(err);
          },
        );
      }
      else{
        this.formData = this.data;
      }
    }
     
    }

    updateFormData() {
      
      this.newItemEvent.emit(this.formData);

    }

}
