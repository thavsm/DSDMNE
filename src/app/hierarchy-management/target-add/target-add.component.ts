import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {NgxSpinner, NgxSpinnerService} from 'ngx-spinner';
import { merge } from 'jquery';
import * as moment from 'moment';
import { TreediagramService } from 'src/app/treediagram.service';
declare var $: any;
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-target-add',
  templateUrl: './target-add.component.html',
  styleUrls: ['./target-add.component.css']
})
export class TargetAddComponent implements OnInit {

  submitted = false;
  tgAdd: any;
  FormValue: any;
  nodefields: any;
  Roles:any=[];
  UserfieldTypes: any=[];

  Period: any;
  treeData: any;
  p: number = 1;
  targetData:any;
  divListValue: boolean  = false;

  divPeriod: boolean  = false;
  divQ1: boolean  = false;
  divQ2: boolean  = false;
  divQ3: boolean  = false;
  divQ4: boolean  = false;
  divAT: boolean  = false;
  divLengthValidation: boolean  = false;
  divLengthReportUrl : boolean  = false;
  isBtnDisabled: boolean  = true;
  isDisabled  : boolean  = false;
  LevelData: any;
  isSubmitBtnDisabled: boolean= true;
  LevelfieldCompulsory: any;
  AttributesDataExportName: any=[];
  nodes: any;
  btnText: string = "Add";
  targetID: number = 0;
  quaterOne:number = 0;
  quaterTwo:number = 0;
  quaterThree: number = 0;
  quaterFour: number = 0;
  annualTarget: number = 0;
  nodeID: number = 0;
  levelID: any;
  financialYear: string ="";
  financialStartDate:any;
  financialYearTypes:any=[];
  currentDate : any;
  TargetAnnual : any;

  Month : string =""; 
  Year : number; 
  TxtMonths : any;
  Date: any;
  FinYear : string =""; 
  i = 0 ;
  CurrentYear: number;
  FollowingYear: number;
  FinancialYears : any=[];
  divContorls : boolean  = true;
  thEdit: boolean  = true;
  BtnAddTarget: boolean  = true;
  constructor(public dialogRef: MatDialogRef<TargetAddComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    public service: TreediagramService, public formBuilder: FormBuilder,private spinner: NgxSpinnerService, public datepipe: DatePipe) {
      this.tgAdd =data; 
      this.treeData = JSON.parse(localStorage.getItem('treeData') || '{}');
     }

 

  ngOnInit(): void {
    this.service.GetTargetsForm(this.tgAdd.nodeID);
    this.getTargetPeriod(this.tgAdd.nodeID);
    this.nodeID = this.tgAdd.nodeID;
    this.targetID = this.tgAdd.targetID;
    this.quaterOne = this.tgAdd.quaterOne;
    this.quaterTwo = this.tgAdd.quaterTwo;
    this.quaterThree = this.tgAdd.quaterThree;
    this.quaterFour = this.tgAdd.quaterFour;
    this.annualTarget = this.tgAdd.annualTarget;
    this.financialYear = this.tgAdd.financialYear;
    this.financialStartDate = this.tgAdd.financialStartDate;
    this.getTargetPeriod(this.tgAdd.nodeID);
    this.hideEditButtons();
  }

  hideEditButtons(){

    if(this.tgAdd.ViewEdit == 1){

      this.divContorls = true;
      this.thEdit= true;  
      this.BtnAddTarget = true;  

    }else if(this.tgAdd.ViewEdit == 0){

      this.divContorls = false;
      this.thEdit= false;  
      this.BtnAddTarget = false;  
      
    }
  }

  public gridData: any = this.service.GetTargetsForm(this.nodeID);

  onDateChange(ob) {


    this.TxtMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.Date = new Date(this.tgAdd.financialStartDate);
    this.Month = this.TxtMonths[this.Date.getMonth()];
    this.Year = this.Date.getFullYear();

    for(this.i=1; this.i <= 5; this.i++ )
    {
      if(this.i == 1){
        this.CurrentYear = this.Year;
      }else{
        this.CurrentYear = this.Year + this.i
      }

      this.FollowingYear = this.CurrentYear + 1;
      this.FinYear = this.Month + this.CurrentYear + "/" + this.Month + this.FollowingYear; 

      this.FinancialYears.push({"financialYear" : this.FinYear});
    }

    this.Period = this.FinancialYears;

    this.divPeriod = true;
    this.divQ1 = true;
    this.divQ2 = true;
    this.divQ3 = true;
    this.divQ4 = true;
    this.divAT = true;
    this.isBtnDisabled = false;


  }

  onValueChange(ob) {

    this.tgAdd.annualTarget = this.tgAdd.quaterOne + this.tgAdd.quaterTwo + this.tgAdd.quaterThree + this.tgAdd.quaterFour;
    
  }
  
