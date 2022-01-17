import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

declare const $: any;

@Component({
  selector: 'app-process-cmp',
  templateUrl: 'process.component.html'
})
export class ProcessComponent implements OnInit {

  public lookup: {};

  public data: [];

  readonly BaseURI = environment.API_URL;

  sVersion = 1;
  sProvince = -1;
  sModule = 1;
  procName = '';
  procDesc = '';
  
  constructor(private http: HttpClient) {

  }

  ngOnInit() {

    this.http.get<{}>(this.BaseURI +'/lookup').subscribe(result => {

      this.lookup = result;

    }, error => console.error(error));
    
    this.getRecords();
  }

  getRecords() {

    let url = this.BaseURI + '/ProcessS/' + this.sVersion + '/' + this.sProvince + '/' + this.sModule;

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

  createNewProcess() {

    const headers = { 'content-type': 'application/json' }
    const body = '';// JSON.stringify(outDataVal);
    let procnameVal= this.procName.trim();
    let procdescVal= this.procDesc.trim();
    
    if(procnameVal !== '' && procdescVal !== '') {

    const url = this.BaseURI + '/ProcessS/' + procnameVal + '/' + procdescVal + '/' + this.sModule + '/' + this.sProvince;
    
    this.http.post(url, body, { 'headers': headers, observe: 'response' }).subscribe(response => {

      this.closeModal();
      this.showNotification('top','right','Successfully Added.', 'Process successful','success');
      this.getRecords();
      this.procName = '';
      this.procDesc = '';

    }, error => console.error(error));

   }

 }

 showNotification(from: any, align: any, message: any, title: any, type: string) {
  //const type = ['', 'info', 'success', 'warning', 'danger', 'rose', 'primary'];

  //const color = Math.floor((Math.random() * 6) + 1);

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
}

}

