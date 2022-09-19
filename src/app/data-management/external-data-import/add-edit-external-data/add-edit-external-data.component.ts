import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataManagementService } from '../../DataManagementService.service';
declare var $: any;


@Component({
  selector: 'app-add-edit-external-data',
  templateUrl: './add-edit-external-data.component.html',
  styleUrls: ['./add-edit-external-data.component.css']
})



export class AddEditExternalDataComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<AddEditExternalDataComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private service: DataManagementService, public formBuilder: FormBuilder, private spinner: NgxSpinnerService) {
    this.externalDataAdd = data;
     
  }

  exForm!: FormGroup;

  //Input
  dataServiceID: any;
  dataSource: string = "";
  initialCatalog: string = "";
  password: string="";
  status: string = "";
  connectString: string = "";
  connectionName: string = "";
  externalDataServiceTypeID: any;
  userID: string = "";
  dataSUrl:any;
  messageTest: any; 
  submitted = false;
  externalDataAdd: any;
  message:any;
  externalDataDRD: any = [];

  divUrl: boolean ;
  divServer: boolean ;
  divDatabase: boolean;
  divTestConn: boolean ;



  ngOnInit(): void {
    //Output
    this.ShowHide(this.externalDataAdd.externalDataServiceTypeID);
  
  this.getDataServiceTypes();
    this.exForm = this.formBuilder.group({
      externalDataServiceTypeID: [this.externalDataAdd.externalDataServiceTypeID],
      connectString: [this.externalDataAdd.connectString],
      connectionName: [this.externalDataAdd.connectionName],
      dataServiceID: [this.externalDataAdd.dataServiceID],
      dataSUrl: [this.externalDataAdd.dataSUrl],
      status: [this.externalDataAdd.status],
      dataSource: [this.externalDataAdd.dataSource],
      initialCatalog: [this.externalDataAdd.initialCatalog],
      userID: [this.externalDataAdd.userID, [Validators.required]],
      password: [this.externalDataAdd.password, [Validators.required, Validators.minLength(9)]],
      divUrl : [this.externalDataAdd.divUrl],
      divServer: [this.externalDataAdd.divServer],
      divDatabase: [this.externalDataAdd.divDatabase],
      divTestConn: [this.externalDataAdd.divTestConn]
    
    });
  }

  closePopup() {
    this.dialogRef.close();
  }
  //Process
  TestConn() {
      this.service.TestSqlDatas(this.externalDataAdd.dataSource, this.externalDataAdd.initialCatalog, this.externalDataAdd.userID, this.externalDataAdd.password.replace('#', '%23')).subscribe(rest => {
        this.spinner.hide();
        this.messageTest = rest
        alert
        this.showNotification('top', 'center', this.messageTest, '', '');
      });
  
  }


  addExternalData() {
    if (this.externalDataAdd.password == "") {
      this.showNotification('top', 'center', 'Please fill-in all fields before submitting!', '', 'danger');
    }
    else {
      //adding form
      this.submitted = true;

      var val = {
        "connectionName": this.externalDataAdd.connectionName,
        "dataServiceID": 0,
        "dataSource": this.externalDataAdd.dataSource,
        "initialCatalog": this.externalDataAdd.initialCatalog,
        "password": this.externalDataAdd.password.replace('#', '%23'),
        "status": 1,
        "DataSUrl": this.externalDataAdd.dataSUrl,
        "connectString": "Data Source=" + this.externalDataAdd.dataSource + ";Initial Catalog=" + this.externalDataAdd.initialCatalog + ";User ID=" + this.externalDataAdd.userID + ";Password=" + this.externalDataAdd.password.replace(/\"/g, '\\"'),
        "externalDataServiceTypeID": this.externalDataAdd.externalDataServiceTypeID,
        "userID": this.externalDataAdd.userID
      };

      this.service.addExternalDatas(val).subscribe(res => {
        this.dialogRef.close();
        this.spinner.hide();
        this.showNotification('top', 'center', 'External data added successfully!', '', 'success');
      });
      this.externalDataAdd.dataServiceID = 0;
      this.externalDataAdd.dataSource = "";
      this.externalDataAdd.initialCatalog = "";
      this.externalDataAdd.password = "";
      this.externalDataAdd.dataSUrl = "";
      this.externalDataAdd.status = 0;
      this.externalDataAdd.connectString = "";
      this.externalDataAdd.externalDataServiceTypeID = 0;
      this.externalDataAdd.userID = "";
    }

  }

  updateExternalData() {
    if (this.externalDataAdd.dataSource != "") {
      //updating form
      this.submitted = true;
      // stop here if form is invalid
  
      
      var val = {
        dataServiceID: this.externalDataAdd.dataServiceID,
        connectionName: this.externalDataAdd.connectionName,
        dataSource: this.externalDataAdd.dataSource,
        initialCatalog: this.externalDataAdd.initialCatalog,
        password: this.externalDataAdd.password,
        connectString: this.externalDataAdd.connectString,
        dataSUrl: this.externalDataAdd.dataSUrl,
        externalDataServiceTypeID: this.externalDataAdd.externalDataServiceTypeID,
        status: "1",
        userID: this.externalDataAdd.userID,
      };
      this.spinner.show();
      this.service.updateExternalDatas(this.externalDataAdd.dataServiceID, val).subscribe(res => {
        this.dialogRef.close();
        this.spinner.hide();
        this.showNotification('top', 'center', 'External data import updated successfully!', '', 'success');
      });
    }
    else {
      this.showNotification('top', 'center', 'Please add a data Source before saving!', '', 'danger');
    }
  }

  getDataServiceTypes() {
    this.spinner.show();
    this.service.getDataServiceTypes().subscribe(data => {
      this.externalDataDRD = data;
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

  toggle(ob) {
    this.ShowHide(ob.value);
  }

  ShowHide(Type: any) {

    if (Type == 1) {
      this.divUrl = false;
      this.divServer = true;
      this.divDatabase = true;
      this.divTestConn = true;

    } else if (Type == 2 || Type == 3) {

      this.divUrl = true;
      this.divServer = false;
      this.divDatabase = false;
      this.divTestConn = false;
    }
  }



}
