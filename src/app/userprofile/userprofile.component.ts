import { HttpClient, } from '@angular/common/http';
import { Component, OnInit, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { FormsModule } from '@angular/forms';



declare var $: any;

@Component({
    selector: 'app-userprofile-cmp',
    templateUrl: './userprofile.component.html'
})

export class UserProfileComponent implements OnInit {

  userDetail: any;
  
  
    constructor(private element: ElementRef, private fb: FormBuilder, private service: UserService) {
      
    }

    ngOnInit() {
        this.service.getUserProfile().subscribe(
          res => {
            this.userDetail = res;
          },
          err => {
            console.log(err);
          },
        );
      }

}