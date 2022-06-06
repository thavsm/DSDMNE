import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../../shared/user.service';
import {NgxSpinner, NgxSpinnerService} from 'ngx-spinner';
import { role } from '../../shared/lookup.model';

declare var $: any;

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent implements OnInit {

  //  years = [
  //     {value: '1', year: '2022'},
  //     {value: '2', year: '2023'},
  //     {value: '3', year: '2024'},
  //     {value: '4', year: '2025'},
  //     {value: '5', year: '2026'}
  //   ];
    years: any[];
    year: any[];
    formModel = this.fb.group({
      Year: ['', Validators.required],
      Start: ['05/11/2022'],
      End: [''],
      Facility: [''],
      FacilityReminder: [''],
      ServicePoint: [''],
      ServicePointReminder: [''],
      District: [''],
      DistrictReminder: [''],
      PPM: [''],
      PPMReminder: [''],
      PME: [''],
      PMEReminder: [''],
      HOD: [''],
      HODReminder: [''],
      NAT: [''],
      NATReminder: [''],
      
    }

    );

  constructor(private fb: FormBuilder, private service: UserService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {

    
    this.service.getFinancialYears().subscribe(
      res => {
        this.years = res;        
      },
      err => {
        console.log(err);
      },
    );
  }

  onSubmit() {}

  loadYear(fy:any)
  {
     console.log(fy.id);
     this.service.getFinancialYear(fy.id).subscribe(
      res => {
        this.year = res;
        this.formModel["Start"] = res[0]["startDate"];
        this.formModel["End"] = res[0]["endDate"];      
      },
      err => {
        console.log(err);
      },
    );
  }

}