  clickEdit(item: any) {

    this.tgAdd = {
      "annualTarget": item.annualTarget,
      "financialStartDate": this.datepipe.transform(item.financialStartDate, 'yyyy-MM-dd'),
      "financialYear": item.financialYear,
      "nodeID": item.nodeID,
      "quaterFour": item.quaterFour,
      "quaterOne": item.quaterOne,
      "quaterThree": item.quaterThree,
      "quaterTwo": item.quaterTwo,
      "targetID": item.targetID,
    }
 
    this.divPeriod = true;
    this.divQ1 = true;
    this.divQ2 = true;
    this.divQ3 = true;
    this.divQ4 = true;
    this.divAT = true;
    this.isDisabled = true;
    this.isBtnDisabled = false;  
    this.btnText = "Edit";

  }

  clickDelete(item: any) {

 
  }


  addTarget(){ 

    this.isDisabled = false;

    if (this.tgAdd.financialStartDate != "") {
    
      this.currentDate = new Date();

      if (this.btnText == "Add") {

        //adding form
        this.submitted = true;
        var val = {
          "targetID": 0,
          "quaterOne": this.tgAdd.quaterOne,
          "quaterTwo": this.tgAdd.quaterTwo,
          "quaterThree": this.tgAdd.quaterThree,
          "quaterFour": this.tgAdd.quaterFour,
          "annualTarget": this.tgAdd.quaterOne + this.tgAdd.quaterTwo + this.tgAdd.quaterThree + this.tgAdd.quaterFour,
          "nodeID": this.tgAdd.nodeID,
          "financialYear": this.tgAdd.financialYear,
          "financialStartDate": this.datepipe.transform(this.tgAdd.financialStartDate, 'yyyy-MM-dd') + "T"+ this.datepipe.transform(this.currentDate, 'HH:mm:ss.SSS') +"Z"
        }
        this.spinner.show();
        this.btnText = "Add";
        this.service.AddTargetsForm(val).subscribe(res => {
          this.spinner.hide();
          this.showNotification('top','center','Target Added Successfully!','Success','success');
          this.service.GetTargetsForm(this.tgAdd.nodeID);  
          this.tgAdd.targetID = 0;
          this.tgAdd.quaterOne = "";
          this.tgAdd.quaterTwo = "";
          this.tgAdd.quaterThree = "";
          this.tgAdd.quaterFour = "";
          this.tgAdd.annualTarget = "";
          this.tgAdd.nodeID = "";
          this.tgAdd.financialYear = "";
          this.tgAdd.financialStartDate = "";
          this.divPeriod = false;
          this.divQ1 = false;
          this.divQ2 = false;
          this.divQ3 = false;
          this.divQ4 = false;
          this.divAT = false;
          this.isBtnDisabled = true;  

        });

      }else{
      //updating Target
      this.submitted = true;
      this.TargetAnnual = this.tgAdd.quaterOne + this.tgAdd.quaterTwo + this.tgAdd.quaterFour + this.tgAdd.quaterFour; 
      // stop here if form is invalid
        var Editval = {
          "targetID": this.tgAdd.targetID,
          "quaterOne": this.tgAdd.quaterOne,
          "quaterTwo": this.tgAdd.quaterTwo,
          "quaterThree": this.tgAdd.quaterThree,
          "quaterFour": this.tgAdd.quaterFour,
          "annualTarget": this.tgAdd.quaterOne + this.tgAdd.quaterTwo + this.tgAdd.quaterThree + this.tgAdd.quaterFour,
          "nodeID": this.tgAdd.nodeID,
          "financialYear": this.tgAdd.financialYear,
          "financialStartDate":  this.datepipe.transform(this.tgAdd.financialStartDate, 'yyyy-MM-dd') + "T"+ this.datepipe.transform(this.currentDate, 'HH:mm:ss.SSS') +"Z"
        };
      this.spinner.show();
      this.btnText = "Add";
      this.service.updateTargetDetails(this.tgAdd.targetID, Editval).subscribe(res => {
        this.spinner.hide();
        this.showNotification('top','center','Target Updated Successfully!','Success','success');
        this.service.GetTargetsForm(this.tgAdd.nodeID);      
        this.tgAdd.targetID = 0;
        this.tgAdd.quaterOne = "";
        this.tgAdd.quaterTwo = "";
        this.tgAdd.quaterThree = "";
        this.tgAdd.quaterFour = "";
        this.tgAdd.annualTarget = "";
        this.tgAdd.nodeID = "";
        this.tgAdd.financialYear = "";
        this.tgAdd.financialStartDate = "";
        this.divPeriod = false;
        this.divQ1 = false;
        this.divQ2 = false;
        this.divQ3 = false;
        this.divQ4 = false;
        this.divAT = false;
        this.isBtnDisabled = true;  

      });

      } 
    }
    else {
      this.showNotification('top', 'center', 'Please add a financial Start Date before saving!', '', 'danger');
    }
  }

  Clear(){ 
    
  }
  onTargetChange(ob) {    
  
  }
  getTargetPeriod(NodeID: any){

    this.spinner.show();
    this.service.GetTargetsFinancialYear(NodeID).subscribe(data => {
      this.Period = data;
      this.spinner.hide();
    });
    
  }
   
showNotification(from: any, align: any, message: any, title: any, type: string) {
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
}}
