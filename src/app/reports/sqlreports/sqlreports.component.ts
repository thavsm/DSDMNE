import { Component, OnInit } from '@angular/core';

declare var $: any;
declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-sqlreports',
  templateUrl: './sqlreports.component.html',
  styleUrls: ['./sqlreports.component.css']
})
export class SqlreportsComponent implements OnInit {

  constructor() { }
  
    
    public tableData: TableData;
    ngOnInit() {       
         
          this.tableData = {
              headerRow: [ '', 'Report Name'],
              dataRows: [                 
                  ['report2', 'NPO Facility register',  'NPO/Facility register '],
                  ['report3', 'Provincial Indicator Statistics Report', 'Provincial Indicator Statistics '],
                  ['report4', 'ElectronicTempManReport', 'Electronic Template Report'],
                  ['report5', 'Facility Indicator Report',  'Facility Indicator Report '],
                  ['report6', 'Service Point Indicator Report', 'Service Point Indicator Report'],
                  ['report7', 'SummaryReportlNational',  'User Summary Report National'],
                  ['report8', 'SummaryReportProvincial', 'User Summary Report Provincial  '],
                  ['report8', 'Tree maintenance report', 'Tree Maintenance Report ']
              ]
           };
    }
  

}
