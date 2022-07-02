import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataManagementService } from '../../DataManagementService.service';

@Component({
  selector: 'app-view-internal-data-import',
  templateUrl: './view-internal-data-import.component.html',
  styleUrls: ['./view-internal-data-import.component.css']
})
export class ViewInternalDataImportComponent implements OnInit {
  constructor(private service: DataManagementService, private spinner: NgxSpinnerService) {
    this.PatientInfoDataList();
  }
  
  ngOnInit(): void {
    this.PatientInfoDataList();
  }
  public TableDataArray = [];
  public keys = [];
  PatientInfoDataList() {
    this.spinner.show();
    const viewdata = localStorage.getItem('ViewInfo');
    this.service.getDataImport(viewdata).subscribe((data) => {
      this.TableDataArray = data;
      if (this.TableDataArray && this.TableDataArray.length > 0) {
        this.keys = Object.keys(this.TableDataArray[0]);
      }
    });
    this.spinner.hide();
  }
}
