import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reportsviewer',
  templateUrl: './reportsviewer.component.html',
  styleUrls: ['./reportsviewer.component.css']
})
export class ReportsviewerComponent implements OnInit {

  constructor( public activatedRoute: ActivatedRoute) { }
 reportName : string="" ;
 reportUrl: string ="";
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {  
      this.reportName=param['id'];      
      this.reportUrl=environment.REPORT_URL+this.reportName;
      }); 
  }

  reportServer: string = environment.REPORT_SERVER;
  
  showParameters: string = "true"; 
  parameters: any = {
  
   };
  language: string = "en-us";
  width: number = 1000000;
  height: number = 100;
  toolbar: string = "true";

}
