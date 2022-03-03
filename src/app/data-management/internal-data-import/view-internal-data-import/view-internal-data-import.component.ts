import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataManagementService } from '../../DataManagementService.service';

@Component({
  selector: 'app-view-internal-data-import',
  templateUrl: './view-internal-data-import.component.html',
  styleUrls: ['./view-internal-data-import.component.css']
})
export class ViewInternalDataImportComponent implements OnInit {

  constructor(private service: DataManagementService,private spinner: NgxSpinnerService) { }
  public displayedColumns = ['id', 'name','surname','age','race','gender','serviceReceived','treatedBy'];

  ngOnInit(): void {
    this.PatientInfoDataList();
  }


  public formPatientInfo = new MatTableDataSource<any>();

  PatientInfoDataList() {
    this.spinner.show();
    this.service.getPatientInfo().subscribe(data => {
      this.formPatientInfo.data = data;
      this.spinner.hide();
    });
  }
}
