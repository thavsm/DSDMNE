import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';

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

  public userDetail: any;
  location: any;
  reports: any[];
  constructor(private service: UserService, ) { }
  
    
    public tableData: TableData;
    
    public tableData2: TableData;
    ngOnInit() {    
      
      let userRole= this.service.getRole();
      console.log(userRole);
      this.service.getRoleReports(userRole).subscribe(
        res => {

          console.log(res);
          let reports2: Array<any>=[];
          for (let subArr of res) {
            let report: Array<string>=[];
              report.push(subArr.v);
              report.push(subArr.report);
              report.push(subArr.reportName);
              reports2.push(report);
          }

          console.log(reports2);
          this.tableData = {
            headerRow: [ '', 'Report Name'],
            dataRows: reports2

         };

        }
      );
    
        //    this.tableData = {
        //     headerRow: [ '', 'Report Name'],
        //     dataRows: [           
        //         ['report2', 'NPO Facility register',  'NPO/Facility register '],
        //         // ['report3', 'Provincial Indicator Statistics Report', 'Provincial Indicator Statistics '],
        //         ['report4', 'ElectronicTempManReport', 'Electronic Template Report'],
        //         // ['report5', 'Facility Indicator Report',  'Facility Indicator Report '],
        //         // ['report6', 'Service Point Indicator Report', 'Service Point Indicator Report'],
        //         // ['report7', 'SummaryReportlNational',  'User Summary Report National'],
        //         //  ['report8', 'SummaryReportProvincial', 'User Summary Report Provincial  '],
        //         ['report8', 'SummaryReportProvincial', 'User Summary Report'],
        //         ['report8', 'Tree maintenance report', 'Tree Maintenance Report '],
        //         ['report9', 'Indicator report', 'Indicator Report '],
        //         ['report10', 'Service Point report', 'Service Point Report']
        //         // ['report9', 'INDICATOR REPORT', 'Indicator Report']
        //     ]

        //  };
        //  console.log(this.tableData);
    }
  

}
