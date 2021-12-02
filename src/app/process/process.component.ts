import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

declare const $: any;

@Component({
  selector: 'app-process-cmp',
  templateUrl: 'process.component.html'
})
export class ProcessComponent implements OnInit {

  public lookup: {};

  public data: [];

  constructor(private http: HttpClient) {

    
    http.get<{}>('https://localhost:44305/api/lookup').subscribe(result => {

      this.lookup = result;

    }, error => console.error(error));

    this.getRecords();

  }

  ngOnInit() {


  }

  getRecords() {

    
    let selVersion = document.querySelector('#selVersion') as HTMLSelectElement;
    let selProvince = document.querySelector('#selProvince') as HTMLSelectElement;
    let selModule = document.querySelector('#selModule') as HTMLSelectElement;

    let url = 'https://localhost:44305/api/ProcessS/1/-1/1';

    if (selVersion !== null)
      url = 'https://localhost:44305/api/ProcessS/' + selVersion.value + '/' + selProvince.value + '/' + selModule.value;

    this.http.get<[]>(url).subscribe(result => {

      this.data = result;


    }, error => console.error(error));
  }

  openModal() {

    $('#modalWindow').addClass('show');
    $('#modalWindow').css('display', 'block');

  }

  closeModal() {

    $('#modalWindow').removeClass('show');
    $('#modalWindow').css('display', 'none');

  }

  openModalMessage() {

    $('#modalWindowMessage').addClass('show');
    $('#modalWindowMessage').css('display', 'block');
  }

  closeModalMessage() {

    $('#modalWindowMessage').removeClass('show');
    $('#modalWindowMessage').css('display', 'none');
  }

  createNewProcess() {

    
    let selProvince1 = document.querySelector('#selProvince') as HTMLSelectElement;
    let selModule1 = document.querySelector('#selModule') as HTMLSelectElement;
    let procname = document.querySelector('#txtProcessName') as HTMLInputElement;
    let procdesc = document.querySelector('#txtDescription') as HTMLTextAreaElement;

    
    const headers = { 'content-type': 'application/json' }
    
    //const outDataVal = {
    //  "processName": procname.value,
    //  "processDescription": procdesc.value,
    //  "moduleID": selModule1.value,
    //  "provinceID": selProvince1.value
    //};

    const body = '';// JSON.stringify(outDataVal);
    
    let procnameVal= procname.value.trim();
    let procdescVal= procdesc.value.trim();
    
    if(procnameVal === '' || procdescVal === '')
    {
      return;
    }

    const url = 'https://localhost:44305/api/ProcessS/' + procnameVal + '/' + procdescVal + '/' + selModule1.value + '/' + selProvince1.value;
    
    this.http.post(url, body, { 'headers': headers, observe: 'response' }).subscribe(response => {

      //this.data = result;
      //console.log(response);
      this.closeModal();
      this.openModalMessage();
      this.getRecords();

    }, error => console.error(error));

  }


}

