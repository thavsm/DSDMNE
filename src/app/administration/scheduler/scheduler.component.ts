import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../../shared/user.service';
import {NgxSpinner, NgxSpinnerService} from 'ngx-spinner';
import { role } from '../../shared/lookup.model';
import { DatePipe } from '@angular/common';


declare var $: any;

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent implements OnInit {

  Schedule: any;
  btnSave: boolean  = true; 
  btnEdit: boolean  = false; 
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
      Year: [''],
      Start: [''],
      End: [''],
      StartQ1: [''],
      EndQ1: [''],
      StartQ2: [''],
      EndQ2: [''],
      StartQ3: [''],
      EndQ3: [''],
      StartQ4: [''],
      EndQ4: ['']
    }

    
    );

   StartDate:  any;
   EndDate:  any;
   StartQ1:  any;
   EndQ1:  any;
   StartQ2:  any;
   EndQ2:  any;
   StartQ3:  any;
   EndQ3:  any;
   StartQ4:  any;
   EndQ4:  any;
   Year:  any;

  constructor(private fb: FormBuilder, private service: UserService, private spinner: NgxSpinnerService , public datepipe: DatePipe) { }

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

  onSubmit() {
    if(this.formModel.value["StartQ1"] != "" && this.formModel.value["EndQ1"] != "" && this.formModel.value["StartQ2"] != "" && this.formModel.value["EndQ2"] != "" 
    && this.formModel.value["StartQ3"] != "" && this.formModel.value["EndQ3"] != "" && this.formModel.value["StartQ4"] != "" && this.formModel.value["EndQ4"] != "" ) {

      this.spinner.show();
      for (let i = 1; i < 5; i++) {
        let StartDate = "StartQ" + i;
        let EndDate = "EndQ" + i;
        var val = {
          "FY": this.formModel.value["Year"],
          "Period": i,
          "StartDate": this.datepipe.transform(this.formModel.value[StartDate], 'dd-MMM-YYYY HH:mm:ss') ,       
          "EndDate": this.datepipe.transform(this.formModel.value[EndDate], 'dd-MMM-YYYY HH:mm:ss')
        };
  
        this.insertPeriods(val);
      }
      this.showNotification('top', 'center', 'Added successfully!', '', 'success');    
      this.spinner.hide();  

    }else{
      this.showNotification('top', 'center', 'Please select all quarters start date and all quarters end date before saving!', '', 'danger');
    }

  }

  onSubmitEdit() {
    if(this.formModel.value["StartQ1"] != "" && this.formModel.value["EndQ1"] != "" && this.formModel.value["StartQ2"] != "" && this.formModel.value["EndQ2"] != "" 
    && this.formModel.value["StartQ3"] != "" && this.formModel.value["EndQ3"] != "" && this.formModel.value["StartQ4"] != "" && this.formModel.value["EndQ4"] != "" &&
    this.formModel.value["Start"] != "" && this.formModel.value["End"] != ""  && this.formModel.value["Year"]) {

      this.spinner.show();
      for (let i = 1; i < 5; i++) {
        let StartDate = "StartQ" + i;
        let EndDate = "EndQ" + i;
        var val = {
          "FY": this.formModel.value["Year"],
          "Period": i,
          "StartDate": this.datepipe.transform(this.formModel.value[StartDate], 'dd-MMM-YYYY HH:mm:ss') ,       
          "EndDate": this.datepipe.transform(this.formModel.value[EndDate], 'dd-MMM-YYYY HH:mm:ss')
        };
  
        this.insertPeriods(val);
      }

      var FinYearVal = { 
        "FY": this.formModel.value["Year"],   
        "StartDate": this.datepipe.transform(this.formModel.value["Start"],'dd-MMM-YYYY HH:mm:ss'),      
        "EndDate": this.datepipe.transform(this.formModel.value["End"],'dd-MMM-YYYY HH:mm:ss')
      };

      this.service.UpdateFinancialPeriod(FinYearVal).subscribe(res => {      
        this.service.getFinancialYears().subscribe(
          res => {
            this.years = res;        
          },
          err => {
            console.log(err);
          },
        );
        this.spinner.hide();  
        this.showNotification('top', 'center', 'Updated successfully!', '', 'success');    

        this.btnSave = true; 
        this.btnEdit = false; 
        this.clear();

      });

    }else{
      this.showNotification('top', 'center', 'Please select all dates before saving!', '', 'danger');
    }

  }

  insertPeriods(val:any) {
    this.spinner.show();
    this.service.InsertPeriods(val).subscribe(res => {
      this.spinner.hide(); 

      this.formModel["Year"] = [''];
      this.formModel["StartQ1"] = [''];   
      this.formModel["EndQ1"] = ['']; 
      this.formModel["StartQ2"] = ['']; 
      this.formModel["EndQ2"] = ['']; 
      this.formModel["StartQ3"] = ['']; 
      this.formModel["EndQ3"] = ['']; 
      this.formModel["StartQ4"] = ['']; 
      this.formModel["EndQ4"] = ['']; 

    });
  }

  clear(){

    this.StartDate = "";
    this.EndDate = "";
    this.StartQ1 = "";
    this.EndQ1 = "";
    this.StartQ2 = "";
    this.EndQ2 = "";
    this.StartQ3 = "";
    this.EndQ3 = "";
    this.StartQ4 = "";
    this.EndQ4 = "";
    this.Year = "";

  }
  loadYear(fy:any)
  {

    this.StartDate = "";
    this.EndDate = "";
    this.StartQ1 = "";
    this.EndQ1 = "";
    this.StartQ2 = "";
    this.EndQ2 = "";
    this.StartQ3 = "";
    this.EndQ3 = "";
    this.StartQ4 = "";
    this.EndQ4 = "";

    console.log(fy.id);
     this.service.getFinancialYear(fy.id).subscribe(
      res => {
        this.year = res;
        this.StartDate = res[0]["startDate"];
        this.EndDate = res[0]["endDate"];     

        this.btnSave = false; 
        this.btnEdit = true; 

        this.service.getFinancialPeriods(fy.fy).subscribe(
          resFinPeriods => {
            for (let i = 0; i < resFinPeriods.length ; i++) {

              if(resFinPeriods[i]["period"] == 1){
                this.StartQ1 = resFinPeriods[i]["startDate"];
                this.EndQ1= resFinPeriods[i]["endDate"];
              }else if(resFinPeriods[i]["period"] == 2){
                this.StartQ2 = resFinPeriods[i]["startDate"];
                this.EndQ2 = resFinPeriods[i]["endDate"];
              }else if(resFinPeriods[i]["period"] == 3){
                this.StartQ3 = resFinPeriods[i]["startDate"];
                this.EndQ3 = resFinPeriods[i]["endDate"];
              }else if(resFinPeriods[i]["period"] == 4){
                this.StartQ4 = resFinPeriods[i]["startDate"];
                this.EndQ4 = resFinPeriods[i]["endDate"];
              }
            }
          },
          err => {
            console.log(err);
          },
        );

      },
      err => {
        console.log(err);
      },
    );
  }

  InsertFinancialPeriods() {

    if(this.formModel.value["Start"] != "" && this.formModel.value["End"] != "" ) {
      if(this.formModel.value["Start"] != undefined && this.formModel.value["End"] != undefined ) {
        var val = {
          "ID": 0,    
          "FY": 0,   
          "StartDate": this.datepipe.transform(this.formModel.value["Start"], 'dd-MMM-YYYY HH:mm:ss') ,       
          "EndDate": this.datepipe.transform(this.formModel.value["End"], 'dd-MMM-YYYY HH:mm:ss')
        };
  
        this.spinner.show();
        this.service.InsertFinancialPeriod(val).subscribe(res => {
          this.showNotification('top', 'center', 'Financial year added successfully!', '', 'success');        
          this.service.getFinancialYears().subscribe(
            res => {
              this.years = res;        
            },
            err => {
              console.log(err);
            },
          );
          this.spinner.hide();  
          this.StartDate = "";
          this.EndDate = "";
        });
      }else{
        this.showNotification('top', 'center', 'Please select a start date and end date before saving!', '', 'danger');
      }

    }else{
      this.showNotification('top', 'center', 'Please select a start date and end date before saving!', '', 'danger');
    }

  }
  

  showNotification(from: any, align: any, message: any, title: any, type: string) {
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
}


